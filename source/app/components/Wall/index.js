import Cube from "../Map/components/Cube/index";
import * as THREE from "three";
import getRandomInt from "../../../utils/index.js";

export default class Wall {
    constructor(
        scene,
        size,
        height = 1,
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
        this.height = height;
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
        let part = null;
        switch (this.type) {
            case 1:
                for (let i = 0; i < 5 * this.height; i++) {
                    if (i % 2 !== 0) {
                        part = new THREE.Mesh(
                            this.geometries.light,
                            this.materials.light[
                                getRandomInt(0, this.materials.light.length)
                            ]
                        );
                        part.position.y =
                            (i - 1) * this.size / 4 - this.size / 6;
                        this.wall.add(part);
                    } else {
                        part = new THREE.Mesh(
                            this.geometries.dark,
                            this.materials.dark
                        );

                        part.position.y =
                            (i - 1) * this.size / 4 - this.size / 6;
                        this.wall.add(part);
                    }
                }
                let rand = getRandomInt(0, 100);
                if (rand > 80) {
                    const light = new THREE.PointLight(this.color, 1, 600);
                    light.position.set(this.x, this.y + this.size, this.z);
                    this.scene.add(light);
                }
                break;
            case 2:
                part = new THREE.Mesh(
                    this.geometries.full,
                    this.materials.dark
                );
                part.scale.set(1, this.height, 1);
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
