import * as THREE from "three";

export default function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function makeCube(size, color) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    for (let i = 0; i < geometry.faces.length; i++) {
        let face = geometry.faces[i];
        face.color.setHex(color);
    }
    const cube = new THREE.Mesh(geometry);
    return geometry;
}
