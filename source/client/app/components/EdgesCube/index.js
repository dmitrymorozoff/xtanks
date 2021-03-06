import * as THREE from "three";
import { DARKNESS_GRAY } from "../../constants/index";

export default class EdgesCube {
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
            this.size,
        );
        const material = new THREE.MeshLambertMaterial({
            color: DARKNESS_GRAY,
            shading: THREE.FlatShading,
        });
        this.cube = new THREE.Mesh(cubeGeometry, material);
        this.cube.position.x = this.x;
        this.cube.position.y = this.y;
        this.cube.position.z = this.z;
        const geo = new THREE.EdgesGeometry(this.cube.geometry);
        const mat = new THREE.LineBasicMaterial({
            color: this.color,
            linewidth: 5,
        });
        const wireframe = new THREE.LineSegments(geo, mat);
        this.cube.add(wireframe);

        this.scene.add(this.cube);
    }
}
