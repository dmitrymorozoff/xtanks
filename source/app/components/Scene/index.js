import Player from "../Player/index.js";
import { TweenMax } from "gsap";
import Tank from "../Tank/index.js";
import Tree from "../Tree/index.js";
import Lamp from "../Lamp/index.js";
import Home from "../Home/index.js";
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

        const tankRed = new Tank(
            this.scene,
            "./models/tank.obj",
            -450,
            0,
            500,
            0xf95802
        );
        tankRed.load();

        const tankBlue = new Tank(
            this.scene,
            "./models/tank.obj",
            350,
            0,
            0,
            0x3b74fa
        );
        tankBlue.load();

        const tree = new Tree(
            this.scene,
            "./models/lowpolytree.obj",
            250,
            150,
            -400,
            0x24c076
        );
        tree.load();

        const tree2 = new Tree(
            this.scene,
            "./models/lowpolytree.obj",
            450,
            150,
            490,
            0x24c076
        );
        tree2.load();

        const lamp = new Lamp(
            this.scene,
            "./models/StreetLamp.obj",
            -150,
            0,
            500,
            0xffffff
        );
        lamp.load();

        const home = new Home(
            this.scene,
            "./models/casa.obj",
            -350,
            0,
            -350,
            0xffffff
        );
        home.load();

        var geometry = new THREE.BoxGeometry(1500, 150, 1500);
        const material = new THREE.MeshPhongMaterial({
            color: 0xb7c25a
        });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.z = 0;
        cube.position.y = -80;
        this.scene.add(cube);

        var road = new THREE.BoxGeometry(280, 5, 1500);
        const materialrpad = new THREE.MeshPhongMaterial({
            color: 0x524b5d
        });
        var r = new THREE.Mesh(road, materialrpad);
        r.position.z = 0;
        r.position.y = 0;
        this.scene.add(r);

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
