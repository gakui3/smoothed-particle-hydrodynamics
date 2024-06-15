import {mat4, vec3} from "wgpu-matrix";

export class ArcRotateCamera {
  constructor(alpha, beta, radius, target = [0, 0, 0]) {
    this.alpha = alpha;
    this.beta = beta;
    this.radius = radius;
    this.target = vec3.create();
    vec3.set(target[0], target[1], target[2], this.target);
    this.cameraPosition = vec3.create();
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
  }

  calculatePosition() {
    this.cameraPosition[0] =
      this.radius * Math.sin(this.beta) * Math.cos(this.alpha);
    this.cameraPosition[1] = this.radius * Math.cos(this.beta);
    this.cameraPosition[2] =
      this.radius * Math.sin(this.beta) * Math.sin(this.alpha);
    vec3.add(this.cameraPosition, this.cameraPosition, this.target);
  }

  updateMVPMatrix() {
    const canvas = document.querySelector("canvas");
    const aspect = canvas.width / canvas.height;
    const projection = mat4.perspective((2 * Math.PI) / 5, aspect, 1, 100.0);
    const view = mat4.create();
    const mvp = mat4.create();

    this.calculatePosition();

    mat4.identity(view);
    mat4.translate(view, this.cameraPosition, view);
    mat4.lookAt(
      this.cameraPosition,
      vec3.fromValues(0, 0, 0),
      vec3.fromValues(0, 1, 0),
      view
    );
    mat4.multiply(projection, view, mvp);

    const mat = new Float32Array([
      mvp[0],
      mvp[1],
      mvp[2],
      mvp[3],
      mvp[4],
      mvp[5],
      mvp[6],
      mvp[7],
      mvp[8],
      mvp[9],
      mvp[10],
      mvp[11],
      mvp[12],
      mvp[13],
      mvp[14],
      mvp[15],
      view[0],
      view[4],
      view[8], // right

      0, // padding

      view[1],
      view[5],
      view[9], // up

      0, // padding
    ]);

    return mat;
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
      this.beta = Math.max(0.1, Math.min(Math.PI - 0.1, this.beta));
    }
  }

  onWheel(event) {
    this.radius += event.deltaY * 0.01;
    this.radius = Math.max(2, Math.min(50, this.radius));
  }

  attachControl(canvas) {
    canvas.addEventListener("mousedown", (event) => this.onMouseDown(event));
    canvas.addEventListener("mouseup", () => this.onMouseUp());
    canvas.addEventListener("mousemove", (event) => this.onMouseMove(event));
    canvas.addEventListener("wheel", (event) => this.onWheel(event));
  }
}
