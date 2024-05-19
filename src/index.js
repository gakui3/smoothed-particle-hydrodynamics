import {mat4, vec3} from "wgpu-matrix";
import {GUI} from "dat.gui";
import {ArcRotateCamera} from "./ArcRotateCamera.js";

import particleWGSL from "./shaders/particle.wgsl?raw";
import probabilityMapWGSL from "./shaders/probabilityMap.wgsl?raw";

const numParticles = 10000;
const particlePositionOffset = 0;
const particleColorOffset = 4 * 4;
const particleInstanceByteSize =
  3 * 4 + // position
  1 * 4 + // lifetime
  4 * 4 + // color
  3 * 4 + // velocity
  1 * 4 + // padding
  0;

const canvas = document.querySelector("canvas");
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

const context = canvas.getContext("webgpu");

const devicePixelRatio = window.devicePixelRatio;
canvas.width = canvas.clientWidth * devicePixelRatio;
canvas.height = canvas.clientHeight * devicePixelRatio;
const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

context.configure({
  device,
  format: presentationFormat,
  alphaMode: "premultiplied",
});

const particlesBuffer = device.createBuffer({
  size: numParticles * particleInstanceByteSize,
  usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE,
});

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

const uniformBufferSize =
  4 * 4 * 4 + // modelViewProjectionMatrix : mat4x4f
  3 * 4 + // right : vec3f
  4 + // padding
  3 * 4 + // up : vec3f
  4 + // padding
  0;
const uniformBuffer = device.createBuffer({
  size: uniformBufferSize,
  usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
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

// particle用のquadを作成
const quadVertexBuffer = device.createBuffer({
  size: 6 * 2 * 4, // 6x vec2f
  usage: GPUBufferUsage.VERTEX,
  mappedAtCreation: true,
});
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

//////////////////////////////////////////////////////////////////////////////
// Simulation compute pipeline
//////////////////////////////////////////////////////////////////////////////
const simulationParams = {
  simulate: true,
  deltaTime: 0.04,
};

const simulationUBOBufferSize =
  1 * 4 + // deltaTime
  3 * 4 + // padding
  4 * 4 + // seed
  0;
const simulationUBOBuffer = device.createBuffer({
  size: simulationUBOBufferSize,
  usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});

const gui = new GUI();
gui.add(simulationParams, "simulate");
gui.add(simulationParams, "deltaTime");

const computePipeline = device.createComputePipeline({
  layout: "auto",
  compute: {
    module: device.createShaderModule({
      code: particleWGSL,
    }),
    entryPoint: "simulate",
  },
});
const computeBindGroup = device.createBindGroup({
  layout: computePipeline.getBindGroupLayout(0),
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

const aspect = canvas.width / canvas.height;
const projection = mat4.perspective((2 * Math.PI) / 5, aspect, 1, 100.0);
const view = mat4.create();
const mvp = mat4.create();

const camera = new ArcRotateCamera(Math.PI / 4, Math.PI / 4, 10);
camera.attachControl(canvas);

function frame() {
  camera.updateViewMatrix();
  const aspect = canvas.width / canvas.height;
  camera.updateProjectionMatrix(aspect);
  camera.updateMVPMatrix();

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
    ])
  );

  // カメラのtransformを設定
  // mat4.identity(view);
  // mat4.translate(view, vec3.fromValues(0, -0.25, -3), view);
  // // mat4.rotateX(view, Math.PI * -0.5, view);
  // mat4.multiply(projection, view, mvp);

  device.queue.writeBuffer(
    uniformBuffer,
    0,
    new Float32Array(camera.mvpMatrix)
    // new Float32Array([
    //   // modelViewProjectionMatrix
    //   mvp[0],
    //   mvp[1],
    //   mvp[2],
    //   mvp[3],
    //   mvp[4],
    //   mvp[5],
    //   mvp[6],
    //   mvp[7],
    //   mvp[8],
    //   mvp[9],
    //   mvp[10],
    //   mvp[11],
    //   mvp[12],
    //   mvp[13],
    //   mvp[14],
    //   mvp[15],

    //   view[0],
    //   view[4],
    //   view[8], // right

    //   0, // padding

    //   view[1],
    //   view[5],
    //   view[9], // up

    //   0, // padding
    // ])
  );

  //現在のスワップチェーンのテクスチャを取得します。このテクスチャがrender targetとして使用される
  const swapChainTexture = context.getCurrentTexture();

  renderPassDescriptor.colorAttachments[0].view = swapChainTexture.createView();

  const commandEncoder = device.createCommandEncoder();
  {
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(computePipeline);
    passEncoder.setBindGroup(0, computeBindGroup);
    passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));
    passEncoder.end();
  }
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
