import Player from "../Player/index.js";
import { TweenMax } from "gsap";
import Tank from "../Tank/index.js";
import Tree from "../Tree/index.js";
import Lamp from "../Lamp/index.js";
import Home from "../Home/index.js";
import Map from "../Map/index.js";
import * as THREE from "three";

export default class Scene {
    constructor(scene, light, camera, renderer) {
        this.scene = scene;
        this.light = light;
        this.camera = camera;
        this.renderer = renderer;
        this.animationId = 0;
    }
    draw() {
        const map = new Map(this.scene);
        map.load();
        window.addEventListener("keydown", function(event) {
            var keyCode = event.which;
            if (keyCode == 65) {
            }
            if (keyCode == 68) {
            }
            if (keyCode == 32) {
            }
        });
    }
    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
