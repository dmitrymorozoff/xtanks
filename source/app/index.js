import * as THREE from "three";
import OrbitControls from "orbit-controls-es6";
import Scene from "./components/Scene/index.js";
import getRandomInt from "../utils/index.js";

export default class Game {
    constructor(settings) {
        this.settings = settings;
    }
    start() {
        let animationId;
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x07041a, 0.0004);
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 3200;
        const camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        camera.position.x = this.settings.camera.x;
        camera.position.y = this.settings.camera.y;
        camera.position.z = this.settings.camera.z;
        scene.add(new THREE.AmbientLight(0x1f095c, 0.7));

        /*const controls = new OrbitControls(camera);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;*/

        /*const axisHelper = new THREE.AxisHelper(1000);
        scene.add(axisHelper);*/

        const shadowlight = new THREE.PointLight(0xffffff, 0.4);
        shadowlight.position.set(0, 1, 0);
        scene.add(shadowlight);

        const renderer = new THREE.WebGLRenderer /*{ antialias: true }*/();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x07041a, 1);

        const gameScene = new Scene(scene, shadowlight, camera, renderer);
        gameScene.draw();
        gameScene.animate();

        document.body.appendChild(renderer.domElement);
        function resize() {
            /* const aspect = window.innerWidth / window.innerHeight;
            camera.left =
                -frustumSize * aspect / 1.7;
            camera.right =
                frustumSize * aspect / 1.7;
            camera.top = frustumSize / 1.7;
            camera.bottom = -frustumSize / 1.7;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);*/

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        addEventListener("resize", resize);
    }
}
