import * as THREE from "three";
import Supertank from "../Supertank/index";

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
            health: 100,
        },
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
            rotate: this.rotate,
        });
        this.player.initModel();
        this.player.draw();
    }
    setSpeed(delta) {
        this.speed = 1000 * delta;
    }
    shoot() {
        const bulletGeometry = new THREE.SphereGeometry(7, 7, 7);
        const bulletMaterial = new THREE.MeshLambertMaterial({
            color: 0x777777,
        });
        const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
        var speedX = 20 * Math.sin(this.player.towerAngle + 1.5708);
        var speedY = 20 * Math.cos(-(this.player.towerAngle + 1.5708));
        let newX = this.player.x;
        let newY = this.player.z;
        setInterval(() => {
            newX += speedX;
            newY += speedY;
            bullet.position.set(newX, 150, newY);
        }, 10);

        console.log(this.player.towerAngle);
        this.scene.add(bullet);
    }
    getPosition() {
        let position = new THREE.Vector3();
        position.set(this.player.x, this.player.y, this.player.z);
        return position;
    }
    setNewData(data) {
        this.x = data.x;
        this.z = data.z;
        this.angle = data.angle;
        this.player.tower.rotation.y = data.towerAngle;
        this.player.corps.rotation.y = data.angle;
        this.player.tank.position.x = data.x;
        this.player.tank.position.z = data.z;
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
                let localVertex = this.player.corps.geometry.vertices[
                    vertexIndex
                ].clone();
                let globalVertex = localVertex.applyMatrix4(
                    this.player.tank.matrix,
                );
                let directionVector = globalVertex.sub(
                    this.player.tank.position,
                );
                let ray = new THREE.Raycaster(
                    originPoint,
                    directionVector.clone().normalize(),
                );
                let intersects = ray.intersectObjects(
                    this.collidableMeshList,
                    true,
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
