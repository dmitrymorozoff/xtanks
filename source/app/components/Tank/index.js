import * as THREE from "three";
const OBJLoader = require("three-obj-loader");

export default class Tank {
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
            object.position.z = this.z;
            object.position.x = this.x;
            object.position.y = this.y;
            this.meshes[0].material = new THREE.MeshPhongMaterial({
                color: 0x424243
            });
            this.meshes[1].material = new THREE.MeshPhongMaterial({
                color: this.color
            });
            this.meshes[3].material = new THREE.MeshPhongMaterial({
                color: this.color
            });
            this.meshes[2].material = new THREE.MeshPhongMaterial({
                color: 0x424243
            });
            this.scene.add(object);
        });
    }
}

// import * as THREE from "three";
// const OBJLoader = require("three-obj-loader");

// export default class Tank {
//     constructor(scene, path, scale = 0, x = 0, y = 0, z = 0) {
//         this.scene = scene;
//         this.path = path;
//         this.scale = scale;
//         this.model = null;
//         this.objLoader = OBJLoader(THREE);
//         this.loader = new THREE.OBJLoader();
//         this.x = x;
//         this.y = y;
//         this.z = z;
//         this.meshes = [];
//         this.details = {
//             tower: ["Box003", "Cylinder001"],
//             body: "Box002",
//             caterpillar: ["Plane004", "Plane003"],
//             bumper: ["Box024", "Box025", "Box026", "Box027"],
//             trunk: "Cylinder025",
//             luke: "Cylinder026",
//             wings: ["Plane001", "Object015"],
//             brone: [
//                 "Plane014",
//                 "Plane013",
//                 "Plane012",
//                 "Plane011",
//                 "Plane010",
//                 "Plane005",
//                 "Plane006",
//                 "Plane007",
//                 "Plane008",
//                 "Plane009"
//             ],
//             wheels: [
//                 "Cylinder021",
//                 "Cylinder012",
//                 "Cylinder009",
//                 "Object008",
//                 "Object009",
//                 "Object030",
//                 "Object031",
//                 "Object011",
//                 "Cylinder011",
//                 "Object029",
//                 "Object010",
//                 "Cylinder016",
//                 "Cylinder022",
//                 "Object012",
//                 "Object013",
//                 "Object014",
//                 "Object016",
//                 "Object032",
//                 "Object033",
//                 "Object034",
//                 "Object001"
//             ],
//             bodyDetails: [
//                 "Cylinder035",
//                 "Box037",
//                 "Box036",
//                 "Box035",
//                 "Box033",
//                 "Box034",
//                 "Cylinder036",
//                 "Cylinder030",
//                 "Cylinder029",
//                 "Cylinder037",
//                 "Cylinder027",
//                 "Cylinder028",
//                 "Cylinder038",
//                 "Cylinder039",
//                 "Cylinder023",
//                 "Cylinder024",
//                 "Cylinder031",
//                 "Cylinder033",
//                 "Object019",
//                 "Object017",
//                 "Object023",
//                 "Object026",
//                 "Object016",
//                 "Object018",
//                 "Plane018",
//                 "Plane017",
//                 "Box004",
//                 "Box005",
//                 "Box006",
//                 "Box007",
//                 "Box008",
//                 "Box009",
//                 "Box010",
//                 "Box011",
//                 "Box014",
//                 "Box015",
//                 "Box016",
//                 "Box017",
//                 "Box018",
//                 "Box019",
//                 "Box020",
//                 "Box031",
//                 "Box029",
//                 "Box030",
//                 "Box032",
//                 "Torus002",
//                 "Torus001",
//                 "Box021"
//             ]
//         };
//     }
//     load() {
//         const bodyTexture = new THREE.TextureLoader().load(
//             "textures/8430f8ee.jpg"
//         );
//         bodyTexture.wrapS = THREE.RepeatWrapping;
//         bodyTexture.wrapT = THREE.RepeatWrapping;
//         bodyTexture.repeat.set(1, 1);
//         console.log(bodyTexture);
//         this.loader.load(this.path, object => {
//             this.object = object;
//             object.traverse(child => {
//                 if (child instanceof THREE.Mesh) {
//                     this.meshes.push(child);
//                     console.log(child);
//                 }
//             });
//             object.scale.x = 80;
//             object.scale.y = 80;
//             object.scale.z = 80;
//             for (let mesh of this.meshes) {
//             }
//             const material = new THREE.MeshPhongMaterial({
//                 color: 0x5a8e2f
//             });
//             const materialdark = new THREE.MeshPhongMaterial({
//                 color: 0x7eb843
//             });

//             const materialTube = new THREE.MeshPhongMaterial({
//                 color: 0x262e35
//             });

//             this.meshes[2].material = materialTube;
//             this.meshes[0].material = materialdark;
//             this.meshes[4].material = materialTube;
//             this.meshes[1].material = material;
//             this.meshes[3].material = material;
//             this.meshes[5].material = materialdark;
//             this.meshes[6].material = materialTube;
//             this.meshes[7].material = materialTube;
//             this.scene.add(object);
//         });
//     }
// }
