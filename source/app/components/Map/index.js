import * as THREE from "three";
import { level1 } from "./Level/index.js";
import Cube from "./components/Cube/index.js";
import Tree from "../Tree/index.js";
import FriTree from "../FriTree/index.js";
import Rock from "../Rock/index.js";
import Tank from "../Tank/index.js";
import Home from "../Home/index.js";
import getRandomInt from "../../../utils/index.js";
import Clouds from "../Clouds/index.js";

export default class Map {
    constructor(scene, x = 0, y = 0, z = 0, scale = 0) {
        this.scene = scene;
        this.scale = scale;
        this.x = x;
        this.y = y;
        this.z = z;
        this.cubeSize = 100;
        this.cubesLand = [];
        this.cubesBarrier = [];
        this.colors = {
            landColors: [0x98cf4f, 0x91c25a, 0x6da248],
            landBottomColors: [0x674c41, 0x9d7b60, 0xad693d]
        };
    }

    load() {
        let color = null;
        const landIndex = 0;
        const centerMapI = level1[0].length / 2 * this.cubeSize;
        const centerMapJ = level1[0][0].length / 2 * this.cubeSize;
        for (let i = 0; i < 5; i++) {
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
            clouds.move();
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
                        const landBottom = new Cube(
                            this.scene,
                            this.cubeSize,
                            this.cubeSize,
                            this.cubeSize,
                            k * this.cubeSize - centerMapJ,
                            i * this.cubeSize - this.cubeSize,
                            j * this.cubeSize - centerMapI,
                            this.colors.landBottomColors[
                                getRandomInt(
                                    0,
                                    this.colors.landBottomColors.length
                                )
                            ]
                        );
                        landBottom.draw();
                        land.draw();
                    }
                    switch (level1[i][j][k]) {
                        case 1:
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
                            break;
                        case 2:
                            const tree = new Tree(
                                this.scene,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize - this.cubeSize / 4,
                                j * this.cubeSize - centerMapI,
                                this.cubeSize,
                                0x4c9e0c
                            );
                            tree.load();
                            break;
                        case 3:
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
                            break;
                        case 4:
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
                            break;
                        case 5:
                            const friTree = new FriTree(
                                this.scene,
                                this.cubeSize,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
                                j * this.cubeSize - centerMapI,
                                0x4c9e0c
                            );
                            friTree.load();
                            break;
                        case 6:
                            const home = new Home(
                                this.scene,
                                this.cubeSize,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
                                j * this.cubeSize - centerMapI,
                                0x6f5e5e
                            );
                            home.load();
                            break;
                        case 9:
                            const tankRed = new Tank(
                                this.scene,
                                this.cubeSize,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
                                j * this.cubeSize - centerMapI,
                                0xf83f46
                            );
                            tankRed.load();
                            break;
                        case 10:
                            const tankBlue = new Tank(
                                this.scene,
                                this.cubeSize,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
                                j * this.cubeSize - centerMapI,
                                0x53baed,
                                -180
                            );
                            tankBlue.load();
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
}
