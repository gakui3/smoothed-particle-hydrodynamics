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
    this.projection = mat4.perspective((2 * Math.PI) / 5, aspect, 1, 100.0);
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

    const invertView = mat4.create();
    const invertProjection = mat4.create();
    mat4.invert(this.view, invertView);
    mat4.invert(this.projection, invertProjection);

    const invertViewProjection = mat4.create();
    mat4.multiply(invertView, invertProjection, invertViewProjection);

    const ix = (x / canvas.width) * 4 - 1;
    const iy = 1 - (y / canvas.height) * 4;

    const screenPos = vec3.fromValues(ix, iy, z);

    const worldPos = vec3.create();
    vec3.transformMat4(screenPos, invertViewProjection, worldPos);

    console.log(worldPos);

    return worldPos;
  }
}
