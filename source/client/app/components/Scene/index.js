import Stats from "stats.js";
import Map from "../Map/index.js";
import Particles from "../Particles/index.js";
import Player from "../Player/index.js";
import SmokeParticles from "../SmokeParticles/index.js";
import getRandomInt from "../../../../utils/index";
import IOClient from "../../IOClient/index";
import Supertank from "../Supertank/index";
import * as THREE from "three";
import { BACKGROUND } from "../../constants/index";

export default class Scene {
    constructor(scene, camera, composer, shaderPass) {
        this.scene = scene;
        this.camera = camera;
        this.composer = composer;
        this.animationId = 0;
        this.cubeSize = 100;
        this.player = null;
        this.flagsMovePlayer = {
            left: false,
            right: false,
            top: false,
            bottom: false
        };
        this.camPos = new THREE.Vector3(0, 0, 0);
        this.targetPos = new THREE.Vector3(0, 200, 300);
        this.origin = new THREE.Vector3(0, 0, 0);
        this.stats = new Stats();
        this.map = null;
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
        this.client = null;
        this.tanks = [];
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
            this.scene.add(this.terrain);
            return this;
        };
        inception();
    }
    drawBackground() {
        const iosahedronGeometry = new THREE.IcosahedronGeometry(3400, 1);
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
    drawSmoke() {
        const coordsSmoke = [
            { x: 10, y: 1, z: 4 },
            { x: 8, y: 1, z: -16 },
            { x: -14, y: 1, z: -9 },
            { x: 0, y: 1, z: -7 },
            { x: -12, y: 1, z: 6 }
        ];
        for (let i = 0; i < coordsSmoke.length; i++) {
            let smoke = new SmokeParticles(
                this.scene,
                coordsSmoke[i].x * this.cubeSize + Math.random() * 250 - 16,
                coordsSmoke[i].y * this.cubeSize,
                coordsSmoke[i].z * this.cubeSize + Math.random() * 250 - 16,
                getRandomInt(100, 500),
                "./assets/smoke.png",
                1600,
                0x720000
            );
            smoke.draw();
        }
    }
    addTank(id, name, type, isMe, x, y, z, health) {
        if (isMe) {
            this.player = new Player(this.scene, {
                camera: this.camera,
                size: this.cubeSize,
                x: x * this.cubeSize,
                y: y * this.cubeSize,
                z: z * this.cubeSize,
                color: 0x4b0082,
                collidableMeshList: this.map.collidableMeshList,
                id,
                name,
                type,
                isMe,
                health
            });
            this.player.draw();
            console.log(this.player);
        } else {
            let tank = new Supertank(this.scene, {
                id,
                name,
                type,
                isMe,
                x: x * this.cubeSize,
                y: y * this.cubeSize,
                z: z * this.cubeSize,
                health
            });
            tank.initModel();
            tank.draw();
            this.tanks.push(tank);
        }
    }
    updateTanksPosition() {
        let gameData = {
            tank: {
                id: this.player.id,
                x: this.player.x,
                y: this.player.y,
                z: this.player.z,
                angle: this.player.angle
            }
        };
        this.client.socket.emit("updateGame", gameData);
    }
    updateGame(dataFromServer) {
        let self = this;
        dataFromServer.tanks.forEach(tankFromServer => {
            let isFound = false;
            self.tanks.forEach(clientTank => {
                if (clientTank.id === tankFromServer.id) {
                    clientTank.x = tankFromServer.x;
                    clientTank.y = tankFromServer.y;
                    clientTank.z = tankFromServer.z;
                    clientTank.angle = tankFromServer.angle;
                    clientTank.tank.rotation.y = tankFromServer.angle;
                    clientTank.tank.position.x = tankFromServer.x;
                    clientTank.tank.position.y = tankFromServer.y;
                    clientTank.tank.position.z = tankFromServer.z;
                    isFound = true;
                }
            });
            if (
                !isFound &&
                (self.player === null || tankFromServer.id !== self.player.id)
            ) {
                self.addTank(
                    tankFromServer.id,
                    tankFromServer.name,
                    tankFromServer.type,
                    tankFromServer.isMe,
                    tankFromServer.x,
                    tankFromServer.y,
                    tankFromServer.z
                );
            }
        });
    }
    removeTank(tankId) {
        this.tanks = this.tanks.filter(tank => {
            return tank.id !== tankId;
        });
        this.scene.remove(this.scene.getObjectByName(tankId));
    }
    draw() {
        this.stats.domElement.style.position = "absolute";
        this.stats.domElement.style.top = "0px";
        this.stats.domElement.style.right = "0px";
        document.body.appendChild(this.stats.domElement);

        this.map = new Map(this.scene);
        this.map.load();

        // this.drawBackground();
        // this.drawSmoke();

        const particles = new Particles(
            this.scene,
            2500,
            500,
            2500,
            0xff0000,
            400
        );
        particles.draw();

        const cameraBoxGeometry = new THREE.BoxGeometry(3000, 3000, 300);
        const cameraBoxMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });

        const cameraBox = new THREE.Mesh(cameraBoxGeometry, cameraBoxMaterial);
        cameraBox.geometry.computeBoundingBox();
        this.plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        // Точка на карте которая следует за Raycaster
        this.marker = new THREE.Mesh(
            new THREE.SphereGeometry(10, 4, 2),
            new THREE.MeshBasicMaterial({
                color: "red"
            })
        );
        // this.scene.add(this.marker);
        console.log(this.tanks);
        window.addEventListener("keydown", event => {
            switch (event.keyCode) {
                case 65:
                    this.flagsMovePlayer.left = true;
                    break;
                case 68:
                    this.flagsMovePlayer.right = true;
                    break;
                case 87:
                    this.flagsMovePlayer.top = true;
                    break;
                case 83:
                    this.flagsMovePlayer.bottom = true;
                    break;
                default:
                    break;
            }
        });
        window.addEventListener("keyup", event => {
            switch (event.keyCode) {
                case 65:
                    this.flagsMovePlayer.left = false;
                    break;
                case 68:
                    this.flagsMovePlayer.right = false;
                    break;
                case 87:
                    this.flagsMovePlayer.top = false;
                    break;
                case 83:
                    this.flagsMovePlayer.bottom = false;
                    break;
                default:
                    break;
            }
        });
        document.onmousemove = event => {
            event.preventDefault();
            // this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
            // this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            // this.raycaster.setFromCamera(this.mouse, this.camera);
            // this.raycaster.ray.intersectPlane(this.plane, this.intersectPoint);
            // this.player.player.corps.lookAt(this.intersectPoint);
            // this.marker.position.copy(this.intersectPoint);
        };
        window.onbeforeunload = e => {
            this.client.socket.emit("leaveGame", this.player.id);
        };
        this.client = new IOClient();
        this.client.socket.on("connect", socket => {
            this.client.socket.emit("joinGame", { name: "newTank", type: 1 });
        });
        this.client.socket.on("addTank", tank => {
            this.addTank(
                tank.id,
                tank.name,
                tank.type,
                tank.isMe,
                tank.x,
                tank.y,
                tank.z
            );
        });
        this.client.socket.on("updateGame", gameServerData => {
            this.updateGame(gameServerData);
        });
        this.client.socket.on("removeTank", tankId => {
            this.removeTank(tankId);
        });
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
        if (this.player !== null) {
            if (this.flagsMovePlayer.top) {
                this.player.moveTop();
            }
            if (this.flagsMovePlayer.left) {
                this.player.moveLeft();
            }
            if (this.flagsMovePlayer.right) {
                this.player.moveRight();
            }
            if (this.flagsMovePlayer.bottom) {
                this.player.moveBottom();
            }
            // this.player.detectCollision();
            if (this.player !== null) {
                // this.checkElevator(this.player.player, this.map.elevators);
                this.camera.position
                    .copy(this.player.player.tank.position)
                    .add(new THREE.Vector3(0, 700, 600));
                this.camera.lookAt(this.player.player.tank.position);
            }
            this.updateTanksPosition();
        }
        this.stats.update();
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.composer.render();
        this.shaderPass.uniforms.resolution.value.set(
            window.innerWidth,
            window.innerHeight
        );
    }
}
