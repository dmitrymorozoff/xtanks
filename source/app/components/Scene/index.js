import { TweenMax } from "gsap";
import Tank from "../Tank/index.js";
import Tree from "../Tree/index.js";
import Lamp from "../Lamp/index.js";
import Home from "../Home/index.js";
import Map from "../Map/index.js";
import Player from "../Player/index.js";
import Supertank from "../Supertank/index.js";
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
        this.flagLeft = false;
        this.flagRight = false;
        this.flagTop = false;
        this.flagBottom = false;
        this.camPos = new THREE.Vector3(0, 0, 0);
        this.targetPos = new THREE.Vector3(0, 200, 300); // Target position
        this.origin = new THREE.Vector3(0, 0, 0); // Optional origin
    }
    draw() {
        const map = new Map(this.scene);
        map.load();

        this.player = new Player(
            this.scene,
            this.camera,
            this.cubeSize,
            3 * this.cubeSize,
            1 * this.cubeSize,
            6 * this.cubeSize,
            0x53baed,
            180
        );
        this.player.draw();
        console.log(this.player.player.tank.position);
        /*const tank = new Supertank(
            this.scene,
        );
        tank.draw();*/

        window.addEventListener("keydown", event => {
            switch (event.keyCode) {
                case 65:
                    this.flagLeft = true;
                    break;
                case 68:
                    this.flagRight = true;
                    break;
                case 87:
                    this.flagTop = true;
                    break;
                case 83:
                    this.flagBottom = true;
                    break;
                default:
                    break;
            }
        });
        window.addEventListener("keyup", event => {
            switch (event.keyCode) {
                case 65:
                    this.flagLeft = false;
                    break;
                case 68:
                    this.flagRight = false;
                    break;
                case 87:
                    this.flagTop = false;
                    break;
                case 83:
                    this.flagBottom = false;
                    break;
                default:
                    break;
            }
        });
        document.onmousemove = event => {
            let cursorX = event.pageX;
            let cursorY = event.pageY;
            // this.player.rotateGun(cursorX, cursorY);
        };
    }

    animate() {
        if (this.flagLeft) {
            this.player.moveLeft();
        }
        if (this.flagRight) {
            this.player.moveRight();
        }
        if (this.flagTop) {
            this.player.moveTop();
        }
        if (this.flagBottom) {
            this.player.moveBottom();
        }
        /*this.camera.position.set(this.player.player.tank.position.x,this.player.player.tank.position.y+200,this.player.player.tank.position.z+200);*/
        // Interpolate camPos toward targetPos

        // Apply new camPos to your camera
        /*this.camPos.lerp(this.targetPos, 0.05);
        this.camera.position.copy(this.camPos);
     
        this.camera.lookAt(this.targetPos);*/
        this.camera.position
            .copy(this.player.player.tank.position)
            .add(new THREE.Vector3(0, 500, 600));
        this.camera.lookAt(this.player.player.tank.position);

        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
