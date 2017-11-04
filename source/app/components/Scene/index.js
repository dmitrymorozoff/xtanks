import Player from "../Player/index.js";
import { TweenMax } from "gsap";
import Tank from "../Tank/index.js";
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
        const self = this;
        const tank = new Tank(this.scene, "./models/Panther_obj.obj");
        tank.load();

        var geometry = new THREE.BoxGeometry(800, 5, 800);
        const material = new THREE.MeshPhongMaterial({
            color: 0xcccccc
        });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.z = -150;
        this.scene.add(cube);

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
