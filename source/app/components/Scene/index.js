import { TweenMax } from "gsap";
import Tank from "../Tank/index.js";
import Tree from "../Tree/index.js";
import Lamp from "../Lamp/index.js";
import Home from "../Home/index.js";
import Map from "../Map/index.js";
import Player from "../Player/index.js";
import * as THREE from "three";

export default class Scene {
    constructor(scene, light, camera, renderer) {
        this.scene = scene;
        this.light = light;
        this.camera = camera;
        this.renderer = renderer;
        this.animationId = 0;
        this.cubeSize = 100;
        this.player = null;
    }
    draw() {
        const map = new Map(this.scene);
        map.load();

        this.player = new Player(
            this.scene,
            this.cubeSize,
            3 * this.cubeSize,
            1 * this.cubeSize,
            6 * this.cubeSize,
            0x53baed,
            180
        );
        this.player.draw();

        window.addEventListener("keypress", event => {
            switch (event.key) {
                case "a":
                    this.player.moveLeft();
                    break;
                case "d":
                    this.player.moveRight();
                    break;
                case "w":
                    this.player.moveTop();
                    break;
                case "s":
                    this.player.moveBottom();
                    break;
                default:
                    break;
            }
        });
    }
    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
