import * as THREE from "three";
const OBJLoader = require("three-obj-loader");

export default class Rock {
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
                    if (child.name === "Sphere") {
                        this.meshes.push(child);
                        console.log(child);
                    }
                }
            });

            this.meshes[0].scale.z = 80;
            this.meshes[0].scale.x = 80;
            this.meshes[0].scale.y = 80;
            this.meshes[0].material = new THREE.MeshPhongMaterial({
                color: this.color
            });
            this.meshes[0].position.x = this.x;
            this.meshes[0].position.y = this.y;
            this.meshes[0].position.z = this.z;

            this.scene.add(this.meshes[0]);
        });
    }
}
