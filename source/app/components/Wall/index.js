import Cube from "../Map/components/Cube/index";
import * as THREE from "three";

export default class Wall {
    constructor(scene, size, height = 1, x = 0, y = 0, z = 0, color) {
        this.scene = scene;
        this.size = size;
        this.color = color;
        this.height = height;
        this.x = x;
        this.y = y;
        this.z = z;
        this.wall = new THREE.Group();
    }
    draw() {
        const cubeGeometry = new THREE.BoxGeometry(
            this.size,
            this.size * this.height,
            this.size
        );

        const cubeMaterial = new THREE.MeshPhongMaterial({
            color: this.color
        });

        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        cube.position.x = this.x;
        cube.position.y = this.y;
        cube.position.z = this.z;

        this.wall.add(cube);
        this.scene.add(this.wall);
    }
}
