import * as THREE from "three";
import { level1 } from "./Level/index.js";
import Cube from "./components/Cube/index.js";
import Light from "../Light/index.js";
import Wall from "../Wall/index.js";
import Cactus from "../Cactus/index.js";
import FriTree from "../FriTree/index.js";
import Rock from "../Rock/index.js";
import BigTree from "../BigTree/index.js";
import Tank from "../Tank/index.js";
import Home from "../Home/index.js";
import getRandomInt from "../../../utils/index.js";
import Clouds from "../Clouds/index.js";
import PlaneCube from "../PlaneCube/index.js";

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
            landColors: [0x1d0346, 0x0c082c, 0x1f095c],
            wallColors: [0x1a0fce, 0xe829ab],
            lampColors: [0x1a0fce, 0xe829ab, 0xfd0000],
            landBottomColors: [0x111111, 0x0c082c, 0x1f095c]
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
        const landMaterials = [
            new THREE.MeshLambertMaterial({
                color: this.colors.landColors[0]
            }),
            new THREE.MeshLambertMaterial({
                color: this.colors.landColors[1]
            }),
            new THREE.MeshLambertMaterial({
                color: this.colors.landColors[2]
            })
        ];
        const landGeometry = new THREE.BoxGeometry(
            this.cubeSize,
            this.cubeSize,
            this.cubeSize
        );

        const wallGeometries = {
            dark: new THREE.BoxGeometry(
                this.cubeSize,
                this.cubeSize / 4,
                this.cubeSize
            ),
            full: new THREE.BoxGeometry(
                this.cubeSize,
                this.cubeSize,
                this.cubeSize
            ),
            light: new THREE.BoxGeometry(
                this.cubeSize - 25,
                this.cubeSize / 4,
                this.cubeSize - 25
            )
        };

        const wallMaterials = {
            dark: new THREE.MeshPhongMaterial({
                color: 0x0c082c
            }),
            light: [
                new THREE.MeshBasicMaterial({
                    color: this.colors.wallColors[0]
                }),
                new THREE.MeshBasicMaterial({
                    color: this.colors.wallColors[1]
                })
            ]
        };

        for (let i = 0; i < level1.length; i++) {
            for (let j = 0; j < level1[i].length; j++) {
                for (let k = 0; k < level1[i][j].length; k++) {
                    if (i === 0) {
                        const land = new THREE.Mesh(
                            landGeometry,
                            landMaterials[getRandomInt(0, landMaterials.length)]
                        );
                        land.position.x = k * this.cubeSize - centerMapJ;
                        land.position.y = i * this.cubeSize;
                        land.position.z = j * this.cubeSize - centerMapI;
                        this.scene.add(land);
                    }
                    switch (level1[i][j][k]) {
                        case 1:
                            color = 0x333333;
                            let height = getRandomInt(1, 3);
                            let type = 0;
                            if (height > 1) {
                                type = 2;
                            } else {
                                type = 1;
                            }
                            const barrier = new Wall(
                                this.scene,
                                this.cubeSize,
                                height,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
                                j * this.cubeSize - centerMapI,
                                this.colors.wallColors[
                                    getRandomInt(
                                        0,
                                        this.colors.wallColors.length
                                    )
                                ],
                                type,
                                wallMaterials,
                                wallGeometries
                            );
                            barrier.draw();
                            break;
                        case 2:
                            const light = new Light(
                                this.scene,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize - this.cubeSize / 4,
                                j * this.cubeSize - centerMapI,
                                this.cubeSize,
                                this.colors.lampColors[
                                    getRandomInt(
                                        0,
                                        this.colors.lampColors.length
                                    )
                                ]
                            );
                            light.load();
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
                            /*const road = new Cube(
                                this.scene,
                                this.cubeSize,
                                this.cubeSize / 5,
                                this.cubeSize,
                                k * this.cubeSize - centerMapJ,
                                (i - 2) * this.cubeSize + 55,
                                j * this.cubeSize - centerMapI,
                                0x000000,
                                "lambert"
                            );
                            road.draw();*/
                            break;
                        case 5:
                            const friTree = new FriTree(
                                this.scene,
                                this.cubeSize,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
                                j * this.cubeSize - centerMapI,
                                0x333333
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
                                0x555555
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
                                0xffffff
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
                                0x575757,
                                -180
                            );
                            tankBlue.load();
                            break;
                        case 7:
                            const bigTree = new BigTree(
                                this.scene,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize - this.cubeSize / 4,
                                j * this.cubeSize - centerMapI,
                                this.cubeSize * 1.5,
                                0x333333
                            );
                            bigTree.load();
                            break;
                        case 8:
                            const cactus = new Cactus(
                                this.scene,
                                this.cubeSize,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
                                j * this.cubeSize - centerMapI,
                                0x555555
                            );
                            cactus.draw();
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
}
