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
  density : f32,
  pressure : f32,
}

struct Particles {
  particles : array<Particle>,
}

@binding(0) @group(0) var<uniform> params : SimulationParams;
@binding(1) @group(0) var<storage, read_write> dataRead : Particles;
@binding(2) @group(0) var<storage, read_write> dataWrite : Particles;

fn calculateDensity(r_sq: f32) -> f32 {
  let h_sq: f32 = params.smoothlen * params.smoothlen;
  return params.densityCoef * (h_sq - r_sq) * (h_sq - r_sq) * (h_sq - r_sq);
}

fn calculatePressure(density: f32) -> f32 {
  var press = params.pressureStiffness * max(pow(density / params.restDensity, 7.0) - 1.0, 0.0);
  return press;
}

fn calculateGradPressure(r: f32, P_pressure: f32, N_pressure: f32, N_density: f32, diff: vec2f) -> vec2f {
  let h: f32 = params.smoothlen;
  let avg_pressure: f32 = 0.5 * (N_pressure + P_pressure);
  return params.gradPressureCoef * avg_pressure / N_density * (h - r) * (h - r) / r * diff;
}

fn calculateLapVelocity(r: f32, P_velocity: vec2f, N_velocity: vec2f, N_density: f32) -> vec2f {
  let h: f32 = params.smoothlen;
  let vel_diff: vec2f = N_velocity - P_velocity;
  return params.lapViscosityCoef / N_density * (h - r) * vel_diff;
}

fn calculateAcceleration(position: vec3f, velocity: vec3f, acceleration: vec3f) -> vec3f {
  var acc = acceleration;

  var dist = dot(position, vec3f(1.0, 0.0, 0.0));
  acc += vec3f(min(dist, 0.0) * -params.wallStiffness * vec2<f32>(1.0, 0.0), 0.0);

  dist = dot(position, vec3f(0.0, 1.0, 0.0));
  acc += vec3f(min(dist, 0.0) * -params.wallStiffness * vec2<f32>(0.0, 1.0), 0.0);

  dist = dot(position, vec3f(-1.0, 0.0, params.range.x));
  acc += vec3f(min(dist, 0.0) * -params.wallStiffness * vec2<f32>(-1.0, 0.0), 0.0);

  dist = dot(position, vec3f(0.0, -1.0, params.range.y));
  acc += vec3f(min(dist, 0.0) * -params.wallStiffness * vec2<f32>(0.0, -1.0), 0.0);

  acc += vec3f(params.gravity.x, params.gravity.y, 0.0);

  return acc;
}

@compute @workgroup_size(64)
fn init(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;
  var particle = dataRead.particles[idx];
  init_rand(idx, params.seed);

  // ランダムな角度と半径を生成
  let angle = rand() * 2.0 * 3.141592;
  let radius = sqrt(rand()) * 5.0; // 半径5の円内にランダムに分布

  // デカルト座標に変換
  let x = radius * cos(angle);
  let y = radius * sin(angle);

  // 初期位置を円内のランダムな位置に設定
  particle.position = vec3f(x, y, 0.0) + vec3f(8.0, 5.0, 0.0);
  particle.color = vec4f(1.0, 1.0, 1.0, 1.0);
  particle.velocity = vec3f(0.0, 0.0, 0.0);
  particle.acceleration = vec3f(0.0, 0.0, 0.0);

  dataRead.particles[idx] = particle;
}

@compute @workgroup_size(64)
fn simulate(@builtin(global_invocation_id) global_invocation_id: vec3<u32>) {
  let idx = global_invocation_id.x;

  var particle = dataRead.particles[idx];
  var position = vec3<f32>(particle.position.x, particle.position.y, 1.0);
  var velocity = particle.velocity;
  var acceleration = particle.acceleration;

  let dt = params.deltaTime;
  let half_dt = dt * 0.5;
  let sixth_dt = dt / 6.0;

  // RK4の計算
  let k1_v = calculateAcceleration(position, velocity, acceleration);
  let k1_x = velocity;

  let k2_v = calculateAcceleration(position + half_dt * k1_x, velocity + half_dt * k1_v, acceleration);
  let k2_x = velocity + half_dt * k1_v;

  let k3_v = calculateAcceleration(position + half_dt * k2_x, velocity + half_dt * k2_v, acceleration);
  let k3_x = velocity + half_dt * k2_v;

  let k4_v = calculateAcceleration(position + dt * k3_x, velocity + dt * k3_v, acceleration);
  let k4_x = velocity + dt * k3_v;

  // 位置と速度の更新
  position += sixth_dt * (k1_x + 2.0 * (k2_x + k3_x) + k4_x);
  velocity += sixth_dt * (k1_v + 2.0 * (k2_v + k3_v) + k4_v);

  position.z = 0.0;

  // 粒子の位置を更新
  particle.position = position;
  particle.velocity = velocity;
  particle.color = vec4<f32>(particle.density, 1.0, 0.0, 1.0);

  // 新しい粒子値を保存
  dataWrite.particles[idx] = particle;
}

@compute @workgroup_size(64)
fn densityCS(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;
  let s = params.seed;
  
  var particle = dataRead.particles[idx];

  var h_sq: f32 = params.smoothlen * params.smoothlen;
  var density: f32 = 0.0;

  for (var i = 0u; i < arrayLength(&dataRead.particles); i= i + 1u) {
    if(i == idx) {
      continue;
    }
    let p = dataRead.particles[i];

    let diff: vec3f = p.position - particle.position;
    let r2: f32 = dot(diff, diff);
    if (r2 < h_sq) {
      density += calculateDensity(r2);
    }
  }
  particle.density = density;
  dataWrite.particles[idx] = particle;
}

@compute @workgroup_size(64)
fn pressureCS(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;

  var particle = dataRead.particles[idx];

  var density: f32 = particle.density;
	var pressure: f32 = calculatePressure(density);
  // var pressure: f32 = 1.0;

	particle.pressure = pressure;
  dataWrite.particles[idx] = particle;
}

@compute @workgroup_size(64)
fn forceCS(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;

  var particle = dataRead.particles[idx];

  var position: vec3f = particle.position;
  var velocity: vec3f = particle.velocity;
  var density: f32 = particle.density;
  var pressure: f32 = particle.pressure;

  let h_sq = params.smoothlen * params.smoothlen;

  var press: vec2<f32> = vec2<f32>(0.0, 0.0);
  var visco: vec2<f32> = vec2<f32>(0.0, 0.0);

  for (var i = 0u; i < arrayLength(&dataRead.particles); i= i + 1u) {
    if(i == idx) {
      continue;
    }
    let p = dataRead.particles[i];

    let diff: vec3f = p.position - position;
    let r2: f32 = dot(diff, diff);

    if (r2 < h_sq) {
      var i_density: f32 = p.density;
			var i_pressure: f32 = p.pressure;
			var i_velocity: vec2<f32> = p.velocity.xy;
			var r: f32 = sqrt(r2);

			// 圧力項
      press += calculateGradPressure(r, pressure, i_pressure, i_density, diff.xy);

			// 粘性項
			visco += calculateLapVelocity(r, velocity.xy, i_velocity, i_density);
    }
  }

  var force: vec2<f32> = press + params.viscosity * visco;
  var acceleration: vec2<f32> = force / (density);

  particle.acceleration = vec3f(acceleration.x, acceleration.y, 0.0);
  dataWrite.particles[idx] = particle;
}

@compute @workgroup_size(64)
fn swapBuffer(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;
  var particle = dataWrite.particles[idx];

  dataRead.particles[idx] = particle;
}