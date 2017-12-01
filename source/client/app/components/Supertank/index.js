import * as THREE from "three";
import model from "./myT.js";

const DEG_TO_RAD = 0.0174533;

export default class Tank {
    constructor(scene = null, x = 0, y = 0, z = 0, rotate = -90, scale = 1) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotate = rotate;
        this.scale = scale;
        this.model = model;
        this.basicSize = this.model.styles.geometries[1].size;
        this.tank = new THREE.Group();
    }
    draw() {
        this.scene.add(this.tank);
    }
    initModel() {
        let modelSize = this.model.info.size;
        let modelMap = this.model.maps;
        let modelObjects = this.model.objects;
        let geometries = this.getGeometries();
        let materials = this.getMaterials();
        let colors = this.getColors();
        let mergedObject;
        let convertX;
        let convertY;
        let convertZ;
        let geometryId;
        let materialId;
        let colorId;
        let mapValue;

        for (let i = 0; i < modelMap.length; i++) {
            mergedObject = new THREE.Geometry();
            materialId = modelMap[i].materialId;
            for (let y = 0; y < modelMap[i].map.length; y++) {
                for (let x = 0; x < modelMap[i].map[y].length; x++) {
                    for (let z = 0; z < modelMap[i].map[y][x].length; z++) {
                        mapValue = modelMap[i].map[y][x][z];

                        if (mapValue) {
                            convertX =
                                x * this.basicSize.width -
                                modelSize.width * this.basicSize.width / 2 +
                                this.basicSize.width / 2 +
                                modelObjects[mapValue].bias.x;
                            convertY =
                                (y + modelMap[i].height) *
                                    this.basicSize.height +
                                this.basicSize.height / 2 +
                                modelObjects[mapValue].bias.y;
                            convertZ =
                                z * this.basicSize.length -
                                modelSize.length * this.basicSize.length / 2 +
                                this.basicSize.length / 2 +
                                modelObjects[mapValue].bias.z;

                            geometryId = modelObjects[mapValue].geometryId;
                            colorId = modelObjects[mapValue].colorId;

                            geometries[geometryId].rotateX(
                                modelObjects[mapValue].rotate.x * DEG_TO_RAD
                            );
                            geometries[geometryId].rotateY(
                                modelObjects[mapValue].rotate.y * DEG_TO_RAD
                            );
                            geometries[geometryId].rotateZ(
                                modelObjects[mapValue].rotate.z * DEG_TO_RAD
                            );
                            geometries[geometryId].translate(
                                convertX,
                                convertY,
                                convertZ
                            );
                            for (
                                let k = 0;
                                k < geometries[geometryId].faces.length;
                                k++
                            ) {
                                geometries[geometryId].faces[k].color.set(
                                    colors[colorId]
                                );
                            }

                            mergedObject.merge(geometries[geometryId]);

                            geometries[geometryId].translate(
                                -convertX,
                                -convertY,
                                -convertZ
                            );
                            geometries[geometryId].rotateZ(
                                -modelObjects[mapValue].rotate.z * DEG_TO_RAD
                            );
                            geometries[geometryId].rotateY(
                                -modelObjects[mapValue].rotate.y * DEG_TO_RAD
                            );
                            geometries[geometryId].rotateX(
                                -modelObjects[mapValue].rotate.x * DEG_TO_RAD
                            );
                        }
                    }
                }
            }
            this.tank.add(new THREE.Mesh(mergedObject, materials[materialId]));
        }
        this.tank.position.set(this.x, this.y, this.z);
        this.tank.rotateY(this.rotate * DEG_TO_RAD);
    }
    getGeometries() {
        let modelGeometries = this.model.styles.geometries,
            geometries = {};

        for (let i = 1; i <= Object.keys(modelGeometries).length; i++) {
            switch (modelGeometries[i].type) {
                case 1:
                    geometries[i] = new THREE.BoxGeometry(
                        modelGeometries[i].size.width,
                        modelGeometries[i].size.height,
                        modelGeometries[i].size.length
                    );
                    break;
                case 2:
                    geometries[i] = new THREE.CylinderGeometry(
                        modelGeometries[i].size.radiusBegin,
                        modelGeometries[i].size.radiusEnd,
                        modelGeometries[i].size.length,
                        modelGeometries[i].size.quality
                    );
                    break;
                case 3:
                    geometries[i] = new THREE.CircleGeometry(
                        modelGeometries[i].size.radius,
                        modelGeometries[i].size.segments
                    );
                    break;
            }
        }

        return geometries;
    }
    getMaterials() {
        let modelMaterials = this.model.styles.materials,
            materials = {};
        for (let i = 1; i <= Object.keys(modelMaterials).length; i++) {
            switch (modelMaterials[i].type) {
                case 1:
                    modelMaterials[i].params["vertexColors"] =
                        THREE.VertexColors;
                    materials[i] = new THREE.MeshStandardMaterial(
                        modelMaterials[i].params
                    );
                    break;
                case 2:
                    modelMaterials[i].params["vertexColors"] =
                        THREE.VertexColors;
                    materials[i] = new THREE.MeshBasicMaterial(
                        modelMaterials[i].params
                    );
                    break;
                case 3:
                    const circleTexture = THREE.ImageUtils.loadTexture(
                        "assets/circle.png"
                    );
                    modelMaterials[i].params["vertexColors"] =
                        THREE.VertexColors;
                    materials[i] = new THREE.MeshBasicMaterial({
                        ...modelMaterials[i].params,
                        map: circleTexture
                    });
                    break;
            }
        }
        return materials;
    }
    getColors() {
        let modelColors = this.model.styles.colors,
            colors = {};
        for (let i = 1; i <= Object.keys(modelColors).length; i++) {
            colors[i] = modelColors[i];
        }
        return colors;
    }
}
