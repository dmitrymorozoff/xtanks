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
    }
    draw() {
        const map = new Map(this.scene);
        map.load();

        const player = new Player(
            this.scene,
            this.cubeSize,
            3 * this.cubeSize,
            1 * this.cubeSize,
            6 * this.cubeSize,
            0x53baed,
            180
        );
        player.draw();

        window.addEventListener("keydown", function(event) {
            var keyCode = event.which;
            if (keyCode == 65) {
                player.moveLeft();
            }
            if (keyCode == 68) {
                player.moveRight();
            }
            if (keyCode == 87) {
                player.moveBottom();
            }
            if (keyCode == 83) {
                player.moveTop();
            }
        });
    }
    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
