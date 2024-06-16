import {mat4, vec3} from "wgpu-matrix";
import {ArcRotateCamera} from "./arcRotateCamera.js";
import {SimpleCamera} from "./simpleCamera.js";
import Stats from "stats-js";
import GUI from "lil-gui";

import particleWGSL from "./shaders/particle.wgsl?raw";

//--------------------------------------------------------------------------------------
// パラメータの設定
//--------------------------------------------------------------------------------------
const numParticles = 4096; //8192;
const particlePositionOffset = 0;
const particleColorOffset = 4 * 4;

const seed = [
  Math.random() * 100,
  Math.random() * 100,
  1 + Math.random(),
  1 + Math.random(),
];

const gravity = [0.0, -10.0];
const range = [16.0, 12.0];

const simulationParams = {
  simulate: true,
  simulationStep: 0.001,
  smoothlen: 0.5,
  pressureStiffness: 0.57,
  restDensity: 4.0,
  particleMass: 0.08,
  viscosity: 4.0,
  wallStiffness: 6000.0,
  iteration: 4,
  reset: () => {
    init();
  },
};

const densityCoef =
  (simulationParams.particleMass * 4.0) /
  (Math.PI * Math.pow(simulationParams.smoothlen, 8.0));
const gradPressureCoef =
  (simulationParams.particleMass * -30.0) /
  (Math.PI * Math.pow(simulationParams.smoothlen, 5.0));
const lapViscosityCoef =
  (simulationParams.particleMass * 20.0) /
  (3.0 * Math.PI * Math.pow(simulationParams.smoothlen, 5.0));

//--------------------------------------------------------------------------------------
// 初期化の処理
//--------------------------------------------------------------------------------------
// Buffer Sizeの定義
const simulationUBOBufferSize =
  1 * 4 + // deltaTime
  3 * 4 + // padding
  4 * 4 + // seed
  1 * 4 + // Smoothlen:f32
  1 * 4 + // DensityCoef: f32
  1 * 4 + //gradPressureCoef : f32
  1 * 4 + // lapViscosityCoef: f32
  1 * 4 + // PressureStiffness: f32
  1 * 4 + // RestDensity: f32
  1 * 4 + // ParticleMass: f32
  1 * 4 + // Viscosity: f32
  1 * 4 + //wallStiffness: f32
  1 * 4 + //itteration: i32
  2 * 4 + //gravity: vec2f
  1 * 4 + // rangeX: u32f
  1 * 4 + // rangeY: u32f
  2 * 4; // padding

const particleInstanceByteSize =
  3 * 4 + // position
  1 * 4 + // padding
  4 * 4 + // color
  3 * 4 + // velocity
  1 * 4 + // padding
  3 * 4 + // acceleration
  1 * 4 + // padding
  1 * 4 + // density
  1 * 4 + // pressure
  2 * 4; // padding

const uniformBufferSize =
  4 * 4 * 4 + // modelViewProjectionMatrix : mat4x4f
  3 * 4 + // right : vec3f
  4 + // padding
  3 * 4 + // up : vec3f
  4 + // padding
  0;

const mouseBufferSize =
  2 * 4 + //mousePosition : vec2f
  2 * 4 + // padding
  1 * 4 + // radius : f32
  3 * 4; // padding

// canvasやGPUの初期化
const canvas = document.querySelector("canvas");
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

const context = canvas.getContext("webgpu");

const devicePixelRatio = window.devicePixelRatio;
canvas.width = canvas.clientWidth * devicePixelRatio;
canvas.height = canvas.clientHeight * devicePixelRatio;
const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

// カメラの設定
// const camera = new ArcRotateCamera(Math.PI / 2, Math.PI / 2, 8.0);
// camera.attachControl(canvas);
const camera = new SimpleCamera(
  [range[0] / 2.0, range[1] / 2.0, 10],
  [range[0] / 2.0, range[1] / 2.0, 0]
);
const mvpMatrix = camera.updateMVPMatrix();

context.configure({
  device,
  format: presentationFormat,
  alphaMode: "premultiplied",
});

// guiの設定
const gui = new GUI();
gui.add(simulationParams, "simulate");
gui.add(simulationParams, "simulationStep", 0.001, 0.005, 0.001);
gui.add(simulationParams, "smoothlen", 0.1, 1.0, 0.1);
gui.add(simulationParams, "pressureStiffness", 0.1, 1.0, 0.1);
gui.add(simulationParams, "restDensity", 1.0, 10.0, 1.0);
gui.add(simulationParams, "particleMass", 0.01, 0.2, 0.01);
gui.add(simulationParams, "viscosity", 0.1, 10.0, 0.1);
gui.add(simulationParams, "wallStiffness", 1000.0, 6000.0, 1000.0);
gui.add(simulationParams, "iteration", 1, 20, 1);
gui.add(simulationParams, "reset");

gui.onChange(() => {
  setSimulationUBO();
});

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

//--------------------------------------------------------------------------------------
// Bufferの作成
//--------------------------------------------------------------------------------------
// particlesのread buffer
const particlesReadBuffer = device.createBuffer({
  size: numParticles * particleInstanceByteSize,
  usage:
    GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
});

// particlesのwrite buffer
const particlesWriteBuffer = device.createBuffer({
  size: numParticles * particleInstanceByteSize,
  usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE,
});

const readbackBuffer = device.createBuffer({
  size: numParticles * particleInstanceByteSize,
  usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
});

// 定数用
const uniformBuffer = device.createBuffer({
  size: uniformBufferSize,
  usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});

// particleのquad用
const quadVertexBuffer = device.createBuffer({
  size: 6 * 2 * 4, // 6x vec2f
  usage: GPUBufferUsage.VERTEX,
  mappedAtCreation: true,
});

// simulationのreadUBOバッファ
const simulationUBOBuffer = device.createBuffer({
  size: simulationUBOBufferSize,
  usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});

const mouseBuffer = device.createBuffer({
  size: mouseBufferSize,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
});

//--------------------------------------------------------------------------------------
// レンダリング周りの設定
//--------------------------------------------------------------------------------------
const renderPipeline = device.createRenderPipeline({
  layout: "auto",
  vertex: {
    module: device.createShaderModule({
      code: particleWGSL,
    }),
    buffers: [
      {
        // instanced particles buffer
        arrayStride: particleInstanceByteSize,
        stepMode: "instance",
        attributes: [
          {
            // position
            shaderLocation: 0,
            offset: particlePositionOffset,
            format: "float32x3",
          },
          {
            // color
            shaderLocation: 1,
            offset: particleColorOffset,
            format: "float32x4",
          },
        ],
      },
      {
        // quad vertex buffer
        arrayStride: 2 * 4, // vec2f
        stepMode: "vertex",
        attributes: [
          {
            // vertex positions
            shaderLocation: 2,
            offset: 0,
            format: "float32x2",
          },
        ],
      },
    ],
  },
  fragment: {
    module: device.createShaderModule({
      code: particleWGSL,
    }),
    targets: [
      {
        format: presentationFormat,
        blend: {
          color: {
            srcFactor: "src-alpha",
            dstFactor: "one",
            operation: "add",
          },
          alpha: {
            srcFactor: "zero",
            dstFactor: "one",
            operation: "add",
          },
        },
      },
    ],
  },
  primitive: {
    topology: "triangle-list",
  },

  depthStencil: {
    depthWriteEnabled: false,
    depthCompare: "less",
    format: "depth24plus",
  },
});

const depthTexture = device.createTexture({
  size: [canvas.width, canvas.height],
  format: "depth24plus",
  usage: GPUTextureUsage.RENDER_ATTACHMENT,
});

//描画shaderに渡すuniform変数のbindGroupを作成
const uniformBindGroup = device.createBindGroup({
  layout: renderPipeline.getBindGroupLayout(0),
  entries: [
    {
      binding: 0,
      resource: {
        buffer: uniformBuffer,
      },
    },
  ],
});

//描画のためのrenderPassDescriptorを作成
const renderPassDescriptor = {
  colorAttachments: [
    {
      view: undefined, // Assigned later
      clearValue: [0, 0, 0, 1],
      loadOp: "clear",
      storeOp: "store",
    },
  ],
  depthStencilAttachment: {
    view: depthTexture.createView(),

    depthClearValue: 1.0,
    depthLoadOp: "clear",
    depthStoreOp: "store",
  },
};

// prettier-ignore
const value = 1.0;
const vertexData = [
  -value,
  -value,
  +value,
  -value,
  -value,
  +value,
  -value,
  +value,
  +value,
  -value,
  +value,
  +value,
];
new Float32Array(quadVertexBuffer.getMappedRange()).set(vertexData);
quadVertexBuffer.unmap();

//--------------------------------------------------------------------------------------
// Compute Shader周りの設定
//--------------------------------------------------------------------------------------
// bindGroupLayoutの作成
const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {type: "uniform"},
    },
    {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {type: "storage"},
    },
    {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {type: "storage"},
    },
    {
      binding: 3,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {type: "storage"},
    },
  ],
});

const pipelineLayout = device.createPipelineLayout({
  bindGroupLayouts: [bindGroupLayout],
});

// bindGroupの作成
const computeBindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [
    {
      binding: 0,
      resource: {
        buffer: simulationUBOBuffer,
      },
    },
    {
      binding: 1,
      resource: {
        buffer: particlesReadBuffer,
        offset: 0,
        size: numParticles * particleInstanceByteSize,
      },
    },
    {
      binding: 2,
      resource: {
        buffer: particlesWriteBuffer,
        offset: 0,
        size: numParticles * particleInstanceByteSize,
      },
    },
    {
      binding: 3,
      resource: {
        buffer: mouseBuffer,
      },
    },
  ],
});

// pipelineの作成
const dencityCalculationPipeline = device.createComputePipeline({
  layout: pipelineLayout,
  compute: {
    module: device.createShaderModule({
      code: particleWGSL,
    }),
    entryPoint: "densityCS",
  },
});

const pressureCalculationPipeline = device.createComputePipeline({
  layout: pipelineLayout,
  compute: {
    module: device.createShaderModule({
      code: particleWGSL,
    }),
    entryPoint: "pressureCS",
  },
});

const computePipeline = device.createComputePipeline({
  layout: pipelineLayout,
  compute: {
    module: device.createShaderModule({
      code: particleWGSL,
    }),
    entryPoint: "simulate",
  },
});

const initPipeline = device.createComputePipeline({
  layout: pipelineLayout,
  compute: {
    module: device.createShaderModule({
      code: particleWGSL,
    }),
    entryPoint: "init",
  },
});

const forceClaclulationPipeline = device.createComputePipeline({
  layout: pipelineLayout,
  compute: {
    module: device.createShaderModule({
      code: particleWGSL,
    }),
    entryPoint: "forceCS",
  },
});

const swapBufferPipeline = device.createComputePipeline({
  layout: pipelineLayout,
  compute: {
    module: device.createShaderModule({
      code: particleWGSL,
    }),
    entryPoint: "swapBuffer",
  },
});

// バッファの初期化
const setSimulationUBO = () => {
  device.queue.writeBuffer(
    simulationUBOBuffer,
    0,
    new Float32Array([
      simulationParams.simulate ? simulationParams.simulationStep : 0.0,
      0.0,
      0.0,
      0.0, // padding
      seed[0],
      seed[1], // seed.xy
      seed[2],
      seed[3], // seed.zw
      simulationParams.smoothlen,
      densityCoef,
      gradPressureCoef,
      lapViscosityCoef,
      simulationParams.pressureStiffness,
      simulationParams.restDensity,
      simulationParams.particleMass,
      simulationParams.viscosity,
      simulationParams.wallStiffness,
      simulationParams.iteration,
      gravity[0],
      gravity[1],
      range[0],
      range[1], // range
      0.0, // padding
    ])
  );
};
setSimulationUBO();

// マウスバッファの初期化
device.queue.writeBuffer(mouseBuffer, 0, new Float32Array([0.0, 0.0, 0.0]));
// マウスイベントの設定
// マウスのドラッグ中はマウスのスクリーン座標をバッファに書き込む
// マウスを離すとバッファのradiusを0にする
let isDragging = false;

document.addEventListener("mousedown", function (e) {
  isDragging = true;
});

document.addEventListener("mouseup", function (e) {
  isDragging = false;
  device.queue.writeBuffer(mouseBuffer, 0, new Float32Array([0.0, 0.0, 0.0]));
});

document.addEventListener("mousemove", function (e) {
  if (isDragging) {
    //マウス座標をワールド座標に変換
    const wp = camera.screenToWorld(e.clientX, e.clientY, 10.0);
    const radius = 1.0;
    device.queue.writeBuffer(
      mouseBuffer,
      0,
      new Float32Array([wp[0], wp[1], radius])
    );
  }
});

const init = () => {
  const commandEncoder = device.createCommandEncoder();
  const passEncoder = commandEncoder.beginComputePass();
  passEncoder.setPipeline(initPipeline);
  passEncoder.setBindGroup(0, computeBindGroup);
  passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));
  passEncoder.end();
  device.queue.submit([commandEncoder.finish()]);
};
init();

//--------------------------------------------------------------------------------------
// メインループ
//--------------------------------------------------------------------------------------
async function frame() {
  stats.begin();
  // 描画用のバッファにデータを書き込み
  device.queue.writeBuffer(uniformBuffer, 0, new Float32Array(mvpMatrix));

  //現在のスワップチェーンのテクスチャを取得します。このテクスチャがrender targetとして使用される
  const swapChainTexture = context.getCurrentTexture();

  renderPassDescriptor.colorAttachments[0].view = swapChainTexture.createView();

  const commandEncoder = device.createCommandEncoder();
  for (let i = 0; i < simulationParams.iteration; i++) {
    //密度の計算
    {
      const passEncoder = commandEncoder.beginComputePass();
      passEncoder.setPipeline(dencityCalculationPipeline);
      passEncoder.setBindGroup(0, computeBindGroup);
      passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));
      passEncoder.end();
    }

    //swapBuffer
    {
      const passEncoder = commandEncoder.beginComputePass();
      passEncoder.setPipeline(swapBufferPipeline);
      passEncoder.setBindGroup(0, computeBindGroup);
      passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));
      passEncoder.end();
    }

    //圧力の計算
    {
      const passEncoder = commandEncoder.beginComputePass();
      passEncoder.setPipeline(pressureCalculationPipeline);
      passEncoder.setBindGroup(0, computeBindGroup);
      passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));
      passEncoder.end();
    }

    //swapBuffer
    {
      const passEncoder = commandEncoder.beginComputePass();
      passEncoder.setPipeline(swapBufferPipeline);
      passEncoder.setBindGroup(0, computeBindGroup);
      passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));
      passEncoder.end();
    }

    //forceの計算
    {
      const passEncoder = commandEncoder.beginComputePass();
      passEncoder.setPipeline(forceClaclulationPipeline);
      passEncoder.setBindGroup(0, computeBindGroup);
      passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));
      passEncoder.end();
    }

    //swapBuffer
    {
      const passEncoder = commandEncoder.beginComputePass();
      passEncoder.setPipeline(swapBufferPipeline);
      passEncoder.setBindGroup(0, computeBindGroup);
      passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));
      passEncoder.end();
    }

    //mainの計算
    {
      const passEncoder = commandEncoder.beginComputePass();
      passEncoder.setPipeline(computePipeline);
      passEncoder.setBindGroup(0, computeBindGroup);
      passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));
      passEncoder.end();
    }

    //swapBuffer
    {
      const passEncoder = commandEncoder.beginComputePass();
      passEncoder.setPipeline(swapBufferPipeline);
      passEncoder.setBindGroup(0, computeBindGroup);
      passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));
      passEncoder.end();
    }
  }

  //パーティクルの描画
  {
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(renderPipeline);
    passEncoder.setBindGroup(0, uniformBindGroup);
    passEncoder.setVertexBuffer(0, particlesReadBuffer);
    passEncoder.setVertexBuffer(1, quadVertexBuffer);
    passEncoder.draw(6, numParticles, 0, 0); //第1引数は頂点数、第2引数はインスタンス数
    passEncoder.end();
  }

  device.queue.submit([commandEncoder.finish()]);

  stats.end();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

//--------------------------------------------------------------------------------------
// デバッグ用
//--------------------------------------------------------------------------------------
const parseParticleData = (data) => {
  const particleData = [];
  const floatData = new Float32Array(data);

  for (let i = 0; i < numParticles; i++) {
    const offset = (i * particleInstanceByteSize) / 4; // 4バイトごとに1要素
    const particle = {
      position: [
        floatData[offset],
        floatData[offset + 1],
        floatData[offset + 2],
      ],
      color: [
        floatData[offset + 4],
        floatData[offset + 5],
        floatData[offset + 6],
        floatData[offset + 7],
      ],
      velocity: [
        floatData[offset + 8],
        floatData[offset + 9],
        floatData[offset + 10],
      ],
      acceleration: [
        floatData[offset + 12],
        floatData[offset + 13],
        floatData[offset + 14],
      ],
      density: floatData[offset + 15],
      pressure: floatData[offset + 16],
    };
    particleData.push(particle);
  }

  return particleData;
};

// データをコピーして読み取る関数
async function copyAndReadBufferData() {
  // コマンドエンコーダを作成
  const commandEncoder = device.createCommandEncoder();

  // データを particlesReadBuffer から readbackBuffer にコピー
  commandEncoder.copyBufferToBuffer(
    particlesReadBuffer,
    0,
    readbackBuffer,
    0,
    numParticles * particleInstanceByteSize
  );

  // コマンドバッファを送信
  const commands = commandEncoder.finish();
  device.queue.submit([commands]);

  // データの読み取り
  try {
    await readbackBuffer.mapAsync(
      GPUMapMode.READ,
      0,
      numParticles * particleInstanceByteSize
    );
    const copyArrayBuffer = readbackBuffer.getMappedRange(
      0,
      numParticles * particleInstanceByteSize
    );
    const data = copyArrayBuffer.slice();
    readbackBuffer.unmap();
    const parsedData = parseParticleData(data);
    console.log(parsedData);
  } catch (error) {
    console.error("Error mapping buffer:", error);
  }
}

//データをコピーして特定のバッファを読み取る関数
async function copyAndReadBufferDataPerParticle() {
  // コマンドエンコーダを作成
  const commandEncoder = device.createCommandEncoder();

  // データを particlesReadBuffer から readbackBuffer にコピー
  commandEncoder.copyBufferToBuffer(
    particlesReadBuffer,
    0,
    readbackBuffer,
    0,
    numParticles * particleInstanceByteSize
  );

  // コマンドバッファを送信
  const commands = commandEncoder.finish();
  device.queue.submit([commands]);

  // データの読み取り
  try {
    await readbackBuffer.mapAsync(
      GPUMapMode.READ,
      0,
      numParticles * particleInstanceByteSize
    );
    const copyArrayBuffer = readbackBuffer.getMappedRange(
      0,
      numParticles * particleInstanceByteSize
    );
    const data = copyArrayBuffer.slice();
    readbackBuffer.unmap();
    const parsedData = parseParticleData(data);
    console.log(
      "density : ",
      parsedData[0].density,
      "pressure : ",
      parsedData[0].pressure,
      "position : ",
      parsedData[0].position
    );
  } catch (error) {
    console.error("Error mapping buffer:", error);
  }
}

// fキーを押すと10msごとにデータを読み取り続ける
document.addEventListener("keydown", (event) => {
  if (event.key === "f" || event.key === "F") {
    setInterval(copyAndReadBufferDataPerParticle, 100);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "c" || event.key === "C") {
    copyAndReadBufferData();
  }
});
