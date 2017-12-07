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
            color: this.color,
        });
        const capGeometry = new THREE.BoxGeometry(
            this.size / 1.5,
            this.size / 1.5,
            this.size / 1.5,
        );
        const trunkMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });
        const trunkGeometry = new THREE.BoxGeometry(
            this.size / 15,
            this.size * 3,
            this.size / 15,
        );
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(this.x, this.y + this.size * 1.5, this.z);
        this.lamp.add(trunk);
        const light = new THREE.PointLight(this.color, 8.5, 2250, 2.0);
        light.add(new THREE.Mesh(capGeometry, capMaterial));
        light.position.set(this.x, this.y, this.z);
        this.scene.add(light);
        this.scene.add(this.lamp);
    }
}
