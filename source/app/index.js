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
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 3200;
        const camera = new THREE.OrthographicCamera(
            frustumSize * aspect / -this.settings.camera.cameraCoeff,
            frustumSize * aspect / this.settings.camera.cameraCoeff,
            frustumSize / this.settings.camera.cameraCoeff,
            frustumSize / -this.settings.camera.cameraCoeff,
            1,
            10000
        );
        camera.position.x = this.settings.camera.x;
        camera.position.y = this.settings.camera.y;
        camera.position.z = this.settings.camera.z;
        scene.add(new THREE.AmbientLight(0xcccccc, 0.7));

        const controls = new OrbitControls(camera);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;

        const axisHelper = new THREE.AxisHelper(1000);
        scene.add(axisHelper);

        var shadowlight = new THREE.DirectionalLight(0xffffff, 0.4);
        shadowlight.position.set(0, 100, 0);
        shadowlight.castShadow = true;
        shadowlight.shadowDarkness = 0.1;
        scene.add(shadowlight);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xf6f6f6, 1);
        renderer.shadowMapEnabled = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
        document.body.appendChild(renderer.domElement);

        const gameScene = new Scene(scene, shadowlight, camera, renderer);
        gameScene.draw();
        gameScene.animate();

        function resize() {
            const aspect = window.innerWidth / window.innerHeight;
            camera.left =
                -frustumSize * aspect / this.settings.camera.cameraCoeff;
            camera.right =
                frustumSize * aspect / this.settings.camera.cameraCoeff;
            camera.top = frustumSize / this.settings.camera.cameraCoeff;
            camera.bottom = -frustumSize / this.settings.camera.cameraCoeff;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        renderer.render(scene, camera);
        addEventListener("resize", resize);
    }
}
