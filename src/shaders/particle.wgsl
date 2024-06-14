////////////////////////////////////////////////////////////////////////////////
// Utilities
////////////////////////////////////////////////////////////////////////////////
var<private> rand_seed : vec2<f32>;

fn init_rand(invocation_id : u32, seed : vec4f) {
  rand_seed = seed.xz;
  rand_seed = fract(rand_seed * cos(35.456+f32(invocation_id) * seed.yw));
  rand_seed = fract(rand_seed * cos(41.235+f32(invocation_id) * seed.xw));
}

fn rand() -> f32 {
  rand_seed.x = fract(cos(dot(rand_seed, vec2f(23.14077926, 232.61690225))) * 136.8168);
  rand_seed.y = fract(cos(dot(rand_seed, vec2f(54.47856553, 345.84153136))) * 534.7645);
  return rand_seed.y;
}

////////////////////////////////////////////////////////////////////////////////
// Vertex shader
////////////////////////////////////////////////////////////////////////////////
struct RenderParams {
  modelViewProjectionMatrix : mat4x4f,
  right : vec3f,
  up : vec3f
}
@binding(0) @group(0) var<uniform> render_params : RenderParams;

struct VertexInput {
  @location(0) position : vec3f,
  @location(1) color : vec4f,
  @location(2) quad_pos : vec2f, // -1..+1
}

struct VertexOutput {
  @builtin(position) position : vec4f,
  @location(0) color : vec4f,
  @location(1) quad_pos : vec2f, // -1..+1
}

@vertex
fn vs_main(in : VertexInput) -> VertexOutput {
  var quad_pos = mat2x3f(render_params.right, render_params.up) * in.quad_pos;
  var position = in.position + quad_pos * 0.015;
  var out : VertexOutput;
  out.position = render_params.modelViewProjectionMatrix * vec4f(position, 1.0);
  out.color = in.color;
  out.quad_pos = in.quad_pos;
  return out;
}

////////////////////////////////////////////////////////////////////////////////
// Fragment shader
////////////////////////////////////////////////////////////////////////////////
@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4f {
  var color = in.color;
  // Apply a circular particle alpha mask
  color.a = color.a * max(1.0 - length(in.quad_pos), 0.0);
  return color;
}

////////////////////////////////////////////////////////////////////////////////
// Simulation Compute shader
////////////////////////////////////////////////////////////////////////////////
struct SimulationParams {
  deltaTime : f32,
  seed : vec4f,
  smoothlen: f32,
  densityCoef: f32,
  gradPressureCoef: f32,
  lapViscosityCoef: f32,
  pressureStiffness: f32,
  restDensity: f32,
  particleMass: f32,
  viscosity: f32,
  wallStiffness: f32,
  iterations: u32,
  gravity: vec2f,
  range: vec2f,
}

struct Particle {
  position : vec3f,
  color    : vec4f,
  velocity : vec3f,
  acceleration : vec3f,
}

struct Particles {
  particles : array<Particle>,
}

@binding(0) @group(0) var<uniform> params : SimulationParams;
@binding(1) @group(0) var<storage, read_write> data : Particles;

fn calculateDensity(r_sq: f32) -> f32 {
  let h_sq: f32 = params.smoothlen * params.smoothlen;
  return params.densityCoef * (h_sq - r_sq) * (h_sq - r_sq) * (h_sq - r_sq);
}

fn calculatePressure(density: f32) -> f32 {
  return params.pressureStiffness * max(pow(density / params.restDensity, 7.0) - 1.0, 0.0);
}

@compute @workgroup_size(64)
fn init(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;
  var particle = data.particles[idx];
  init_rand(idx, params.seed);

  particle.position = vec3f(0.0, 1.0, 0.0);
  // particle.lifetime = 1.0;
  particle.color = vec4f(1.0, 1.0, 1.0, 1.0);
  particle.velocity = vec3f(rand()*0.5 + 0.1, rand() * 0.3, 0.0);
  particle.acceleration = vec3f(0.0, 0.0, 0.0);

  data.particles[idx] = particle;
}

@compute @workgroup_size(64)
fn simulate(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;

  init_rand(idx, params.seed);

  var particle = data.particles[idx];

  // 重力を適用します
  particle.velocity.y = particle.velocity.y - params.deltaTime * 0.5;

  // 基本的な速度統合
  particle.position = particle.position + params.deltaTime * particle.velocity;

  // 新しい粒子値を保存します
  data.particles[idx] = particle;
}

@compute @workgroup_size(64)
fn densityCS(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;
  let s = params.seed;
  
  var particle = data.particles[idx];
  var density: f32 = 0.0;

  for (var i = 0u; i < 1024u; i= i + 1u) {
    if(i == idx) {
      continue;
    }
    let p = data.particles[i];

    let diff: vec3<f32> = p.position - particle.position;
    let r2: f32 = dot(diff, diff);
    if (rand() < 0.1) {
      density += calculateDensity(r2);
      particle.color = vec4f(1.0, 0.0, 0.0, 1.0);
    }
  }

  // init_rand(idx, params.seed);
  // let v: f32 = rand();
  // if (v < 0.05) {
  //     particle.color = vec4f(1.0, 0.0, 0.0, 1.0);
  // }

  data.particles[idx] = particle;
}

@compute @workgroup_size(64)
fn pressureCS(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;
  let s = params.seed;
  
  var particle = data.particles[idx];
  var density: f32 = 0.0;
  var pressure: f32 = 0.0;
  var gradPressure: vec3<f32> = vec3<f32>(0.0, 0.0, 0.0);

  for (var i = 0u; i < 1024u; i= i + 1u) {
    if(i == idx) {
      continue;
    }
    let p = data.particles[i];

    let diff: vec3<f32> = p.position - particle.position;
    let r2: f32 = dot(diff, diff);
    density += calculateDensity(r2);
    pressure += calculatePressure(density);
    gradPressure += diff * (params.gradPressureCoef * (calculateDensity(r2) + calculateDensity(r2)));
  }

  particle.acceleration = gradPressure / density;
  data.particles[idx] = particle;
}