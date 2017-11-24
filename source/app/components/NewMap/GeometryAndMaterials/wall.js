import * as THREE from "three";
import { CUBE_SIZE, PURPLE, RED, PINK } from "../../../constants/index.js";

export const wallGeometries = {
    dark: new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE / 5, CUBE_SIZE),
    full: new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE),
    light: new THREE.BoxGeometry(CUBE_SIZE - 25, CUBE_SIZE / 5, CUBE_SIZE - 25),
    miniCubes: new THREE.BoxGeometry(
        CUBE_SIZE / 8,
        CUBE_SIZE / 8,
        CUBE_SIZE / 8
    )
};

export const wallMaterials = {
    dark: new THREE.MeshLambertMaterial({
        color: 0x0c082c
    }),
    light: [
        new THREE.MeshBasicMaterial({
            color: PURPLE
        }),
        new THREE.MeshBasicMaterial({
            color: RED
        }),
        new THREE.MeshBasicMaterial({
            color: PINK
        })
    ]
};
