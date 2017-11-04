import * as THREE from "three";
const OBJLoader = require("three-obj-loader");

export default class Tank {
    constructor(scene, path, scale = 0, x = 0, y = 0, z = 0) {
        this.scene = scene;
        this.path = path;
        this.scale = scale;
        this.model = null;
        this.objLoader = OBJLoader(THREE);
        this.loader = new THREE.OBJLoader();
        this.x = x;
        this.y = y;
        this.z = z;
        this.meshes = [];
        this.details = {
            tower: ["Box003", "Cylinder001"],
            body: "Box002",
            caterpillar: ["Plane004", "Plane003"],
            bumper: ["Box024", "Box025", "Box026", "Box027"],
            trunk: "Cylinder025",
            luke: "Cylinder026",
            wings: ["Plane001", "Object015"],
            brone: [
                "Plane014",
                "Plane013",
                "Plane012",
                "Plane011",
                "Plane010",
                "Plane005",
                "Plane006",
                "Plane007",
                "Plane008",
                "Plane009"
            ],
            wheels: [
                "Cylinder021",
                "Cylinder012",
                "Cylinder009",
                "Object008",
                "Object009",
                "Object030",
                "Object031",
                "Object011",
                "Cylinder011",
                "Object029",
                "Object010",
                "Cylinder016",
                "Cylinder022",
                "Object012",
                "Object013",
                "Object014",
                "Object016",
                "Object032",
                "Object033",
                "Object034",
                "Object001"
            ],
            bodyDetails: [
                "Cylinder035",
                "Box037",
                "Box036",
                "Box035",
                "Box033",
                "Box034",
                "Cylinder036",
                "Cylinder030",
                "Cylinder029",
                "Cylinder037",
                "Cylinder027",
                "Cylinder028",
                "Cylinder038",
                "Cylinder039",
                "Cylinder023",
                "Cylinder024",
                "Cylinder031",
                "Cylinder033",
                "Object019",
                "Object017",
                "Object023",
                "Object026",
                "Object016",
                "Object018",
                "Plane018",
                "Plane017",
                "Box004",
                "Box005",
                "Box006",
                "Box007",
                "Box008",
                "Box009",
                "Box010",
                "Box011",
                "Box014",
                "Box015",
                "Box016",
                "Box017",
                "Box018",
                "Box019",
                "Box020",
                "Box031",
                "Box029",
                "Box030",
                "Box032",
                "Torus002",
                "Torus001",
                "Box021"
            ]
        };
    }
    load() {
        const bodyTexture = new THREE.TextureLoader().load("textures/arm.png");
        bodyTexture.wrapS = THREE.RepeatWrapping;
        bodyTexture.wrapT = THREE.RepeatWrapping;
        bodyTexture.repeat.set(1, 1);
        console.log(bodyTexture);
        this.loader.load(this.path, object => {
            this.object = object;
            object.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    this.meshes.push(child);
                }
            });
            for (let mesh of this.meshes) {
                if (
                    mesh.name === this.details.body ||
                    mesh.name === this.details.luke
                ) {
                    const material = new THREE.MeshPhongMaterial({
                        color: 0x7eb843
                    });
                    mesh.material = material;
                    console.log(mesh);
                }
                if (
                    mesh.name === this.details.caterpillar[0] ||
                    mesh.name === this.details.trunk ||
                    mesh.name === this.details.caterpillar[1]
                ) {
                    const material = new THREE.MeshPhongMaterial({
                        color: 0x3f3e39
                    });
                    mesh.material = material;
                    console.log(mesh);
                }
                if (
                    mesh.name === this.details.wings[0] ||
                    mesh.name === this.details.wings[1]
                ) {
                    const material = new THREE.MeshPhongMaterial({
                        color: 0x5a8e2f
                    });
                    mesh.material = material;
                    console.log(mesh);
                }
                if (
                    mesh.name === this.details.tower[1] ||
                    mesh.name === this.details.tower[0]
                ) {
                    const material = new THREE.MeshPhongMaterial({
                        color: 0x5a8e2f
                    });
                    mesh.material = material;
                    console.log(mesh);
                }
                for (let i = 0; i < this.details.brone.length; i++) {
                    if (mesh.name === this.details.brone[i]) {
                        const material = new THREE.MeshPhongMaterial({
                            color: 0x7eb843
                        });
                        mesh.material = material;
                        console.log(mesh);
                    }
                }
                for (let i = 0; i < this.details.bodyDetails.length; i++) {
                    if (mesh.name === this.details.bodyDetails[i]) {
                        const material = new THREE.MeshPhongMaterial({
                            color: 0x3f3e39
                        });
                        mesh.material = material;
                        console.log(mesh);
                    }
                }
                for (let i = 0; i < this.details.wheels.length; i++) {
                    if (mesh.name === this.details.wheels[i]) {
                        const material = new THREE.MeshPhongMaterial({
                            color: 0x5a8e2f
                        });
                        mesh.material = material;
                        console.log(mesh);
                    }
                }
                for (let i = 0; i < this.details.bumper.length; i++) {
                    if (mesh.name === this.details.bumper[i]) {
                        const material = new THREE.MeshPhongMaterial({
                            color: 0x5a8e2f
                        });
                        mesh.material = material;
                        console.log(mesh);
                    }
                }
            }
            this.scene.add(object);
        });
    }
}
