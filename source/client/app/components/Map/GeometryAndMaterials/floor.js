import * as THREE from "three";
import { CUBE_SIZE } from "../../../constants/index";

export const floorMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    shading: THREE.SmoothShading,
    vertexColors: THREE.VertexColors,
});

export const lightCubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    shading: THREE.SmoothShading,
    vertexColors: THREE.VertexColors,
});

export const floorBottomMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    shading: THREE.SmoothShading,
    vertexColors: THREE.VertexColors,
});

export const floorGeometry = new THREE.BoxGeometry(
    CUBE_SIZE,
    CUBE_SIZE,
    CUBE_SIZE,
);
