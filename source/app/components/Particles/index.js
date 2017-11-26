import * as THREE from "three";
import getRandomInt from "../../../utils/index.js";

export default class Particles {
    constructor(scene, width, height, depth, color, particleCount) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
        this.particleCount = particleCount;
    }
    draw() {
        const particleMaterial = new THREE.PointCloudMaterial({
            color: this.color,
            size: 15
        });
        const particleGeometry = new THREE.Geometry();
        let x, y, z;
        for (let i = 0; i < this.particleCount; i++) {
            x = getRandomInt(-this.width, this.width);
            y = getRandomInt(-this.height/5, this.height);
            z = getRandomInt(-this.depth, this.depth);
            particleGeometry.vertices.push(new THREE.Vector3(x, y, z));
        }
        const pointCloud = new THREE.PointCloud(
            particleGeometry,
            particleMaterial
        );
        this.scene.add(pointCloud);
    }
}
