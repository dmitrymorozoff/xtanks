import * as THREE from "three";

export default class Cactus {
    constructor(scene, size, x = 0, y = 0, z = 0, color) {
        this.scene = scene;
        this.size = size;
        this.color = color;
        this.x = x;
        this.y = y;
        this.z = z;
        this.cactus = new THREE.Group();
    }
    draw() {
        const mainGeometry = new THREE.BoxGeometry(
            this.size,
            this.size * 6,
            this.size
        );
        const leftAndRightCubeGeometry = new THREE.BoxGeometry(
            this.size,
            this.size,
            this.size
        );
        const mainMaterial = new THREE.MeshPhongMaterial({
            color: this.color
        });

        const main = new THREE.Mesh(mainGeometry, mainMaterial);
        const leftCube =  new THREE.Mesh(leftAndRightCubeGeometry,mainMaterial );
        const rightCube =  new THREE.Mesh(leftAndRightCubeGeometry, mainMaterial);
        leftCube.position.x = -this.size;
        leftCube.position.y = this.size;
        rightCube.position.x = this.size;
        rightCube.position.y = this.size;

        this.cactus.add(main);
        this.cactus.add(leftCube);
        this.cactus.add(rightCube);

        this.cactus.position.x = this.x;
        this.cactus.position.y = this.y;
        this.cactus.position.z = this.z;
        this.scene.add(this.cactus);
    }
}
