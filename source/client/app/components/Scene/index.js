import Stats from "stats.js";
import Map from "../Map/index.js";
import Particles from "../Particles/index.js";
import Player from "../Player/index.js";
import SmokeParticles from "../SmokeParticles/index.js";
import getRandomInt from "../../../../utils/index";
import IOClient from "../../IOClient/index";
import Supertank from "../Supertank/index";
import * as THREE from "three";
import { BACKGROUND, RED, DEG_TO_RAD } from "../../constants/index";

export default class Scene {
    constructor(scene, camera, composer, shaderPass) {
        this.scene = scene;
        this.camera = camera;
        this.composer = composer;
        this.animationId = 0;
        this.cubeSize = 100;
        this.player = null;
        this.movementPlayer = {
            left: false,
            right: false,
            top: false,
            bottom: false,
            mouse: {
                x: 0,
                y: 0
            }
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
        this.mouse = {};
        this.intersectPoint = new THREE.Vector3();
        this.raycaster = new THREE.Raycaster();
        this.shaderPass = shaderPass;
        this.plane = null;
        this.marker = null;
        this.client = null;
        this.tanks = [];
        this.aim = document.getElementById("aim");
    }
    setAimPosition(mouse) {
        this.aim.style.left = `${mouse.x}px`;
        this.aim.style.top = `${mouse.y}px`;
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
        const iosahedronGeometry = new THREE.IcosahedronGeometry(3700, 1);
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
                getRandomInt(50, 500),
                "./assets/smoke.png",
                800,
                0x720000
            );
            smoke.draw();
        }
    }
    addTank(id, name, type, isMe, x, y, z, health) {
        let tankData = {
            id,
            name,
            type,
            isMe,
            x: x * this.cubeSize,
            y: y * this.cubeSize,
            z: z * this.cubeSize,
            health
        };
        if (isMe) {
            this.player = new Player(this.scene, {
                camera: this.camera,
                size: this.cubeSize,
                color: 0x4b0082,
                collidableMeshList: this.map.collidableMeshList,
                ...tankData
            });
            this.player.draw();
            this.tanks.push(this.player.player);
        } else {
            let tank = new Supertank(this.scene, tankData);
            tank.initModel();
            tank.draw();
            this.tanks.push(tank);
        }
        if (this.player !== null) {
            this.client.socket.emit("updateWindowInfo", {
                width: window.innerWidth,
                height: window.innerHeight,
                id: this.player.id
            });
        }
    }
    updateMovement(dataFromServer) {
        let self = this;
        dataFromServer.tanks.forEach(tankFromServer => {
            let isFound = false;
            self.tanks.forEach(clientTank => {
                if (clientTank.id === tankFromServer.id) {
                    clientTank.x = tankFromServer.x;
                    clientTank.z = tankFromServer.z;
                    clientTank.angle = tankFromServer.angle;
                    clientTank.tower.rotation.y = tankFromServer.towerAngle;
                    clientTank.corps.rotation.y = tankFromServer.angle;
                    clientTank.tank.position.x = tankFromServer.x;
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
    movementToServer(data) {
        this.movementPlayer.id = this.player.id;
        this.client.socket.emit("movement", data);
    }
    removeTank(tankId) {
        console.log(this.player, tankId);
        console.log(this.tanks);
        this.tanks = this.tanks.filter(tank => {
            return tank.id !== tankId;
        });
        console.log(this.tanks);

        this.scene.remove(this.scene.getObjectByName(tankId));
    }
    draw() {
        this.stats.domElement.style.position = "absolute";
        this.stats.domElement.style.top = "0px";
        this.stats.domElement.style.right = "0px";
        document.body.appendChild(this.stats.domElement);

        this.map = new Map(this.scene);
        this.map.load();

        // this.genesisDevice();
        // this.drawSmoke();

        const particles = new Particles(this.scene, 2500, 500, 2500, RED, 400);
        particles.draw();
        this.camera.lookAt({
            x: 0,
            y: 0,
            z: 0
        });
        const cameraBoxGeometry = new THREE.BoxGeometry(3000, 3000, 300);
        const cameraBoxMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });

        const cameraBox = new THREE.Mesh(cameraBoxGeometry, cameraBoxMaterial);
        cameraBox.geometry.computeBoundingBox();
        this.plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

        window.addEventListener("keydown", event => {
            switch (event.keyCode) {
                case 65:
                    this.movementPlayer.left = true;
                    break;
                case 68:
                    this.movementPlayer.right = true;
                    break;
                case 87:
                    this.movementPlayer.top = true;
                    break;
                case 83:
                    this.movementPlayer.bottom = true;
                    break;
                default:
                    break;
            }
        });
        window.addEventListener("keyup", event => {
            switch (event.keyCode) {
                case 65:
                    this.movementPlayer.left = false;
                    break;
                case 68:
                    this.movementPlayer.right = false;
                    break;
                case 87:
                    this.movementPlayer.top = false;
                    break;
                case 83:
                    this.movementPlayer.bottom = false;
                    break;
                default:
                    break;
            }
        });
        document.onmousemove = event => {
            if (this.player !== null) {
                this.movementPlayer.mouse = {
                    x: event.clientX,
                    y: event.clientY,
                    id: this.player.id
                };
                this.setAimPosition(this.movementPlayer.mouse);
            }
        };
        window.onbeforeunload = () => {
            this.client.socket.emit("leaveGame", this.player.id);
        };
        window.onresize = () => {
            if (this.player !== null) {
                this.client.socket.emit("updateWindowInfo", {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    id: this.player.id
                });
            }
        };
        this.client = new IOClient();
        this.client.socket.on("connect", () => {
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
        this.client.socket.on("updateMovement", data => {
            this.updateMovement(data);
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
            // this.player.detectCollision();
            if (this.player !== null) {
                // this.checkElevator(this.player.player, this.map.elevators);
                this.camera.position
                    .copy(this.player.player.tank.position)
                    .add(new THREE.Vector3(0, 850, 700));
                this.camera.lookAt(this.player.player.tank.position);
            }
            this.movementToServer(this.movementPlayer);
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
