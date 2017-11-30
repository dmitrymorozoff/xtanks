import * as THREE from "three";
import model from "./t90.js";

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
        this.basic_size = this.model.styles.geometries[1].size;
        this.tank = new THREE.Group();
    }
    draw() {
        this.scene.add(this.tank);
    }
    initModel() {
        let model_size = this.model.info.size,
            model_map = this.model.maps,
            model_geometries = this.model.styles.geometries,
            model_objects = this.model.objects,
            geometries = this.getGeometries(),
            materials = this.getMaterials(),
            colors = this.getColors(),
            merged_object,
            convert_x,
            convert_y,
            convert_z,
            geometry_id,
            material_id,
            color_id,
            map_value;

        for (let i = 0; i < model_map.length; i++) {
            merged_object = new THREE.Geometry();
            material_id = model_map[i].material_id;

            for (let y = 0; y < model_map[i].map.length; y++) {
                for (let x = 0; x < model_map[i].map[y].length; x++) {
                    for (let z = 0; z < model_map[i].map[y][x].length; z++) {
                        map_value = model_map[i].map[y][x][z];

                        if (map_value) {
                            convert_x =
                                x * this.basic_size.width -
                                model_size.width * this.basic_size.width / 2 +
                                this.basic_size.width / 2 +
                                model_objects[map_value].bias.x;
                            convert_y =
                                (y + model_map[i].height) *
                                    this.basic_size.height +
                                this.basic_size.height / 2 +
                                model_objects[map_value].bias.y;
                            convert_z =
                                z * this.basic_size.length -
                                model_size.length * this.basic_size.length / 2 +
                                this.basic_size.length / 2 +
                                model_objects[map_value].bias.z;

                            geometry_id = model_objects[map_value].geometry_id;
                            color_id = model_objects[map_value].color_id;

                            geometries[geometry_id].rotateX(
                                model_objects[map_value].rotate.x * DEG_TO_RAD
                            );
                            geometries[geometry_id].rotateY(
                                model_objects[map_value].rotate.y * DEG_TO_RAD
                            );
                            geometries[geometry_id].rotateZ(
                                model_objects[map_value].rotate.z * DEG_TO_RAD
                            );
                            geometries[geometry_id].translate(
                                convert_x,
                                convert_y,
                                convert_z
                            );
                            for (
                                let k = 0;
                                k < geometries[geometry_id].faces.length;
                                k++
                            ) {
                                geometries[geometry_id].faces[k].color.set(
                                    colors[color_id]
                                );
                            }

                            merged_object.merge(geometries[geometry_id]);

                            geometries[geometry_id].translate(
                                -convert_x,
                                -convert_y,
                                -convert_z
                            );
                            geometries[geometry_id].rotateZ(
                                -model_objects[map_value].rotate.z * DEG_TO_RAD
                            );
                            geometries[geometry_id].rotateY(
                                -model_objects[map_value].rotate.y * DEG_TO_RAD
                            );
                            geometries[geometry_id].rotateX(
                                -model_objects[map_value].rotate.x * DEG_TO_RAD
                            );
                        }
                    }
                }
            }

            this.tank.add(
                new THREE.Mesh(merged_object, materials[material_id])
            );
        }

        this.tank.position.set(this.x, this.y, this.z);
        this.tank.rotateY(this.rotate * DEG_TO_RAD);
    }
    getGeometries() {
        let model_geometries = this.model.styles.geometries,
            geometries = {};

        for (let i = 1; i <= Object.keys(model_geometries).length; i++) {
            switch (model_geometries[i].type) {
                case 1:
                    geometries[i] = new THREE.BoxGeometry(
                        model_geometries[i].size.width,
                        model_geometries[i].size.height,
                        model_geometries[i].size.length
                    );
                    break;

                case 2:
                    geometries[i] = new THREE.CylinderGeometry(
                        model_geometries[i].size.radius_begin,
                        model_geometries[i].size.radius_end,
                        model_geometries[i].size.length,
                        model_geometries[i].size.quality
                    );
                    break;
            }
        }

        return geometries;
    }
    getMaterials() {
        let model_materials = this.model.styles.materials,
            materials = {};
        for (let i = 1; i <= Object.keys(model_materials).length; i++) {
            switch (model_materials[i].type) {
                case 1:
                    model_materials[i].params["vertexColors"] =
                        THREE.VertexColors;
                    materials[i] = new THREE.MeshStandardMaterial(
                        model_materials[i].params
                    );
                    break;
                case 2:
                    model_materials[i].params["vertexColors"] =
                        THREE.VertexColors;
                    materials[i] = new THREE.MeshBasicMaterial(
                        model_materials[i].params
                    );
                    break;
            }
        }
        return materials;
    }
    getColors() {
        let model_colors = this.model.styles.colors,
            colors = {};
        for (let i = 1; i <= Object.keys(model_colors).length; i++) {
            colors[i] = model_colors[i];
        }
        return colors;
    }
}
