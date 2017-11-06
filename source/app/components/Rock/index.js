import * as THREE from "three";

export default class Rock {
    constructor(scene, size, height, x = 0, y = 0, z = 0, color) {
        this.scene = scene;
        this.height = height;
        this.size = size;
        this.color = color;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    load() {
        const geometry = new THREE.ConeGeometry(this.size, this.height, 150);
        const material = new THREE.MeshPhongMaterial({ color: this.color });
        const rock = new THREE.Mesh(geometry, material);

        rock.position.x = this.x;
        rock.position.y = this.y;
        rock.position.z = this.z;

        this.scene.add(rock);
    }
}
