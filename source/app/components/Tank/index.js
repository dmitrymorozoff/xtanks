import * as THREE from "three";
import Cube from "../Map/components/Cube/index.js";

export default class Tank {
    constructor(scene, size, x = 0, y = 0, z = 0, color, rotate = 0) {
        this.scene = scene;
        this.size = size;
        this.color = color;
        this.x = x;
        this.y = y;
        this.z = z;
        this.tank = new THREE.Group();
        this.rotate = rotate;
    }
    load() {
        let geometryMain = new THREE.BoxGeometry(
            this.size,
            this.size / 3,
            this.size
        );

        let materialMain = new THREE.MeshLambertMaterial({
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
            this.size / 6,
            this.size / 8,
            this.size
        );

        let materialGun = new THREE.MeshLambertMaterial({
            color: 0x444444
        });

        const gun = new THREE.Mesh(geometryGun, materialGun);
        gun.position.y += this.size / 2;
        gun.position.z += this.size / 2;

        const geometryTrack = new THREE.BoxGeometry(
            this.size / 4,
            this.size / 8,
            this.size
        );

        let materialTrack = new THREE.MeshLambertMaterial({
            color: 0x222222
        });

        const leftTrack = new THREE.Mesh(geometryTrack, materialTrack);
        const rightTrack = new THREE.Mesh(geometryTrack, materialTrack);

        leftTrack.position.y -= this.size / 4 + this.size / 14;
        leftTrack.position.x -= this.size / 4 + this.size / 10;
        rightTrack.position.y -= this.size / 4 + this.size / 14;
        rightTrack.position.x += this.size / 4 + this.size / 10;

        this.tank.position.x = this.x;
        this.tank.position.z = this.z;
        this.tank.position.y = this.y;

        this.tank.rotation.y = this.rotate * 0.0174533;

        this.tank.add(main);
        this.tank.add(mainTop);
        this.tank.add(gun);
        this.tank.add(leftTrack);
        this.tank.add(rightTrack);

        this.scene.add(this.tank);
    }
}
