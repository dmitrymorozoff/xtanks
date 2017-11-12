import * as THREE from "three";

export default class Cube {
    constructor(
        scene,
        width,
        height,
        depth,
        x = 0,
        y = 0,
        z = 0,
        color,
        material
    ) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
        this.cube = null;
        this.material = material;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    draw() {
        const cubeGeometry = new THREE.BoxGeometry(
            this.width,
            this.height,
            this.depth
        );
        let cubeMaterial = null;
        let lineGeometry = new THREE.EdgesGeometry(cubeGeometry);
        switch (this.material) {
            case "basic":
                cubeMaterial = new THREE.MeshBasicMaterial({
                    color: this.color
                });
                break;
            case "phong":
                cubeMaterial = new THREE.MeshPhongMaterial({
                    color: this.color
                });
                break;
            case "edge":
                cubeMaterial = new THREE.LineBasicMaterial({
                    color: this.color,
                    linewidth: 4
                });

                break;
            default:
                break;
        }
        const wireframe = new THREE.LineSegments(lineGeometry, cubeMaterial);
        wireframe.renderOrder = 1;

        if (this.material !== "edge") {
            this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        } else {
            this.cube = wireframe;
        }

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
