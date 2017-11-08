import * as THREE from "three";

export default class Water {
    constructor(scene, x = 0, y = 0, z = 0, size, color) {
        this.scene = scene;
        this.color = color;
        this.size = size;
        this.cube = null;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    draw() {
        const cubeGeometry = new THREE.BoxGeometry(
            this.size,
            this.size,
            this.size
        );
        const cubeMaterial = new THREE.MeshPhongMaterial({
            color: this.color
        });
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.cube.position.x = this.x;
        this.cube.position.y = this.y;
        this.cube.position.z = this.z;
        this.cube.castShadow = true;
        this.cube.receiveShadow = false;
        this.scene.add(this.cube);
    }
}