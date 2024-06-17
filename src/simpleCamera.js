import {mat4, vec3, vec4} from "wgpu-matrix";

export class SimpleCamera {
  constructor(position = [0, 0, 0], target = [0, 0, 0]) {
    this.cameraPosition = vec3.fromValues(
      position[0],
      position[1],
      position[2]
    );
    this.target = vec3.fromValues(target[0], target[1], target[2]);
    this.projection = mat4.create();
    this.view = mat4.create();
  }

  updateMVPMatrix() {
    const canvas = document.querySelector("canvas");
    const aspect = canvas.width / canvas.height;
    this.vfov = (2 * Math.PI) / 5;

    this.projection = mat4.perspective(this.vfov, aspect, 1, 100.0);
    const mvp = mat4.create();

    mat4.identity(this.view);
    mat4.translate(this.view, this.cameraPosition, this.view);
    mat4.lookAt(
      this.cameraPosition,
      this.target,
      vec3.fromValues(0, 1, 0),
      this.view
    );
    mat4.multiply(this.projection, this.view, mvp);

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
      this.view[0],
      this.view[4],
      this.view[8], // right

      0, // padding

      this.view[1],
      this.view[5],
      this.view[9], // up

      0, // padding
    ]);

    return mat;
  }

  screenToWorld(x, y, z) {
    const canvas = document.querySelector("canvas");

    const ix = (x / canvas.width) * 4 - 1;
    const iy = 1 - (y / canvas.height) * 4;

    const hfov =
      2 * Math.atan(Math.tan(this.vfov / 2) * (canvas.width / canvas.height));

    const sx = z * Math.tan(hfov / 2);
    const wx = ix * sx;

    const sy = z * Math.tan(this.vfov / 2);
    const wy = iy * sy;

    const worldPos = vec3.create();
    vec3.add(vec3.fromValues(wx, wy, 0), this.cameraPosition, worldPos);

    return worldPos;
  }
}
