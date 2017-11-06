import * as THREE from "three";
const OBJLoader = require("three-obj-loader");
import { level1 } from "./Level/index.js";
import Cube from "./components/Cube/index.js";
import Tree from "../Tree/index.js";
import Rock from "../Rock/index.js";
import Tank from "../Tank/index.js";
import getRandomInt from "../../../utils/index.js";
import Clouds from "../Clouds/index.js";

export default class Map {
    constructor(scene, x = 0, y = 0, z = 0, scale = 0) {
        this.scene = scene;
        this.scale = scale;
        this.objLoader = OBJLoader(THREE);
        this.loader = new THREE.OBJLoader();
        this.x = x;
        this.y = y;
        this.z = z;
        this.cubeSize = 100;
        this.cubesLand = [];
        this.cubesBarrier = [];
        this.colors = {
            landColors: [0x98cf4f, 0x91c25a, 0x6da248]
        };
    }

    load() {
        let color = null;
        const landIndex = 0;
        const centerMapI = level1[0].length / 2 * this.cubeSize;
        const centerMapJ = level1[0][0].length / 2 * this.cubeSize;
        const tank = new Tank(
            this.scene,
            this.cubeSize,
            400,
            200,
            400,
            0x4F9C4F  
        );
        tank.load();
        for (let i = 0; i < 3; i++) {
            const clouds = new Clouds(
                this.scene,
                getRandomInt(
                    0 - centerMapI - centerMapI / 4,
                    centerMapI + centerMapI / 4
                ),
                500,
                getRandomInt(
                    0 - centerMapJ - centerMapJ / 4,
                    centerMapJ + centerMapJ / 4
                )
            );
            clouds.draw();
        }
        for (let i = 0; i < level1.length; i++) {
            for (let j = 0; j < level1[i].length; j++) {
                for (let k = 0; k < level1[i][j].length; k++) {
                    if (i === 0) {
                        const land = new Cube(
                            this.scene,
                            this.cubeSize,
                            this.cubeSize,
                            this.cubeSize,
                            k * this.cubeSize - centerMapJ,
                            i * this.cubeSize,
                            j * this.cubeSize - centerMapI,
                            this.colors.landColors[
                                getRandomInt(0, this.colors.landColors.length)
                            ]
                        );
                        land.draw();
                    } else {
                        if (level1[i][j][k] === 1) {
                            color = 0x9e9e9e;
                            const barrier = new Cube(
                                this.scene,
                                this.cubeSize,
                                this.cubeSize,
                                this.cubeSize,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
                                j * this.cubeSize - centerMapI,
                                color
                            );
                            barrier.draw();
                        } else if (level1[i][j][k] === 2) {
                            const tree = new Tree(
                                this.scene,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize - this.cubeSize / 4,
                                j * this.cubeSize - centerMapI,
                                this.cubeSize,
                                0x4c9e0c
                            );
                            tree.load();
                        } else if (level1[i][j][k] === 3) {
                            const rock = new Rock(
                                this.scene,
                                this.cubeSize / 1.5,
                                getRandomInt(this.cubeSize, this.cubeSize * 5),
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize + 10,
                                j * this.cubeSize - centerMapI,
                                0x674c41
                            );
                            rock.load();
                        } else if (level1[i][j][k] === 4) {
                            const road = new Cube(
                                this.scene,
                                this.cubeSize,
                                this.cubeSize / 5,
                                this.cubeSize,
                                k * this.cubeSize - centerMapJ,
                                (i - 2) * this.cubeSize + 55,
                                j * this.cubeSize - centerMapI,
                                0xfed78a
                            );
                            road.draw();
                        }
                    }
                }
            }
        }
    }
}
