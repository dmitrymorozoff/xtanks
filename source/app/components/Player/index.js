import * as THREE from "three";
import Tank from "../Tank/index.js";

export default class Player {
    constructor(
        scene,
        camera,
        size,
        x,
        y,
        z,
        color,
        rotate,
        collidableMeshList
    ) {
        this.scene = scene;
        this.size = size;
        this.camera = camera;
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
        this.player = null;
        this.rotate = rotate;
        this.speed = 12;
        this.angle = 0;
        this.collidableMeshList = collidableMeshList;
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
        this.camera.rotation.y += newAngleLeft;
        this.angle += newAngleLeft;
    }
    moveRight() {
        let newAngleRight = this.speed * 0.0174533;
        this.player.tank.rotation.y -= newAngleRight;
        this.camera.rotation.y -= newAngleRight;
        this.angle -= newAngleRight;
    }
    moveTop() {
        this.player.tank.position.x += Math.sin(this.angle) * this.speed;
        this.player.tank.position.z += Math.cos(-this.angle) * this.speed;
    }
    moveUp(newPosition) {
        this.player.tank.position.y = newPosition;
    }
    moveBottom() {
        this.player.tank.position.x -= Math.sin(this.angle) * this.speed;
        this.player.tank.position.z -= Math.cos(-this.angle) * this.speed;
    }
    rotateGun(x, y) {
        let angle = Math.atan2(y - this.y, x - this.x);
        console.log(angle);
        let newAngle = angle * this.speed - this.angle;
        this.player.tank.rotation.y = newAngle;
    }
    detectCollision() {
        let originPoint = this.player.tank.position.clone();
        const self = this;
        if (this.player.main.geometry) {
            for (
                let vertexIndex = 0;
                vertexIndex < this.player.main.geometry.vertices.length;
                vertexIndex++
            ) {
                var localVertex = this.player.main.geometry.vertices[
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
    handleObjectsCollision(collisionResult) {
        console.log(collisionResult);

        // var collision = new THREE.Vector3();
        // collision.x =
        //     (meshA.position.x * OBJ_SIZE + meshB.position.x * OBJ_SIZE) /
        //     (OBJ_SIZE + OBJ_SIZE);
        // collision.y =
        //     (meshA.position.y * OBJ_SIZE + meshB.position.y * OBJ_SIZE) /
        //     (OBJ_SIZE + OBJ_SIZE);
        // collision.z =
        //     (meshA.position.z * OBJ_SIZE + meshB.position.z * OBJ_SIZE) /
        //     (OBJ_SIZE + OBJ_SIZE);
    }
}
