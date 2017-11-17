import * as THREE from "three";
import model from "./Supertank.js";

const DEG_TO_RAD = 0.0174533;

export default class Tank {
    constructor(scene, x = 0, y = 0, z = 0, scale = 1) {
        this.model  = model;
        this.scene  = scene;
        this.x      = x;
        this.y      = y + this.model.styles.geometries[1].params.height / 2 + 100;
        this.z      = z;
        this.tank   = new THREE.Group();
    }
    draw() {
        let geometries  = this.getGeometries(),
            materials   = this.getMaterials(),
            object, objects = new THREE.Group();;
        for (let i = 0; i < this.model.map.length; i++) {
            for (let y = 0; y < this.model.map[i].map.length; y++) {
                for (let x = 0; x < this.model.map[i].map[y].length; x++) {
                    for (let z = 0; z < this.model.map[i].map[y][x].length; z++) {
                        if (this.model.map[i].map[y][x][z]) {
                            object = new THREE.Mesh(
                                geometries[this.model.objects[this.model.map[i].map[y][x][z]].geometry],
                                materials[this.model.objects[this.model.map[i].map[y][x][z]].material]
                            );
                            this.setPosition(object, x, y + this.model.map[i].height, z);
                            objects.add(object);
                        }
                    }
                }
            }
            this.tank.add(objects);
        }
        this.tank.position.x = this.x;
        this.tank.position.y = this.y;
        this.tank.position.z = this.z;
        this.scene.add(this.tank);
    }
    getGeometries() {
        let geometries = {};
        for (let i = 1; i <= Object.keys(this.model.styles.geometries).length; i++) {
            switch (this.model.styles.geometries[i].type) {
                case 1:
                    geometries[i] = new THREE.BoxGeometry(
                        this.model.styles.geometries[i].params.width,
                        this.model.styles.geometries[i].params.height,
                        this.model.styles.geometries[i].params.length
                    );
                    break;
                case 2:
                    geometries[i] = new THREE.CylinderGeometry(
                        this.model.styles.geometries[i].params.radiusBegin,
                        this.model.styles.geometries[i].params.radiusEnd,
                        this.model.styles.geometries[i].params.length,
                        this.model.styles.geometries[i].params.quality
                    );
                    geometries[i].rotateZ(90 * DEG_TO_RAD);
                    break;
            }
        }
        return geometries;
    }
    getMaterials() {
        let materials = {};
        for (let i = 1; i <= Object.keys(this.model.styles.materials).length; i++) {
            switch (this.model.styles.materials[i].type) {
                case 1:
                    materials[i] = new THREE.MeshBasicMaterial(
                        this.model.styles.materials[i].params
                    );
                    break;
            }
        }
        return materials;
    }
    setPosition(object, x, y, z) {
        object.position.x += x * this.model.styles.geometries[1].params.width - (this.model.info.size.width * this.model.styles.geometries[1].params.width) / 2;
        object.position.y += y * this.model.styles.geometries[1].params.height;
        object.position.z += z * this.model.styles.geometries[1].params.length - (this.model.info.size.length * this.model.styles.geometries[1].params.length) / 2;
    }
}