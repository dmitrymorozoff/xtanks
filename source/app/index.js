import * as THREE from "three";
import Scene from "./components/Scene/index.js";
import EffectComposer, {
    RenderPass,
    ShaderPass
} from "three-effectcomposer-es6";
const fxaa = require("three-shader-fxaa");
window.THREE = THREE;

export default class Game {
    constructor(settings) {
        this.settings = settings;
        this.controls = null;
    }
    start() {
        const scene = new THREE.Scene();
        // scene.fog = new THREE.FogExp2(0x07041a, 0.0004);
        const camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        camera.position.x = this.settings.camera.x;
        camera.position.y = this.settings.camera.y;
        camera.position.z = this.settings.camera.z;
        scene.add(new THREE.AmbientLight(0x404040));

        /* const axisHelper = new THREE.AxisHelper(1000);
        scene.add(axisHelper);*/

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 0);
        // scene.add(directionalLight);

        const renderer = new THREE.WebGLRenderer({ antialias: false });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x010101, 1);

        const target = new THREE.WebGLRenderTarget(
            window.innerWidth * window.devicePixelRatio,
            window.innerHeight * window.devicePixelRatio
        );
        target.format = THREE.RGBFormat;
        target.minFilter = THREE.LinearFilter;
        target.generateMipmaps = false;

        const composer = new EffectComposer(renderer, target);
        composer.addPass(new RenderPass(scene, camera));

        const shaderPass = new ShaderPass(fxaa());
        shaderPass.renderToScreen = true;
        composer.addPass(shaderPass);

        const gameScene = new Scene(
            scene,
            directionalLight,
            camera,
            composer,
            shaderPass
        );
        gameScene.draw();
        gameScene.animate();

        document.body.appendChild(renderer.domElement);
        function resize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            // target.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
            shaderPass.updateProjectionMatrix();
        }
        addEventListener("resize", resize);
    }
}
