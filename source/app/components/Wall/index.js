import * as THREE from "three";
import getRandomInt from "../../../utils/index.js";

export default class Wall {
    constructor(
        scene,
        size,
        x = 0,
        y = 0,
        z = 0,
        color,
        type = 1,
        materials,
        geometries,
        light
    ) {
        this.scene = scene;
        this.size = size;
        this.color = color;
        this.type = type;
        this.materials = materials;
        this.geometries = geometries;
        this.light = light;
        this.x = x;
        this.y = y;
        this.z = z;
        this.wall = new THREE.Group();
    }
    draw() {
        switch (this.type) {
            case 1:
                part = new THREE.Mesh(
                    this.geometries.full,
                    this.materials.dark
                );
                part.scale.set(1, this.height, 1);
                part.position.y = this.size / 2;
                this.wall.add(part);
                break;
            case 2:
                for (let i = 0; i < 5 * this.height; i++) {
                    if (i % 2 !== 0) {
                        part = new THREE.Mesh(
                            this.geometries.light,
                            this.materials.light[
                                getRandomInt(0, this.materials.light.length)
                            ]
                        );
                        part.position.y =
                            (i - 1) * this.size / 5 - this.size / 5;
                        this.wall.add(part);
                    } else {
                        part = new THREE.Mesh(
                            this.geometries.dark,
                            this.materials.dark
                        );

                        part.position.y =
                            (i - 1) * this.size / 5 - this.size / 5;
                        this.wall.add(part);
                    }
                }
                if (getRandomInt(0, 2) === 1) {
                    this.wall.rotation.z = 90 * 0.0174533;
                }
                break;
            case 3:
                let miniCubesSide = new THREE.Geometry();
                let part = this.geometries.miniCubes;
                let material = this.materials.light[
                    getRandomInt(0, this.materials.light.length)
                ];
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        let x = i * this.size / 3.5 - this.size / 4;
                        let y = j * this.size / 3.5 - this.size / 4;
                        let z = 1;
                        part.translate(x, y, z);
                        miniCubesSide.merge(part);
                        part.translate(-x, -y, -z);
                    }
                }
                let windowPosition = this.size / 2;
                const windowRotations = [0, 0, 90 * 0.0174533, 90 * 0.0174533];
                let side = null;
                for (let i = 0; i < getRandomInt(1, 4); i++) {
                    side = new THREE.Mesh(miniCubesSide, material);
                    if (i < 2) {
                        side.position.z = windowPosition;
                    } else {
                        side.position.x = windowPosition;
                    }
                    windowPosition *= -1;

                    side.rotation.y = windowRotations[i];
                    this.wall.add(side);
                }
                const darkCube = new THREE.Mesh(
                    this.geometries.full,
                    this.materials.dark
                );
                let randTwo = getRandomInt(0, 100);
                if (randTwo > 70) {
                    const light = new THREE.PointLight(this.color, 1, 1000);
                    light.position.set(this.x, this.y + this.size, this.z);
                    this.scene.add(light);
                }
                this.wall.add(darkCube);
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
