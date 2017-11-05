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
            frustumSize * aspect / -2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            frustumSize / -2,
            1,
            10000
        );
        camera.position.y = 400;
        camera.position.x = this.settings.camera.x;
        camera.position.y = this.settings.camera.y;
        camera.position.z = this.settings.camera.z;
        scene.add(new THREE.AmbientLight(0x111111));

        const controls = new OrbitControls(camera);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;

        /*const axisHelper = new THREE.AxisHelper(1000);
        scene.add(axisHelper);*/

        // Вершшхний свет
        var shadowlight = new THREE.DirectionalLight(0xffffff, 0.3);
        shadowlight.position.set(0, 100, 0);
        shadowlight.castShadow = true;
        shadowlight.shadowDarkness = 0.1;
        scene.add(shadowlight);

        var light = new THREE.DirectionalLight(0xf6f6f6, 0.5);
        light.position.set(-60, 100, 20);
        scene.add(light);

        var backLight = new THREE.DirectionalLight(0x777777, 0.65);
        backLight.position.set(-10, 100, 60);
        scene.add(backLight);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x161b2f, 1);
        renderer.shadowMapEnabled = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
        document.body.appendChild(renderer.domElement);

        const gameScene = new Scene(scene, shadowlight, camera, renderer);
        gameScene.draw();
        gameScene.animate();

        function resize() {
            const aspect = window.innerWidth / window.innerHeight;
            camera.left = -frustumSize * aspect / 2;
            camera.right = frustumSize * aspect / 2;
            camera.top = frustumSize / 2;
            camera.bottom = -frustumSize / 2;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        renderer.render(scene, camera);
        addEventListener("resize", resize);
    }
}
