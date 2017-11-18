import * as THREE from "three";
import { LEVEL_1 } from "./Level/index.js";
import Light from "../Light/index.js";
import Wall from "../Wall/index.js";
import Cactus from "../Cactus/index.js";
import Pyramid from "../Pyramid/index.js";
import Lamp from "../Lamp/index.js";
import BigTree from "../BigTree/index.js";
import Tank from "../Tank/index.js";
import RotationCube from "../RotationCube/index.js";
import getRandomInt from "../../../utils/index.js";
import { makeCube } from "../../../utils/index.js";
import { landMaterial, landGeometry } from "./GeometryAndMaterials/land.js";
import { wallMaterials, wallGeometries } from "./GeometryAndMaterials/wall.js";
import {
    PURPLE,
    RED,
    PINK,
    CUBE_SIZE,
    WALL,
    LIGHT,
    MOVING_CUBE,
    PYRAMID,
    LAMP,
    RED_TANK,
    BLUE_TANK,
    ROTATION_CUBE
} from "../../constants/index.js";
import Clouds from "../Clouds/index.js";
import PlaneCube from "../PlaneCube/index.js";
import MovingCube from "../MovingCube/index.js";

export default class Map {
    constructor(scene, x = 0, y = 0, z = 0) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.z = z;
        this.cubeSize = CUBE_SIZE;
        this.cubesLand = [];
        this.cubesBarrier = [];
        this.colors = {
            landColors: [0x1d0346, 0x0c082c, 0x1f095c],
            wallColors: [PURPLE, PINK, RED, RED],
            lampColors: [PURPLE, PINK, RED],
            pyramidColors: [PURPLE, PINK, RED],
            rotationCube: [RED, PINK, PURPLE],
            landBottomColors: [0x111111, 0x0c082c, 0x1f095c]
        };
        this.collidableMeshList = [];
    }
    generateFloor(geometry, k, i, j, centerI, centerJ) {
        let landGeometry = makeCube(
            this.cubeSize,
            this.colors.landColors[
                getRandomInt(0, this.colors.landColors.length)
            ]
        );
        let x = k * this.cubeSize - centerJ;
        let y = i * this.cubeSize;
        let z = j * this.cubeSize - centerI;
        landGeometry.position.set(x, y, z);
        landGeometry.updateMatrix();
        geometry.merge(landGeometry.geometry, landGeometry.matrix);
    }
    load() {
        const centerMapI = LEVEL_1[0].length / 2 * this.cubeSize;
        const centerMapJ = LEVEL_1[0][0].length / 2 * this.cubeSize;

        let mergedLandGeometry = new THREE.Geometry();
        for (let i = 0; i < LEVEL_1.length; i++) {
            for (let j = 0; j < LEVEL_1[i].length; j++) {
                for (let k = 0; k < LEVEL_1[i][j].length; k++) {
                    if (i === 0 && LEVEL_1[i][j][k] !== -1) {
                        this.generateFloor(
                            mergedLandGeometry,
                            k,
                            i,
                            j,
                            centerMapI,
                            centerMapJ
                        );
                    } else {
                        switch (LEVEL_1[i][j][k]) {
                            case WALL:
                                let heightWall = getRandomInt(1, 3);
                                let type = 0;
                                if (heightWall > 1) {
                                    type = 1;
                                } else {
                                    type = getRandomInt(2, 3);
                                }
                                let barrier = new Wall(
                                    this.scene,
                                    this.cubeSize,
                                    heightWall,
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
                                this.collidableMeshList.push(barrier.wall);
                                barrier.draw();
                                break;
                            case LIGHT:
                                let light = new Light(
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
                            case MOVING_CUBE:
                                let movingCube = new MovingCube(
                                    this.scene,
                                    this.cubeSize,
                                    k * this.cubeSize - centerMapJ,
                                    i * this.cubeSize + 10,
                                    j * this.cubeSize - centerMapI,
                                    this.colors.landColors[
                                        getRandomInt(
                                            0,
                                            this.colors.landColors.length
                                        )
                                    ]
                                );
                                movingCube.load();
                                movingCube.move();
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
                            case PYRAMID:
                                let pyramid = new Pyramid(
                                    this.scene,
                                    this.cubeSize,
                                    k * this.cubeSize - centerMapJ,
                                    i * this.cubeSize,
                                    j * this.cubeSize - centerMapI,
                                    this.colors.pyramidColors
                                );
                                pyramid.load();
                                pyramid.move();
                                break;
                            case ROTATION_CUBE:
                                const rotationCube = new RotationCube(
                                    this.scene,
                                    this.cubeSize,
                                    k * this.cubeSize - centerMapJ,
                                    i * this.cubeSize,
                                    j * this.cubeSize - centerMapI,
                                    this.colors.rotationCube
                                );
                                // console.log(rotationCube.get());
                                rotationCube.load();
                                rotationCube.move();
                                break;
                            case LAMP:
                                let lamp = new Lamp(
                                    this.scene,
                                    k * this.cubeSize - centerMapJ,
                                    500,
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
                            case RED_TANK:
                                let tankRed = new Tank(
                                    this.scene,
                                    this.cubeSize,
                                    k * this.cubeSize - centerMapJ,
                                    i * this.cubeSize,
                                    j * this.cubeSize - centerMapI,
                                    0x575757
                                );
                                tankRed.load();
                                break;
                            case BLUE_TANK:
                                let tankBlue = new Tank(
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
                                let bigTree = new BigTree(
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
                                let cactus = new Cactus(
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
        const land = new THREE.Mesh(mergedLandGeometry, landMaterial);
        this.scene.add(land);
    }
}
