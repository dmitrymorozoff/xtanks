import * as THREE from "three";
import Scene from "./components/Scene/index";
import EffectComposer, {
    RenderPass,
    ShaderPass,
} from "three-effectcomposer-es6";
import { FilmPass } from "postprocessing";
const fxaa = require("three-shader-fxaa");
window.THREE = THREE;

export default class Game {
    constructor(settings) {
        this.settings = settings;
        this.controls = null;
    }

    start() {
        THREE.RGBShiftShader = {
            uniforms: {
                tDiffuse: { value: null },
                amount: { value: 0.05 },
                angle: { value: 0.5 },
            },
            vertexShader: [
                "varying vec2 vUv;",
                "void main() {",
                "vUv = uv;",
                "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
                "}",
            ].join("\n"),
            fragmentShader: [
                "uniform sampler2D tDiffuse;",
                "uniform float amount;",
                "uniform float angle;",
                "varying vec2 vUv;",
                "void main() {",
                "vec2 offset = amount * vec2( cos(angle), sin(angle));",
                "vec4 cr = texture2D(tDiffuse, vUv + offset);",
                "vec4 cga = texture2D(tDiffuse, vUv);",
                "vec4 cb = texture2D(tDiffuse, vUv - offset);",
                "gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);",
                "}",
            ].join("\n"),
        };
        const scene = new THREE.Scene();
        // scene.fog = new THREE.FogExp2(0x000034, 0.0004);
        const camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            1,
            10000,
        );
        camera.position.x = this.settings.camera.x;
        camera.position.y = this.settings.camera.y;
        camera.position.z = this.settings.camera.z;
        scene.add(new THREE.AmbientLight(0x06069E));

        const renderer = new THREE.WebGLRenderer({ antialias: false });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000029, 0.25);

        const target = new THREE.WebGLRenderTarget(
            window.innerWidth * window.devicePixelRatio,
            window.innerHeight * window.devicePixelRatio,
        );
        target.format = THREE.RGBFormat;
        target.minFilter = THREE.LinearFilter;
        target.generateMipmaps = false;

        const composer = new EffectComposer(renderer, target);
        composer.addPass(new RenderPass(scene, camera));

        const shaderPass = new ShaderPass(fxaa());
        shaderPass.renderToScreen = false;
        composer.addPass(shaderPass);

        // const filmPass = new FilmPass();
        // filmPass.renderToScreen = true;
        // composer.addPass(filmPass);

        var effect = new ShaderPass(THREE.RGBShiftShader);
        effect.uniforms["amount"].value = 0.002;
        effect.renderToScreen = true;
        composer.addPass(effect);

        const gameScene = new Scene(scene, camera, composer, shaderPass);
        gameScene.draw();
        gameScene.animate();

        document.body.appendChild(renderer.domElement);

        function resize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            target.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        }

        addEventListener("resize", resize);
    }
}
