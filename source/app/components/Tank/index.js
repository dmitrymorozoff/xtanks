import * as THREE from "three";

export default class Cube {
    constructor(scene, width, height, depth, x, y, z, color) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
        this.cube = null;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    draw() {
        const cubeGeometry = new THREE.BoxGeometry(
            this.width,
            this.height,
            this.depth
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
    move(x = 0, y = 0, z = 0) {
        this.cube.position.x = x;
        this.cube.position.y = y;
        this.cube.position.z = z;
    }
}
