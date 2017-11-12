import * as THREE from "three";
import Cube from "../Map/components/Cube/index.js";
import getRandomInt from "../../../utils/index.js";

export default class BigTree {
    constructor(scene, x = 0, y = 0, z = 0, size, color) {
        this.scene = scene;
        this.color = color;
        this.size = size;
        this.x = x;
        this.y = y;
        this.z = z;
        this.tree = new THREE.Group();
    }
    load() {
        let positionY = this.y + this.size * 2;
        let size = this.size;
        for (let i = 0; i < 5; i++) {
            let cap = new Cube(
                this.scene,
                getRandomInt(size, size * 4),
                this.size / 2,
                getRandomInt(size, size * 4),
                this.x,
                positionY,
                this.z,
                this.color,
                "phong"
            );
            size /= 1.2;
            positionY += this.size / 2;
            cap.draw();
        }
        const trunk = new Cube(
            this.scene,
            this.size / 2,
            this.size * 4,
            this.size / 2,
            this.x,
            this.y,
            this.z,
            0x555555,
            "phong"
        );
        trunk.draw();
    }
}
