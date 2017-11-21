import * as THREE from "three";
import { LEVEL_1 } from "./Level/index.js";
import Light from "../Light/index.js";
import Wall from "../Wall/index.js";
import Elevator from "../Elevator/index.js";
import Pyramid from "../Pyramid/index.js";
import Lamp from "../Lamp/index.js";
import Tank from "../Tank/index.js";
import Coin from "../Bonuses/Coin/index.js";
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
    ROTATION_CUBE,
    EMPTY,
    ELEVATOR,
    CYAN,
    COIN,
    SECOND_FLOOR_HEIGHT
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
        this.elevators = [];
        // 75218F
        this.colors = {
            landColors: [0x2e1268, 0x0c082c, 0x1f095c],
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
        let y = null;
        const SECOND_FLOOR = 3;
        const FLOOR_HEIGHT = 8;
        if (i === SECOND_FLOOR) {
            y = FLOOR_HEIGHT * this.cubeSize;
        } else {
            y = i * this.cubeSize;
        }
        let z = j * this.cubeSize - centerI;
        landGeometry.position.set(x, y, z);
        landGeometry.updateMatrix();
        geometry.merge(landGeometry.geometry, landGeometry.matrix);
    }
    load() {
        const centerMapI = LEVEL_1[0].length / 2 * this.cubeSize;
        const centerMapJ = LEVEL_1[0][0].length / 2 * this.cubeSize;
        const SECOND_FLOOR_WALL = 4;
        let mergedLandGeometry = new THREE.Geometry();
        for (let i = 0; i < LEVEL_1.length; i++) {
            for (let j = 0; j < LEVEL_1[i].length; j++) {
                for (let k = 0; k < LEVEL_1[i][j].length; k++) {
                    if (
                        (i === 0 && LEVEL_1[i][j][k] !== EMPTY) ||
                        (i === 3 && LEVEL_1[i][j][k] !== EMPTY)
                    ) {
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
                                let y = i * this.cubeSize;
                                if (i === SECOND_FLOOR_WALL) {
                                    y = SECOND_FLOOR_HEIGHT * this.cubeSize;
                                }
                                let barrier = new Wall(
                                    this.scene,
                                    this.cubeSize,
                                    heightWall,
                                    k * this.cubeSize - centerMapJ,
                                    y,
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
                                let y2 = i * this.cubeSize - this.cubeSize / 4;
                                if (i === SECOND_FLOOR_WALL) {
                                    y2 =
                                        SECOND_FLOOR_HEIGHT * this.cubeSize -
                                        this.cubeSize / 4;
                                }
                                let light = new Light(
                                    this.scene,
                                    k * this.cubeSize - centerMapJ,
                                    y2,
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
                                rotationCube.load();
                                rotationCube.move();
                                break;
                            case LAMP:
                                let height = 500;
                                if (i === 5) {
                                    height = 1300;
                                }
                                let lamp = new Lamp(
                                    this.scene,
                                    k * this.cubeSize - centerMapJ,
                                    height,
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
                            case ELEVATOR:
                                let elevator = new Elevator(
                                    this.scene,
                                    this.cubeSize,
                                    k * this.cubeSize - centerMapJ,
                                    (i - 1) * this.cubeSize - this.cubeSize / 4,
                                    j * this.cubeSize - centerMapI,
                                    PURPLE
                                );
                                this.elevators.push(elevator);
                                elevator.draw();
                                elevator.move();
                                break;
                            case COIN:
                                let yD = i * this.cubeSize;
                                if (i === SECOND_FLOOR_WALL) {
                                    yD = SECOND_FLOOR_HEIGHT * this.cubeSize;
                                }
                                let coin = new Coin(
                                    this.scene,
                                    this.cubeSize / 3.5,
                                    k * this.cubeSize - centerMapJ,
                                    yD,
                                    j * this.cubeSize - centerMapI,
                                    PINK
                                );
                                coin.draw();
                                coin.move();
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
