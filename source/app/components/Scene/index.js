import Player from "../Player/index.js";
import { TweenMax } from "gsap";
import ModelLoader from "../../../utils/model.js";

export default class Scene {
    constructor(scene, light, camera, renderer) {
        this.scene = scene;
        this.light = light;
        this.camera = camera;
        this.renderer = renderer;
        this.animationId = 0;
    }
    draw() {
        const self = this;

        const model = new ModelLoader(this.scene, "./models/Panther_obj.obj");
        model.load();

        window.addEventListener("keydown", function(event) {
            var keyCode = event.which;
            if (keyCode == 65) {
            }
            if (keyCode == 68) {
            }
            if (keyCode == 32) {
            }
        });
    }
    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
