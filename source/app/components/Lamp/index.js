import * as THREE from "three";

export default class Lamp {
    constructor(scene, x = 0, y = 0, z = 0, size, color) {
        this.scene = scene;
        this.color = color;
        this.size = size;
        this.x = x;
        this.y = y;
        this.z = z;
        this.lamp = new THREE.Group();
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
        cap.position.y = this.y;
        cap.position.z = this.z;
        this.lamp.add(cap);

        const trunkMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });

        const trunkGeometry = new THREE.BoxGeometry(
            this.size / 15,
            this.size * 5,
            this.size / 15
        );

        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.x = this.x;
        trunk.position.y = this.y + this.size * 2.5;
        trunk.position.z = this.z;
        this.lamp.add(trunk);

        const light = new THREE.PointLight(this.color, 1.5, 3500,2.0);
        light.position.set(this.x, this.y, this.z);
        this.scene.add(light);
        this.scene.add(this.lamp);
    }
}
