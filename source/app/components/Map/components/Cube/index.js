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
        materialType,
        mat = "",
    ) {
        this.scene = scene;
        this.geometry = geometry;
        this.color = color;
        this.cube = null;
        this.materialType = materialType;
        this.x = x;
        this.y = y;
        this.z = z;
        this.material = material;        
    }
    draw() {
        let lineGeometry = new THREE.EdgesGeometry(cubeGeometry);
        switch (this.materialType) {
            case "basic":
                cubeMaterial = new THREE.MeshBasicMaterial({
                    color: this.color
                });
                break;
            case "lambert":
                cubeMaterial = this.material;
                break;
            case "phong":
                cubeMaterial = new THREE.MeshPhongMaterial({
                    color: this.color
                });
                break;
            default:
                break;
        }
        let cube = null;
        cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
       
        cube.position.x = this.x;
        cube.position.y = this.y;
        cube.position.z = this.z;
        // this.cube.castShadow = true;
        // this.cube.receiveShadow = false;
        this.scene.add(cube);
    }
    move(x = 0, y = 0, z = 0) {
        this.cube.position.x = x;
        this.cube.position.y = y;
        this.cube.position.z = z;
    }
}
