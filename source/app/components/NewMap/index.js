import * as THREE from "three";
import { LEVEL_1 } from "./Level/index.js";
import Light from "../Light/index.js";
import getRandomInt, { makeCube } from "../../../utils/index.js";
import { floorMaterial } from "./GeometryAndMaterials/floor.js";
import { FLOOR, WALL, LIGHT, CUBE_SIZE } from "../../constants/index.js";

export default class NewMap {
    constructor(scene, x = 0, y = 0, z = 0) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.z = z;
        this.cubeSize = CUBE_SIZE;
        this.cubesfloor = [];
        this.cubesBarrier = [];
        this.elevators = [];
        this.colors = {
            floorColors: [0x111111, 0x111111, 0x222222],
            wallColors: [0x111111],
            lampColors: [0xffffff],
            // pyramidColors: [PURPLE, PINK, RED],
            // rotationCube: [RED, PINK, PURPLE],
            floorBottomColors: [0x222222, 0x111111, 0x222222]
        };
        this.collidableMeshList = [];
    }
    generateMergedObject(geometry, k, i, j, centerI, centerJ, color) {
        let cubeGeometry = makeCube(this.cubeSize, color);
        let x = k * this.cubeSize - centerJ;
        let y = i * this.cubeSize;
        let z = j * this.cubeSize - centerI;
        cubeGeometry.position.set(x, y, z);
        cubeGeometry.updateMatrix();
        geometry.merge(cubeGeometry.geometry, cubeGeometry.matrix);
    }
    load() {
        const centerMapI = LEVEL_1[0].length / 2 * this.cubeSize;
        const centerMapJ = LEVEL_1[0][0].length / 2 * this.cubeSize;
        let mergedFloorGeometry = new THREE.Geometry();
        for (let i = 0; i < LEVEL_1.length; i++) {
            for (let j = 0; j < LEVEL_1[i].length; j++) {
                for (let k = 0; k < LEVEL_1[i][j].length; k++) {
                    switch (LEVEL_1[i][j][k]) {
                        case FLOOR:
                            this.generateMergedObject(
                                mergedFloorGeometry,
                                k,
                                i,
                                j,
                                centerMapI,
                                centerMapJ,
                                this.colors.floorColors[
                                    getRandomInt(
                                        0,
                                        this.colors.floorColors.length
                                    )
                                ]
                            );
                            break;
                        case WALL:
                            this.generateMergedObject(
                                mergedFloorGeometry,
                                k,
                                i,
                                j,
                                centerMapI,
                                centerMapJ,
                                this.colors.wallColors[
                                    getRandomInt(
                                        0,
                                        this.colors.wallColors.length
                                    )
                                ]
                            );
                            // let type = 0;
                            // if (heightWall > 1) {
                            //     type = 1;
                            // } else {
                            //     type = getRandomInt(2, 3);
                            // }
                            // let y = i * this.cubeSize;
                            // let barrier = new Wall(
                            //     this.scene,
                            //     this.cubeSize,
                            //     heightWall,
                            //     k * this.cubeSize - centerMapJ,
                            //     i * this.cubeSize,
                            //     j * this.cubeSize - centerMapI,
                            //     this.colors.wallColors[
                            //         getRandomInt(
                            //             0,
                            //             this.colors.wallColors.length
                            //         )
                            //     ],
                            //     type,
                            //     wallMaterials,
                            //     wallGeometries
                            // );
                            // this.collidableMeshList.push(barrier.wall);
                            // barrier.draw();
                            break;
                        case LIGHT:
                            let light = new Light(
                                this.scene,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
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
                        default:
                            break;
                    }
                }
            }
        }
        console.log(mergedFloorGeometry);
        const floor = new THREE.Mesh(mergedFloorGeometry, floorMaterial);
        this.scene.add(floor);
    }
}
