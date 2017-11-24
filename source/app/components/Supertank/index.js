import * as THREE from "three";
import model from "./Supertank.js";

const DEG_TO_RAD = 0.0174533;

export default class Tank {
    constructor(scene, x = 0, y = 0, z = 0, scale = 1) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.z = z;
        this.model = model;
        this.basicSize = this.model.styles.geometries[1].size;
        this.tank = new THREE.Group();
    }
    draw() {
        let modelMap = this.model.map,
            modelObjects = this.model.objects,
            modelGeometries = this.model.styles.geometries,
            modelMaterials = this.model.styles.materials,
            modelSize = this.model.info.size,
            geometries = this.getGeometries(),
            materials = this.getMaterials(),
            object,
            objects,
            mergedObject,
            convertX,
            convertY,
            convertZ;
        let mat = new THREE.MeshLambertMaterial({ color: 0x666666 });
        for (let i = 0; i < modelMap.length; i++) {
            objects = new THREE.Group();
            mergedObject = new THREE.Geometry();
            for (let y = 0; y < modelMap[i].map.length; y++) {
                for (let x = 0; x < modelMap[i].map[y].length; x++) {
                    for (let z = 0; z < modelMap[i].map[y][x].length; z++) {
                        if (modelMap[i].map[y][x][z]) {
                            /* object = new THREE.Mesh(
                                geometries[modelObjects[modelMap[i].map[y][x][z]].geometry],
                                materials[modelObjects[modelMap[i].map[y][x][z]].material]
                            );*/
                            convertX =
                                x * this.basicSize.width -
                                modelSize.width * this.basicSize.width / 2 +
                                this.basicSize.width / 2 +
                                modelGeometries[
                                    modelObjects[modelMap[i].map[y][x][z]]
                                        .geometry
                                ].bias.x;
                            convertY =
                                (y + modelMap[i].height) *
                                    this.basicSize.height +
                                this.basicSize.height / 2 +
                                modelGeometries[
                                    modelObjects[modelMap[i].map[y][x][z]]
                                        .geometry
                                ].bias.y;
                            convertZ =
                                z * this.basicSize.length -
                                modelSize.length * this.basicSize.length / 2 +
                                this.basicSize.length / 2 +
                                modelGeometries[
                                    modelObjects[modelMap[i].map[y][x][z]]
                                        .geometry
                                ].bias.z;
                            geometries[
                                modelObjects[modelMap[i].map[y][x][z]].geometry
                            ].translate(convertX, convertY, convertZ);
                            mergedObject.merge(
                                geometries[
                                    modelObjects[modelMap[i].map[y][x][z]]
                                        .geometry
                                ]
                            );
                            geometries[
                                modelObjects[modelMap[i].map[y][x][z]].geometry
                            ].translate(-convertX, -convertY, -convertZ);
                            /* object.position.set(convertX, convertY, convertZ);
                            objects.add(object);*/
                        }
                    }
                }
            }
            // this.tank.add(objects);
            this.tank.add(new THREE.Mesh(mergedObject, mat));
        }
        this.tank.position.set(this.x, this.y, this.z);
        this.scene.add(this.tank);
    }
    getGeometries() {
        let geometries = {},
            modelGeometries = this.model.styles.geometries;
        for (let i = 1; i <= Object.keys(modelGeometries).length; i++) {
            switch (modelGeometries[i].type) {
                case 1:
                    geometries[i] = new THREE.BoxGeometry(
                        modelGeometries[i].size.width,
                        modelGeometries[i].size.height,
                        modelGeometries[i].size.length
                    );
                    geometries[i].rotateX(
                        modelGeometries[i].rotate.x * DEG_TO_RAD
                    );
                    geometries[i].rotateY(
                        modelGeometries[i].rotate.y * DEG_TO_RAD
                    );
                    geometries[i].rotateZ(
                        modelGeometries[i].rotate.z * DEG_TO_RAD
                    );
                    break;
                case 2:
                    geometries[i] = new THREE.CylinderGeometry(
                        modelGeometries[i].size.radiusBegin,
                        modelGeometries[i].size.radiusEnd,
                        modelGeometries[i].size.length,
                        modelGeometries[i].size.quality
                    );
                    geometries[i].rotateX(
                        modelGeometries[i].rotate.x * DEG_TO_RAD
                    );
                    geometries[i].rotateY(
                        modelGeometries[i].rotate.y * DEG_TO_RAD
                    );
                    geometries[i].rotateZ(
                        modelGeometries[i].rotate.z * DEG_TO_RAD
                    );
                    break;
            }
        }
        return geometries;
    }
    getMaterials() {
        let materials = {},
            modelMaterials = this.model.styles.materials;
        for (let i = 1; i <= Object.keys(modelMaterials).length; i++) {
            switch (modelMaterials[i].type) {
                case 1:
                    materials[i] = new THREE.MeshBasicMaterial(
                        modelMaterials[i].params
                    );
                    break;
            }
        }
        return materials;
    }
}
