// ArcRotateCamera.js
import {mat4, vec3} from "wgpu-matrix";

export class ArcRotateCamera {
  constructor(alpha, beta, radius, target = [0, 0, 0]) {
    this.alpha = alpha;
    this.beta = beta;
    this.radius = radius;
    this.target = vec3.fromValues(...target);
    this.cameraPosition = vec3.create();
    this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();
    this.mvpMatrix = mat4.create();
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
  }

  updateViewMatrix() {
    this.cameraPosition[0] =
      this.target[0] + this.radius * Math.sin(this.beta) * Math.cos(this.alpha);
    this.cameraPosition[1] = this.target[1] + this.radius * Math.cos(this.beta);
    this.cameraPosition[2] =
      this.target[2] + this.radius * Math.sin(this.beta) * Math.sin(this.alpha);
    mat4.lookAt(
      this.viewMatrix,
      this.cameraPosition,
      this.target,
      vec3.fromValues(0, 1, 0)
    );
  }

  updateProjectionMatrix(
    aspect,
    fov = (2 * Math.PI) / 5,
    near = 1,
    far = 100.0
  ) {
    mat4.perspective(this.projectionMatrix, fov, aspect, near, far);
  }

  updateMVPMatrix() {
    mat4.multiply(this.mvpMatrix, this.projectionMatrix, this.viewMatrix);
  }

  onMouseDown(event) {
    this.isDragging = true;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  onMouseUp() {
    this.isDragging = false;
  }

  onMouseMove(event) {
    if (this.isDragging) {
      const deltaX = event.clientX - this.lastMouseX;
      const deltaY = event.clientY - this.lastMouseY;
      this.alpha += deltaX * 0.01;
      this.beta += deltaY * 0.01;
      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;
      this.beta = Math.max(0.1, Math.min(Math.PI - 0.1, this.beta)); // 上下方向の制限
    }
  }

  onWheel(event) {
    this.radius += event.deltaY * 0.01;
    this.radius = Math.max(2, Math.min(50, this.radius)); // 距離の制限
  }

  attachControl(canvas) {
    canvas.addEventListener("mousedown", (event) => this.onMouseDown(event));
    canvas.addEventListener("mouseup", () => this.onMouseUp());
    canvas.addEventListener("mousemove", (event) => this.onMouseMove(event));
    canvas.addEventListener("wheel", (event) => this.onWheel(event));
  }
}
