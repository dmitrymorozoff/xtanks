import * as THREE from "three";
import { DEG_TO_RAD } from "../../../constants/index";

export default class Coin {
    constructor(scene, size, x = 0, y = 0, z = 0, color) {
        this.scene = scene;
        this.size = size;
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
        this.coin = null;
    }
    load() {
        const coinMaterial = new THREE.MeshStandardMaterial({
            color: this.color,
        });
        const coinGeometry = new THREE.CylinderGeometry(
            this.size,
            this.size,
            this.size / 2,
            32,
        );
        this.coin = new THREE.Mesh(coinGeometry, coinMaterial);
        this.coin.position.x = this.x;
        this.coin.position.y = this.y;
        this.coin.position.z = this.z;
        this.coin.rotation.x = 90 * DEG_TO_RAD;
        this.scene.add(this.coin);
    }
    move() {
        TweenMax.to(this.coin.rotation, 2.5, {
            z: 360 * DEG_TO_RAD,
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut,
        });
    }
}
