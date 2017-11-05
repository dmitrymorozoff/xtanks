import * as THREE from "three";
const OBJLoader = require("three-obj-loader");

export default class Lamp {
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
                this.meshes.push(child);
                console.log(child);
            });
            object.scale.x = 50;
            object.scale.y = 50;
            object.scale.z = 50;

            object.position.x = this.x;
            object.position.y = this.y;
            object.position.z = this.z;

            this.meshes[0].material = new THREE.MeshPhongMaterial({
                color: 0x415159
            });
            this.meshes[1].material = new THREE.MeshPhongMaterial({
                color: 0x415159
            });
            this.meshes[2].material = new THREE.MeshPhongMaterial({
                color: 0x415159
            });
            this.meshes[3].material = new THREE.MeshPhongMaterial({
                color: 0x415159
            });
            this.meshes[4].material = new THREE.MeshPhongMaterial({
                color: 0x415159
            });
            this.scene.add(object);
        });
    }
}
