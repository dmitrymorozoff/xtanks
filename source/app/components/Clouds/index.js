import * as THREE from "three";
import getRandomInt from "../../../utils/index.js";

export default class Clouds {
    constructor(scene, x = 0, y = 0, z = 0) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.z = z;
        this.clouds = null;
    }
    draw() {
        let min = 80;
        let max = 100;
        this.clouds = new THREE.Group();
        for (let i = 0; i < 3; i++) {
            let geometryCloud = new THREE.SphereGeometry(
                getRandomInt(min, max),
                50,
                50
            );
            let materialCloud = new THREE.MeshPhongMaterial({
                color: 0xffffff
            });
            let cloud = new THREE.Mesh(geometryCloud, materialCloud);
           if (i === 1) {
                cloud.position.x +=
                    this.clouds.children[0].geometry.parameters.radius;
            }
            if (i === 2) {
                cloud.position.x -=
                    this.clouds.children[0].geometry.parameters.radius;
            }
            min -=20;
            max -=20;
            this.clouds.add(cloud);
        }
        this.clouds.position.x = this.x;
        this.clouds.position.y = this.y;
        this.clouds.position.z = this.z;
        console.log(this.clouds);
        this.scene.add(this.clouds);
    }
}
