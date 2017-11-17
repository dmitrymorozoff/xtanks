import * as THREE from "three";
import { CUBE_SIZE } from "../../../constants/index.js";

export const landMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    shading: THREE.SmoothShading,
    vertexColors: THREE.VertexColors
});
export const landGeometry = new THREE.BoxGeometry(
    CUBE_SIZE,
    CUBE_SIZE,
    CUBE_SIZE
);
