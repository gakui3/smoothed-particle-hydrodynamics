import {mat4, vec3} from "wgpu-matrix";
import {GUI} from "dat.gui";
import {ArcRotateCamera} from "./arcRotateCamera.js";

import particleWGSL from "./shaders/particle.wgsl?raw";
import probabilityMapWGSL from "./shaders/probabilityMap.wgsl?raw";

const numParticles = 1024;
const particlePositionOffset = 0;
const particleColorOffset = 4 * 4;

/**
 * 初期化の処理
 */
// Buffer Sizeの定義
const simulationUBOBufferSize =
  1 * 4 + // deltaTime
  3 * 4 + // padding
  4 * 4 + // seed
  1 * 4 + // Smoothlen:f32
  1 * 4 + // DensityCoef: f32
  1 * 4 + //gradPressureCoef : f32
  1 * 4 + // LapPressureCoef: f32
  1 * 4 + // PressureStiffness: f32
  1 * 4 + // RestDensity: f32
  1 * 4 + // ParticleMass: f32
  1 * 4 + // Viscosity: f32
  1 * 4 + //wallStiffness: f32
  1 * 4 + //itteration: i32
  2 * 4 + //gravity: vec2f
  2 * 4 + // range: vec2f
  2 * 4; // padding

const particleInstanceByteSize =
  3 * 4 + // position
  1 * 4 + // padding
  4 * 4 + // color
  3 * 4 + // velocity
  1 * 4 + // padding
  3 * 4 + // acceleration
  1 * 4 + // padding : ここでバッファのサイズを16byteの倍数に調整している
  0;

const uniformBufferSize =
  4 * 4 * 4 + // modelViewProjectionMatrix : mat4x4f
  3 * 4 + // right : vec3f
  4 + // padding
  3 * 4 + // up : vec3f
  4 + // padding
  0;

// canvasやGPUの初期化
const canvas = document.querySelector("canvas");
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

const context = canvas.getContext("webgpu");

const devicePixelRatio = window.devicePixelRatio;
canvas.width = canvas.clientWidth * devicePixelRatio;
canvas.height = canvas.clientHeight * devicePixelRatio;
const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

/**
 * cameraの設定
 */
const camera = new ArcRotateCamera(Math.PI / 2, Math.PI / 2, 3);
camera.attachControl(canvas);

context.configure({
  device,
  format: presentationFormat,
  alphaMode: "premultiplied",
});

// guiの設定
const simulationParams = {
  simulate: true,
  deltaTime: 0.04,
};

const gui = new GUI();
gui.add(simulationParams, "simulate");
gui.add(simulationParams, "deltaTime");

/**
 * Bufferの作成
 */
// particlesのbuffer
const particlesBuffer = device.createBuffer({
  size: numParticles * particleInstanceByteSize,
  usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE,
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

// simulationのUBO
const simulationUBOBuffer = device.createBuffer({
  size: simulationUBOBufferSize,
  usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});

/**
 * レンダリング周りの設定
 */
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

/**
 * Compute Shader周りの設定
 */
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
        buffer: particlesBuffer,
        offset: 0,
        size: numParticles * particleInstanceByteSize,
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

// バッファの初期化
/**
 * 定数用のバッファに値を書き込み
 */
device.queue.writeBuffer(
  simulationUBOBuffer,
  0,
  new Float32Array([
    simulationParams.simulate ? simulationParams.deltaTime : 0.0,
    0.0,
    0.0,
    0.0, // padding
    Math.random() * 100,
    Math.random() * 100, // seed.xy
    1 + Math.random(),
    1 + Math.random(), // seed.zw
    0.012, // Smoothlen
    999, // DensityCoef
    999, // gradPressureCoef
    999, // LapPressureCoef
    200.0, // PressureStiffness
    1000.0, // RestDensity
    0.0002, // ParticleMass
    0.1, // Viscosity
    3000.0, // wallStiffness
    4, // itteration
    0.0,
    -0.5, // gravity
    1.0,
    1.0, // range
    0.0,
    0.0, // padding
  ])
);

/**
 * パーティクルバッファの初期化
 */
{
  const commandEncoder = device.createCommandEncoder();
  const passEncoder = commandEncoder.beginComputePass();
  passEncoder.setPipeline(initPipeline);
  passEncoder.setBindGroup(0, computeBindGroup);
  passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));
  passEncoder.end();
  device.queue.submit([commandEncoder.finish()]);
}

/**
 * メインループ
 */
function frame() {
  // 描画用のバッファにデータを書き込み
  device.queue.writeBuffer(
    uniformBuffer,
    0,
    new Float32Array(camera.updateMVPMatrix())
  );

  //現在のスワップチェーンのテクスチャを取得します。このテクスチャがrender targetとして使用される
  const swapChainTexture = context.getCurrentTexture();

  renderPassDescriptor.colorAttachments[0].view = swapChainTexture.createView();

  const commandEncoder = device.createCommandEncoder();

  //密度の計算
  {
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(dencityCalculationPipeline);
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

  //パーティクルの描画
  {
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(renderPipeline);
    passEncoder.setBindGroup(0, uniformBindGroup);
    passEncoder.setVertexBuffer(0, particlesBuffer);
    passEncoder.setVertexBuffer(1, quadVertexBuffer);
    passEncoder.draw(6, numParticles, 0, 0); //第1引数は頂点数、第2引数はインスタンス数
    passEncoder.end();
  }

  device.queue.submit([commandEncoder.finish()]);

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
