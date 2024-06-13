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
}

struct Particle {
  position : vec3f,
  lifetime : f32,
  color    : vec4f,
  velocity : vec3f,
  acceleration : vec3f,
}

struct Particles {
  particles : array<Particle>,
}

struct Params {
  smoothlen: f32,
  densityCoef: f32,
}

@binding(0) @group(0) var<uniform> sim_params : SimulationParams;
@binding(1) @group(0) var<storage, read_write> data : Particles;
@binding(2) @group(0) var<storage, read> params: Params;

fn calculateDensity(r_sq: f32) -> f32 {
  let h_sq: f32 = params.smoothlen * params.smoothlen;
  return params.densityCoef * (h_sq - r_sq) * (h_sq - r_sq) * (h_sq - r_sq);
}

@compute @workgroup_size(64)
fn simulate(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;

  init_rand(idx, sim_params.seed);

  var particle = data.particles[idx];

  // 重力を適用します
  particle.velocity.y = particle.velocity.y - sim_params.deltaTime * 0.5;

  // 基本的な速度統合
  particle.position = particle.position + sim_params.deltaTime * particle.velocity;

  // 各粒子を老化させます。消える前にフェードアウト。
  particle.lifetime = particle.lifetime - sim_params.deltaTime;
  particle.color.a = smoothstep(0.0, 0.5, particle.lifetime);

  if (particle.lifetime < 0.0) {
    let uv = vec2f(0.0, 0.0);
    particle.position = vec3f(0.0, 1.0, 0.0);//vec3f((uv - 0.5) * 3.0 * vec2f(1.0, -1.0), 0.0);
    particle.color = vec4f(0.0, 1.0, 0.0, 1.0);
    particle.velocity.x = rand()*0.25 + 0.1;//(rand() - 0.5);
    particle.velocity.y = rand() * 0.3;
    particle.velocity.z = 0;//(rand() - 0.5);
    particle.lifetime = 0.5 + rand() * 6.0;
  }

  // 新しい粒子値を保存します
  data.particles[idx] = particle;
}

@compute @workgroup_size(64)
fn densityCS(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;
  let s = sim_params.seed;
  
  var particle = data.particles[idx];
  var density: f32 = 0.0;

  for (var i = 0u; i < 1024u; i= i + 1u) {
    if(i == idx) {
      continue;
    }
    let p = data.particles[i];

    let diff: vec3<f32> = p.position - particle.position;
    let r2: f32 = dot(diff, diff);
    if (r2 < 0.0001) {
      density += calculateDensity(r2);
    }
  }

  data.particles[idx] = particle;
}