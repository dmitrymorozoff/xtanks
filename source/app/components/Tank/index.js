import * as THREE from "three";
import Cube from "../Map/components/Cube/index.js";

export default class Tank {
    constructor(scene, size, x = 0, y = 0, z = 0, color) {
        this.scene = scene;
        this.size = size;
        this.color = color;
        this.x = x;
        this.y = y;
        this.z = z;
        this.tank = new THREE.Group();
    }
    load() {
        let geometryMain = new THREE.BoxGeometry(
            this.size,
            this.size / 2,
            this.size
        );

        let materialMain = new THREE.MeshPhongMaterial({
            color: this.color
        });

        const main = new THREE.Mesh(geometryMain, materialMain);

        let geometryMainTB = new THREE.BoxGeometry(
            this.size / 2,
            this.size / 2,
            this.size / 2
        );

        const mainTop = new THREE.Mesh(geometryMainTB, materialMain);
        mainTop.position.y += this.size / 2;

        const geometryGun = new THREE.BoxGeometry(
            this.size / 4,
            this.size / 7,
            this.size
        );

        const gun = new THREE.Mesh(geometryGun, materialMain);
        gun.position.y += this.size / 2;
        gun.position.z += this.size / 2;

        this.tank.position.x = this.x;
        this.tank.position.z = this.z;
        this.tank.position.y = this.y;

        this.tank.add(main);
        this.tank.add(mainTop);
        this.tank.add(gun);

        this.scene.add(this.tank);
    }
}
