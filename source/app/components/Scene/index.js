import Stats from "stats.js";
import NewMap from "../NewMap/index.js";
import Particles from "../Particles/index.js";
import Player from "../Player/index.js";
import * as THREE from "three";
import { BACKGROUND } from "../../constants/index.js";

export default class Scene {
    constructor(scene, light, camera, composer, shaderPass) {
        this.scene = scene;
        this.light = light;
        this.camera = camera;
        this.composer = composer;
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
        this.newMap = null;
        this.flagElevatorBottom = false;
        this.flagElevatorTop = false;
        this.onElevator = false;
        this.sphereBackground = null;
        this.mouse = new THREE.Vector2();
        this.intersectPoint = new THREE.Vector3();
        this.raycaster = new THREE.Raycaster();
        this.shaderPass = shaderPass;
        this.plane = null;
        this.marker = null;
    }
    genesisDevice() {
        this.geometry = new THREE.PlaneGeometry(
            window.innerWidth * 10,
            window.innerHeight * 12,
            98,
            98
        );
        this.material = new THREE.MeshLambertMaterial({
            color: BACKGROUND,
            shading: THREE.FlatShading
        });
        const inception = () => {
            for (let i = 0; i < this.geometry.vertices.length; i++) {
                if (i % 2 === 0 || i % 5 === 0 || i % 7 === 0) {
                    let num = Math.floor(Math.random() * (260 - 20 + 1)) + 180;
                    this.geometry.vertices[i].z = Math.random() * num;
                }
            }
            this.terrain = new THREE.Mesh(this.geometry, this.material);
            this.terrain.rotation.x = -Math.PI / 2;
            this.terrain.position.y = -336;
            this.scene.add(this.terrain /* , this.wire*/);
            return this;
        };

        inception();
    }
    generateBackground() {
        const iosahedronGeometry = new THREE.IcosahedronGeometry(3000, 1);
        const icosahedronMaterial = new THREE.MeshPhongMaterial({
            color: 0x222222,
            shading: THREE.FlatShading,
            side: THREE.BackSide
        });
        const icosahedron = new THREE.Mesh(
            iosahedronGeometry,
            icosahedronMaterial
        );
        this.scene.add(icosahedron);
    }
    draw() {
        this.stats.domElement.style.position = "absolute";
        this.stats.domElement.style.top = "0px";
        this.stats.domElement.style.right = "0px";
        document.body.appendChild(this.stats.domElement);

        this.newMap = new NewMap(this.scene);
        this.newMap.load();

        // this.generateBackground();
        this.genesisDevice();
        this.player = new Player(
            this.scene,
            this.camera,
            this.cubeSize,
            3 * this.cubeSize,
            this.cubeSize,
            6 * this.cubeSize,
            0x000000,
            180,
            this.newMap.collidableMeshList
        );
        this.player.draw();
        const particles = new Particles(this.scene, 2500,500, 2500, 0xff0000, 500);
        particles.draw();

        // Внешняя коробка для raycaster
        // const cameraBoxGeometry = new THREE.BoxGeometry(3000, 3000, 300);
        // const cameraBoxMaterial = new THREE.MeshBasicMaterial({
        //     color: 0x00ff00
        // });
        // const cameraBox = new THREE.Mesh(cameraBoxGeometry, cameraBoxMaterial);
        // cameraBox.geometry.computeBoundingBox();
        // this.plane = new THREE.Box3(
        //     cameraBox.geometry.boundingBox.min,
        //     cameraBox.geometry.boundingBox.max
        // );

        // // Точка на карте которая следует за Raycaster
        // this.marker = new THREE.Mesh(
        //     new THREE.SphereGeometry(10, 4, 2),
        //     new THREE.MeshBasicMaterial({
        //         color: "red"
        //     })
        // );
        // this.scene.add(this.marker);

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
            event.preventDefault();
            // console.log(this.player.player.main);
            // this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
            // this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            // this.raycaster.setFromCamera(this.mouse, this.camera);
            // this.raycaster.ray.intersectBox(this.plane, this.intersectPoint);
            // this.player.player.gun.lookAt(this.intersectPoint);
            // this.marker.position.copy(this.intersectPoint);
            // this.camera.lookAt(this.intersectPoint);
            // this.player.rotateGun(cursorX, cursorY);
        };
    }
    checkElevator(tank, elevators) {
        let tankPos = tank.tank.position;
        for (let i = 0; i < elevators.length; i++) {
            if (
                tankPos.x > elevators[i].x - elevators[i].size &&
                tankPos.x < elevators[i].x + elevators[i].size &&
                tankPos.z > elevators[i].z - elevators[i].size &&
                tankPos.z < elevators[i].z + elevators[i].size
            ) {
                let elevatorPosY = elevators[i].elevator.position.y;
                if (Math.ceil(elevatorPosY) === 0) {
                    this.flagElevatorBottom = true;
                    this.flagElevatorTop = false;
                }
                if (Math.ceil(elevatorPosY) === 8 * this.cubeSize) {
                    this.flagElevatorBottom = false;
                    this.flagElevatorTop = true;
                }
                if (elevatorPosY > 0 && tankPos.y <= 100) {
                    this.war = true;
                }
                if (
                    (this.flagElevatorBottom && tankPos.y === 100) ||
                    (this.flagElevatorTop && tankPos.y === 8 * this.cubeSize)
                ) {
                    this.onElevator = true;
                }
                if (this.onElevator) {
                    this.player.moveUp(Math.ceil(elevatorPosY) + tank.size);
                }
            }
        }
    }
    animate() {
        if (this.flagTop) {
            this.player.moveTop();
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
        this.checkElevator(this.player.player, this.newMap.elevators);
        this.camera.position
            .copy(this.player.player.tank.position)
            .add(new THREE.Vector3(0, 500, 600));
        this.camera.lookAt(this.player.player.tank.position);
        this.stats.update();
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.composer.render();
        this.shaderPass.uniforms.resolution.value.set(
            window.innerWidth,
            window.innerHeight
        );
    }
}
