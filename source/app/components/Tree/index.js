import * as THREE from "three";
import Cube from "../Map/components/Cube/index.js";

export default class Tree {
    constructor(scene, x = 0, y = 0, z = 0, size, scale = 0) {
        this.scene = scene;
        this.scale = scale;
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
            0x7a3d2a
        );
        const cap = new Cube(
            this.scene,
            this.size / 1.5,
            this.size / 1.5,
            this.size / 1.5,
            this.x,
            this.y + this.size / 1.5,
            this.z,
            0x7bca33
        );
        trunk.draw();
        cap.draw();
    }
}
