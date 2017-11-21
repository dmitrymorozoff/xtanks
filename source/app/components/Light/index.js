import * as THREE from "three";

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

        const light = new THREE.PointLight(this.color, 1.8, 2100);
        light.add(new THREE.Mesh(capGeometry, capMaterial))
        light.position.set(this.x, this.y + this.size / 1.5, this.z);
        this.scene.add(light);

        this.scene.add(this.light);
    }
}
