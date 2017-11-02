import * as THREE from "three";
const OBJLoader = require("three-obj-loader");

export default class ModelLoader {
    constructor(scene, path) {
        this.scene = scene;
        this.textures = null;
        this.objLoader = OBJLoader(THREE);
        this.loader = new THREE.OBJLoader();
        this.path = path;
        this.object = null;
    }

    load() {
        this.loader.load(this.path, object => {
            this.object = object;
            this.scene.add(object);
        });
    }
}
