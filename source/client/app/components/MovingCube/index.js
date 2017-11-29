import * as THREE from "three";

export default class MovingCube {
    constructor(scene, size, x = 0, y = 0, z = 0, color) {
        this.scene = scene;
        this.size = size;
        this.color = color;
        this.x = x;
        this.y = y;
        this.z = z;
        this.cube = null;
    }
    load() {
        const cubeGeometry = new THREE.BoxGeometry(
            this.size,
            this.size,
            this.size
        );
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        this.cube = new THREE.Mesh(cubeGeometry, material);
        this.cube.position.x = this.x;
        this.cube.position.y = this.y;
        this.cube.position.z = this.z;
        this.scene.add(this.cube);
    }
    move() {
        const newY = this.y + this.size;
        TweenMax.to(this.cube.position, 1, {
            y: newY,
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut
        });
    }
}
