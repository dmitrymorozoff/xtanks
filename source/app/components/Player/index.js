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
        this.speed = 10;
        this.angle = 0;
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
        this.angle = this.rotate * 0.0174533;
        this.player.load();
    }
    moveLeft() {
        let newAngleLeft = this.speed * 0.0174533;
        this.player.tank.rotation.y += newAngleLeft;
        this.angle += newAngleLeft;
    }
    moveRight() {
        let newAngleRight = this.speed * 0.0174533;
        this.player.tank.rotation.y -= newAngleRight;
        this.angle -= newAngleRight;
    }
    moveTop() {
        this.player.tank.position.x += Math.sin(this.angle) * this.speed;
        this.player.tank.position.z += Math.cos(-this.angle) * this.speed;
    }
    moveBottom() {
        this.player.tank.position.x -= Math.sin(this.angle) * this.speed;
        this.player.tank.position.z -= Math.cos(-this.angle) * this.speed;
    }
    rotateGun(x, y) {
        let angle = Math.atan2(y - this.y, x - this.x);
        console.log(angle);
        let newAngle = angle  * this.speed - this.angle;
        this.player.tank.rotation.y = newAngle;
    }
}
