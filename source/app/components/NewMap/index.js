import * as THREE from "three";
import { LEVEL_1 } from "./Level/index.js";
import Light from "../Light/index.js";
import Lamp from "../Lamp/index.js";
import RotationCube from "../RotationCube/index.js";
import EdgesCube from "../EdgesCube/index.js";
import Sphere from "../Sphere/index.js";
import MovingCube from "../MovingCube/index.js";
import getRandomInt, { makeCube } from "../../../utils/index.js";
import { floorMaterial } from "./GeometryAndMaterials/floor.js";
import {
    FLOOR,
    WALL,
    LIGHT,
    LAMP,
    CUBE_SIZE,
    ROTATION_CUBE,
    EDGES_CUBE,
    SPHERE,
    MOVING_CUBE
} from "../../constants/index.js";

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
            floorColors: [0x060606, 0x121214, 0x080808],
            wallColors: [0x060606,0xED66EE, 0x161616, 0x161616, 0x590000],
            lampColors: [0xff0000],
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
                        case LAMP:
                            let lamp = new Lamp(
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
                            lamp.load();
                            break;
                        case ROTATION_CUBE:
                            let rotationCube = new RotationCube(
                                this.scene,
                                this.cubeSize,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
                                j * this.cubeSize - centerMapI,
                                [0x670000, 0x810000, 0x350000]
                            );
                            rotationCube.load();
                            rotationCube.move();
                            break;
                        case EDGES_CUBE:
                            let edgesCube = new EdgesCube(
                                this.scene,
                                this.cubeSize,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
                                j * this.cubeSize - centerMapI,
                                [0x670000, 0x810000, 0x350000]
                            );
                            edgesCube.load();
                            break;
                        case SPHERE:
                        let sphere = new Sphere(
                            this.scene,
                            this.cubeSize,
                            k * this.cubeSize - centerMapJ,
                            i * this.cubeSize,
                            j * this.cubeSize - centerMapI,
                            this.colors.lampColors[
                                getRandomInt(
                                    0,
                                    this.colors.lampColors.length
                                )
                            ]
                        );
                        sphere.load();
                        break;
                        case MOVING_CUBE:
                        let movingCube = new MovingCube(
                            this.scene,
                            this.cubeSize,
                            k * this.cubeSize - centerMapJ,
                            i * this.cubeSize,
                            j * this.cubeSize - centerMapI,
                            this.colors.lampColors[
                                getRandomInt(
                                    0,
                                    this.colors.lampColors.length
                                )
                            ]
                        );
                        movingCube.load();
                        movingCube.move();
                        break;
                    default:
                            break;
                    }
                }
            }
        }
        const floor = new THREE.Mesh(mergedFloorGeometry, floorMaterial);
        this.scene.add(floor);
    }
}
