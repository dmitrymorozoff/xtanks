import * as THREE from "three";
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
        const capMaterial = new THREE.MeshLambertMaterial({
            color: this.color
        });
        for (let i = 0; i < 5; i++) {
            let capGeometry = new THREE.BoxGeometry(
                getRandomInt(size, size * 4),
                this.size / 2,
                getRandomInt(size, size * 4)
            );
            let cap = new THREE.Mesh(capGeometry, capMaterial);
            cap.position.x = this.x;
            cap.position.y = positionY;
            cap.position.z = this.z;
            this.tree.add(cap);
            size /= 1.2;
            positionY += this.size / 2;
        }
        const trunkMaterial = new THREE.MeshLambertMaterial({
            color: 0x555555
        });

        const trunkGeometry = new THREE.BoxGeometry(
            this.size / 2,
            this.size * 4,
            this.size / 2
        );
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.x = this.x;
        trunk.position.y = this.y;
        trunk.position.z = this.z;
        this.tree.add(trunk);
        this.scene.add(this.tree);
    }
}
