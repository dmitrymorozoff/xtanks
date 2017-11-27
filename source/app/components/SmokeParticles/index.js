import * as THREE from "three";
import getRandomInt from "../../../utils/index";

export default class SmokeParticles {
    constructor(scene, x = 0, y = 0, z = 0, count, textureUrl, size, color) {
        this.scene = scene;
        this.textureUrl = textureUrl;
        this.size = size;
        this.count = count;
        this.color = color;
        this.x = x;
        this.y = y;
        this.z = z;
        this.smoke = null;
    }
    draw() {
        const smokeTexture = THREE.ImageUtils.loadTexture(this.textureUrl);
        const smokeParticles = new THREE.Geometry();
        for (let i = 0; i < this.count; i++) {
            let particle = new THREE.Vector3(
                getRandomInt(5, 800),
                getRandomInt(5, 300),
                getRandomInt(5, 800)
            );
            smokeParticles.vertices.push(particle);
        }
        const smokeMaterial = new THREE.ParticleBasicMaterial({
            map: smokeTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            size: this.size,
            color: this.color
        });
        this.smoke = new THREE.ParticleSystem(smokeParticles, smokeMaterial);
        this.smoke.sortParticles = true;
        this.smoke.position.x = this.x;
        this.smoke.position.y = this.y;
        this.smoke.position.z = this.z;
        this.scene.add(this.smoke);
    }
}
