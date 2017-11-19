import { TweenMax } from "gsap";
import Stats from "stats.js";
import Tank from "../Tank/index.js";
import Map from "../Map/index.js";
import Player from "../Player/index.js";
import Supertank from "../Supertank/index.js";
import * as THREE from "three";
import { BACKGROUND } from "../../constants/index.js";

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
        this.targetPos = new THREE.Vector3(0, 200, 300);
        this.origin = new THREE.Vector3(0, 0, 0);
        this.stats = new Stats();
    }
    genesisDevice() {
        this.geometry = new THREE.PlaneGeometry(
            window.innerWidth * 10,
            window.innerHeight * 12,
            98,
            98
        );
        this.material = new THREE.MeshLambertMaterial({
            color: BACKGROUND
        });
        this.wireMaterial = new THREE.MeshLambertMaterial({
            color: 0x000000,
            wireframe: true,
            transparent: true
        });
        const inception = () => {
            for (let i = 0; i < this.geometry.vertices.length; i++) {
                if (i % 2 === 0 || i % 5 === 0 || i % 7 === 0) {
                    let num = Math.floor(Math.random() * (260 - 20 + 1)) + 180;
                    this.geometry.vertices[i].z = Math.random() * num;
                }
            }
            this.terrain = new THREE.Mesh(this.geometry, this.material);
            this.wire = new THREE.Mesh(this.geometry, this.wireMaterial);

            this.terrain.rotation.x = -Math.PI / 2;
            this.terrain.position.y = -336;
            this.wire.rotation.x = -Math.PI / 2;
            this.wire.position.y = -335.8;

            this.scene.add(this.terrain, this.wire);
            return this;
        };

        inception();
    }
    generateBackground() {
        const materialIcosahedron = new THREE.MeshLambertMaterial({
            color: BACKGROUND,
            side: THREE.BackSide
        });
        const icosahedron = new THREE.Mesh(
            new THREE.IcosahedronGeometry(3200, 1),
            materialIcosahedron
        );
        this.scene.add(icosahedron);
    }
    draw() {
        this.stats.domElement.style.position = "absolute";
        this.stats.domElement.style.top = "0px";
        this.stats.domElement.style.right = "0px";
        document.body.appendChild(this.stats.domElement);

        const map = new Map(this.scene);
        map.load();

        //this.generateBackground();
        this.genesisDevice();
        this.player = new Player(
            this.scene,
            this.camera,
            this.cubeSize,
            3 * this.cubeSize,
            9 * this.cubeSize,
            6 * this.cubeSize,
            0x575757,
            180,
            map.collidableMeshList
        );
        this.player.draw();

        // const tank = new Supertank(this.scene);
        // tank.draw();

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
        if (!this.player.detectCollision()) {
            if (this.flagTop) {
                this.player.moveTop();
            }
        }
        if (this.flagLeft) {
            this.player.moveLeft();
        }
        if (this.flagRight) {
            this.player.moveRight();
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
        this.stats.update();
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
