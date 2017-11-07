import * as THREE from "three";
import { TweenMax, Power2, TimelineLite } from "gsap";
import Tank from "../Tank/index.js";

export default class Player {
    constructor(scene, size, x, y, z, color, rotate) {
        this.scene = scene;
        this.size = size;
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
        this.player = null;
        this.rotate = rotate;
    }
    draw() {
        this.player = new Tank(
            this.scene,
            this.size,
            this.x,
            this.y - this.size / 8,
            this.z,
            this.color,
            this.rotate
        );
        this.player.load();
    }
    moveTop() {
        this.player.tank.position.z += 5;
    }
    moveBottom() {
        this.player.tank.position.z -= 5;
    }
    moveLeft() {
        this.player.tank.position.x -= 5;
        this.player.tank.rotation.y += 0.2 * 0.0174533;
    }
    moveRight() {
        this.player.tank.position.x += 5;
        this.player.tank.rotation.y -= 0.2 * 0.0174533;
    }
}
