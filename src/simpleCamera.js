import {mat4, vec3} from "wgpu-matrix";

export class SimpleCamera {
  constructor(position = [0, 0, 0], target = [0, 0, 0]) {
    this.cameraPosition = vec3.fromValues(
      position[0],
      position[1],
      position[2]
    );
    this.target = vec3.fromValues(target[0], target[1], target[2]);
  }

  updateMVPMatrix() {
    const canvas = document.querySelector("canvas");
    const aspect = canvas.width / canvas.height;
    const projection = mat4.perspective((2 * Math.PI) / 5, aspect, 1, 100.0);
    const view = mat4.create();
    const mvp = mat4.create();

    mat4.identity(view);
    mat4.translate(view, this.cameraPosition, view);
    mat4.lookAt(
      this.cameraPosition,
      this.target,
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
}
