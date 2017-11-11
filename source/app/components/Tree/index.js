import * as THREE from "three";
import Cube from "../Map/components/Cube/index.js";

export default class Tree {
    constructor(scene, x = 0, y = 0, z = 0, size, color) {
        this.scene = scene;
        this.color = color;
        this.size = size;
        this.x = x;
        this.y = y;
        this.z = z;
        this.meshes = [];
    }
    load() {
        const trunk = new Cube(
            this.scene,
            this.size / 4,
            this.size / 1.5,
            this.size / 4,
            this.x,
            this.y,
            this.z,
            0x555555
        );
        const cap = new Cube(
            this.scene,
            this.size / 1.5,
            this.size / 1.5,
            this.size / 1.5,
            this.x,
            this.y + this.size / 1.5,
            this.z,
            this.color
        );
        var light = new THREE.PointLight(0xffffff, 1.5, 1600);
        light.position.set(
            this.x,
            this.y + this.size / 1.5,
            this.z,
        );
        this.scene.add(light);
        trunk.draw();
        cap.draw();
    }
}
