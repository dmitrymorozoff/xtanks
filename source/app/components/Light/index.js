import * as THREE from "three";
import Cube from "../Map/components/Cube/index.js";

export default class Light {
    constructor(scene, x = 0, y = 0, z = 0, size, color) {
        this.scene = scene;
        this.color = color;
        this.size = size;
        this.x = x;
        this.y = y;
        this.z = z;
        this.light = new THREE.Group();
    }
    load() {
        const capMaterial = new THREE.MeshBasicMaterial({
            color: this.color
        });

        const capGeometry = new THREE.BoxGeometry(
            this.size / 1.5,
            this.size / 1.5,
            this.size / 1.5
        );
        const cap = new THREE.Mesh(capGeometry, capMaterial);
        cap.position.x = this.x;
        cap.position.y = this.y + this.size / 1.5;
        cap.position.z = this.z;
        this.light.add(cap);

        const trunkMaterial = new THREE.MeshPhongMaterial({
            color: 0x222222
        });

        const trunkGeometry = new THREE.BoxGeometry(
            this.size / 4,
            this.size / 1.5,
            this.size / 4
        );
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.x = this.x;
        trunk.position.y = this.y;
        trunk.position.z = this.z;
        this.light.add(trunk);

        const light = new THREE.PointLight(this.color, 1.5, 1600);
        light.position.set(this.x, this.y + this.size / 1.5, this.z);
        this.scene.add(light);

        this.scene.add(this.light);
    }
}
