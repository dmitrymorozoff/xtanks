import * as THREE from "three";
const OBJLoader = require("three-obj-loader");

export default class Tree {
    constructor(scene, path, x = 0, y = 0, z = 0, color, scale = 0) {
        this.scene = scene;
        this.path = path;
        this.scale = scale;
        this.color = color;
        this.model = null;
        this.objLoader = OBJLoader(THREE);
        this.loader = new THREE.OBJLoader();
        this.x = x;
        this.y = y;
        this.z = z;
        this.meshes = [];
    }
    load() {
        this.loader.load(this.path, object => {
            this.object = object;
            object.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    this.meshes.push(child);
                }
            });
            this.meshes[0].material = new THREE.MeshPhongMaterial({
                color: this.color
            });
            object.scale.z = 100;
            object.scale.x = 100;
            object.scale.y = 100;

            object.position.x = this.x;
            object.position.y = this.y;
            object.position.z = this.z;

            this.scene.add(object);
        });
    }
}
