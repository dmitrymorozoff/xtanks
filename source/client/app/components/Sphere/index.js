import * as THREE from "three";

export default class Sphere {
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
        const sphereGeometry = new THREE.SphereBufferGeometry(200, 200, 200);
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        const sphereLight = new THREE.PointLight(this.color, 6.7, 1800, 2.0);
        sphereLight.add(new THREE.Mesh(sphereGeometry, sphereMaterial));
        sphereLight.position.set(this.x, this.y, this.z);
        this.scene.add(sphereLight);
    }
}
