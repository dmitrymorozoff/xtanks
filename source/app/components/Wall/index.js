import Cube from "../Map/components/Cube/index";
import * as THREE from "three";

export default class Wall {
    constructor(scene, size, height = 1, x = 0, y = 0, z = 0, color, type = 1) {
        this.scene = scene;
        this.size = size;
        this.color = color;
        this.height = height;
        this.type = type;
        this.x = x;
        this.y = y;
        this.z = z;
        this.wall = new THREE.Group();
    }
    draw() {
        const cubeDarkGeometry = new THREE.BoxGeometry(
            this.size,
            this.size / 4,
            this.size
        );

        const cubeFullGeometry = new THREE.BoxGeometry(
            this.size,
            this.size * this.height,
            this.size
        );

        console.log(this.size * this.height);

        const cubeDarkMaterial = new THREE.MeshPhongMaterial({
            color: 0x0C082C
        });

        const cubeLightGeometry = new THREE.BoxGeometry(
            this.size - 25,
            this.size / 4,
            this.size - 25
        );

        const cubeLightMaterial = new THREE.MeshBasicMaterial({
            color: this.color
        });
        let part = null;
        switch (this.type) {
            case 1:
                for (let i = 0; i < 5 * this.height; i++) {
                    if (i % 2 !== 0) {
                        part = new THREE.Mesh(
                            cubeLightGeometry,
                            cubeLightMaterial
                        );
                        part.position.y =
                            (i - 1) * this.size / 4 - this.size / 6;
                        this.wall.add(part);
                    } else {
                        part = new THREE.Mesh(
                            cubeDarkGeometry,
                            cubeDarkMaterial
                        );
                        part.position.y =
                            (i - 1) * this.size / 4 - this.size / 6;
                        this.wall.add(part);
                    }
                }
                const light = new THREE.PointLight(this.color, 1, 400);
                light.position.set(this.x, this.y + this.size, this.z);
                this.scene.add(light);
                break;
            case 2:
                part = new THREE.Mesh(cubeFullGeometry, cubeDarkMaterial);
                part.position.y = this.size / 2;
                this.wall.add(part);
                break;
            default:
                break;
        }

        this.wall.position.x = this.x;
        this.wall.position.y = this.y;
        this.wall.position.z = this.z;

        this.scene.add(this.wall);
    }
}
