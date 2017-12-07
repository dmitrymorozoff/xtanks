import * as THREE from "three";
import { LEVEL_1 } from "./Level/index";
import Light from "../Light/index";
import Lamp from "../Lamp/index";
import RotationCube from "../RotationCube/index";
import EdgesCube from "../EdgesCube/index";
import Coin from "../Bonuses/Coin/index";
import Sphere from "../Sphere/index";
import MovingCube from "../MovingCube/index";
import getRandomInt, { makeCube } from "../../../../utils/index";
import { floorMaterial } from "./GeometryAndMaterials/floor";
import {
    FLOOR,
    WALL,
    RED_LIGHT,
    BLUE_LIGHT,
    RED_LAMP,
    BLUE_LAMP,
    COIN,
    CUBE_SIZE,
    ROTATION_CUBE,
    EDGES_RED_CUBE,
    EDGES_BLUE_CUBE,
    SPHERE,
    MOVING_CUBE,
    RED,
    BLUE,
    DARK_GRAY,
    DARKNESS_GRAY,
    LIGHT_GRAY,
} from "../../constants/index";

export default class Map {
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
            floorColors: [LIGHT_GRAY, DARK_GRAY, DARK_GRAY, DARKNESS_GRAY],
            wallColors: [
                DARK_GRAY,
                DARKNESS_GRAY,
                LIGHT_GRAY,
                DARK_GRAY,
                DARK_GRAY,
                DARKNESS_GRAY,
                DARKNESS_GRAY,
                DARKNESS_GRAY,
            ],
            lampColors: [RED, BLUE],
            floorBottomColors: [DARK_GRAY, LIGHT_GRAY, DARK_GRAY],
            coinColors: [0xf22368],
        };
        this.collidableMeshList = [];
    }
    generateMergedObject(geometry, k, i, j, centerI, centerJ, color) {
        let cubeGeometry = makeCube(this.cubeSize, color);
        let x = k * this.cubeSize - centerJ;
        let y = i * this.cubeSize;
        let z = j * this.cubeSize - centerI;
        cubeGeometry.translate(x, y, z);
        geometry.merge(cubeGeometry, cubeGeometry.matrix);
        cubeGeometry.translate(-x, -y, -z);
    }
    getCenterMap() {
        return {
            x: LEVEL_1[0].length / 2 * this.cubeSize,
            y: LEVEL_1[0][0].length / 2 * this.cubeSize,
        };
    }
    load() {
        let lightColor = null;
        let lampColor = null;
        let edgesColor = null;
        const centerMapI = this.getCenterMap().x;
        const centerMapJ = this.getCenterMap().y;
        let mergedFloorGeometry = new THREE.Geometry();
        let mergedWallGeometry = new THREE.Geometry();
        for (let i = 0; i < LEVEL_1.length; i++) {
            for (let j = 0; j < LEVEL_1[i].length; j++) {
                for (let k = 0; k < LEVEL_1[i][j].length; k++) {
                    lightColor = null;
                    lampColor = null;
                    edgesColor = null;
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
                                        this.colors.floorColors.length,
                                    )
                                ],
                            );
                            break;
                        case WALL:
                            this.generateMergedObject(
                                mergedWallGeometry,
                                k,
                                i,
                                j,
                                centerMapI,
                                centerMapJ,
                                this.colors.wallColors[
                                    getRandomInt(
                                        0,
                                        this.colors.wallColors.length,
                                    )
                                ],
                            );
                            break;
                        case RED_LIGHT:
                            lightColor = RED;
                        case BLUE_LIGHT:
                            lightColor = lightColor === null ? BLUE : RED;
                            let light = new Light(
                                this.scene,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
                                j * this.cubeSize - centerMapI,
                                this.cubeSize,
                                lightColor,
                            );
                            light.load();
                            break;
                        case RED_LAMP:
                            lampColor = RED;
                        case BLUE_LAMP:
                            lampColor = lampColor === null ? BLUE : RED;
                            let lamp = new Lamp(
                                this.scene,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
                                j * this.cubeSize - centerMapI,
                                this.cubeSize,
                                lampColor,
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
                                [BLUE, BLUE, BLUE],
                            );
                            rotationCube.load();
                            rotationCube.move();
                            break;
                        case EDGES_RED_CUBE:
                            edgesColor = RED;
                        case EDGES_BLUE_CUBE:
                            edgesColor = edgesColor === null ? BLUE : RED;
                            let edgesCube = new EdgesCube(
                                this.scene,
                                this.cubeSize,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
                                j * this.cubeSize - centerMapI,
                                edgesColor,
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
                                this.colors.lampColors[1],
                            );
                            // sphere.load();
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
                                        this.colors.lampColors.length,
                                    )
                                ],
                            );
                            movingCube.load();
                            movingCube.move();
                            break;
                        case COIN:
                            let coin = new Coin(
                                this.scene,
                                this.cubeSize / 3,
                                k * this.cubeSize - centerMapJ,
                                i * this.cubeSize,
                                j * this.cubeSize - centerMapI,
                                this.colors.coinColors[
                                    getRandomInt(
                                        0,
                                        this.colors.coinColors.length,
                                    )
                                ],
                            );
                            coin.load();
                            coin.move();
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        mergedFloorGeometry.faces.sort(function(a, b) {
            return a.materialIndex - b.materialIndex;
        });
        mergedWallGeometry.faces.sort(function(a, b) {
            return a.materialIndex - b.materialIndex;
        });
        const floor = new THREE.Mesh(mergedFloorGeometry, floorMaterial);
        const wall = new THREE.Mesh(mergedWallGeometry, floorMaterial);
        this.collidableMeshList.push(wall);
        this.scene.add(floor);
        this.scene.add(wall);
    }
}
