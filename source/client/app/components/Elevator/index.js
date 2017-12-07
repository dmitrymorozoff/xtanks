import * as THREE from "three";
import { SECOND_FLOOR_HEIGHT } from "../../constants/index";

export default class Elevator {
    constructor(scene, size, x = 0, y = 0, z = 0, color) {
        this.scene = scene;
        this.size = size;
        this.color = color;
        this.x = x;
        this.y = y;
        this.z = z;
        this.elevator = new THREE.Group();
    }
    draw() {
        const mainGeometry = new THREE.BoxGeometry(
            this.size * 2,
            this.size,
            this.size * 2,
        );
        const mainMaterial = new THREE.MeshLambertMaterial({
            color: this.color,
        });
        this.elevator = new THREE.Mesh(mainGeometry, mainMaterial);
        this.elevator.position.x = this.x - this.size / 2;
        this.elevator.position.y = this.y;
        this.elevator.position.z = this.z - this.size / 2;
        this.scene.add(this.elevator);
    }
    move() {
        const newY = this.size * (SECOND_FLOOR_HEIGHT - 1);
        TweenMax.to(this.elevator.position, 4, {
            y: newY,
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut,
        });
    }
}
