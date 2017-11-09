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
        /*const camera = new THREE.OrthographicCamera(
            frustumSize * aspect / -1.7,
            frustumSize * aspect / 1.7,
            frustumSize / 1.7,
            frustumSize / -1.7,
            1,
            10000
        );*/
        const camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
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
        renderer.render(scene, camera);
        addEventListener("resize", resize);
    }
}
