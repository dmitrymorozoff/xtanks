import * as THREE from "three";
import Supertank from "../Supertank/index.js";

export default class Player {
    constructor(
        scene,
        params = {
            camera: null,
            size: 100,
            x: 1,
            y: 1,
            z: 1,
            color: null,
            collidableMeshList: [],
            id: 1,
            name: "",
            type: "",
            isMe: "",
            health: 100
        }
    ) {
        this.scene = scene;
        this.size = params.size;
        this.camera = params.camera;
        this.x = params.x;
        this.y = params.y;
        this.z = params.z;
        this.color = params.color;
        this.name = params.name;
        this.id = params.id;
        this.type = params.type;
        this.isMe = params.isMe;
        this.health = params.health;
        this.player = null;
        this.speed = 20;
        this.angle = 0;
        this.rotate = 180;
        this.collidableMeshList = params.collidableMeshList;
    }
    draw() {
        this.angle = this.rotate * 0.0174533;
        this.player = new Supertank(this.scene, {
            id: this.id,
            name: this.name,
            type: this.type,
            isMe: this.isMe,
            x: this.x,
            y: this.y - this.size / 8,
            z: this.z,
            health: this.health,
            rotate: this.rotate
        });
        console.log(this.camera);
        this.player.initModel();
        this.player.draw();
    }
    setSpeed(delta) {
        this.speed = 1000 * delta;
    }
    getPosition() {
        let position = new THREE.Vector3();
        position.set(this.x, this.y, this.z);
        return position;
    }
    moveLeft() {
        let newAngleLeft = this.speed * 0.0174533;
        this.player.corps.rotation.y += newAngleLeft;
        this.camera.rotation.y += newAngleLeft;
        this.angle += newAngleLeft;
    }
    moveRight() {
        let newAngleRight = this.speed * 0.0174533;
        this.player.corps.rotation.y -= newAngleRight;
        this.camera.rotation.y -= newAngleRight;
        this.angle -= newAngleRight;
    }
    moveTop() {
        this.player.tank.position.x += Math.sin(this.angle) * this.speed;
        this.player.tank.position.z += Math.cos(-this.angle) * this.speed;
        this.x = this.player.tank.position.x;
        this.z = this.player.tank.position.z;
    }
    moveUp(newPosition) {
        this.player.tank.position.y = newPosition;
    }
    moveBottom() {
        this.player.tank.position.x -= Math.sin(this.angle) * this.speed;
        this.player.tank.position.z -= Math.cos(-this.angle) * this.speed;
        this.x = this.player.tank.position.x;
        this.z = this.player.tank.position.z;
    }
    rotateGun(x, y) {
        let angle = Math.atan2(y - this.y, x - this.x);
        let newAngle = angle * this.speed - this.angle;
        this.player.tank.rotation.y = newAngle;
    }
    detectCollision() {
        let originPoint = this.player.tank.position.clone();
        const self = this;
        if (this.player.corps.geometry) {
            for (
                let vertexIndex = 0;
                vertexIndex < this.player.corps.geometry.vertices.length;
                vertexIndex++
            ) {
                var localVertex = this.player.corps.geometry.vertices[
                    vertexIndex
                ].clone();
                let globalVertex = localVertex.applyMatrix4(
                    this.player.tank.matrix
                );
                let directionVector = globalVertex.sub(
                    this.player.tank.position
                );
                let ray = new THREE.Raycaster(
                    originPoint,
                    directionVector.clone().normalize()
                );
                let intersects = ray.intersectObjects(
                    this.collidableMeshList,
                    true
                );
                if (
                    intersects.length > 0 &&
                    intersects[0].distance < directionVector.length()
                ) {
                    self.handleObjectsCollision(intersects[0]);
                } else {
                    return false;
                }
            }
        }
    }
    handleObjectsCollision(intersects) {
        console.log("hit");
        console.log(intersects);
    }
}
