import * as THREE from "three";

export default class EdgesCube {
    constructor(scene, size, x = 0, y = 0, z = 0, color) {
        this.scene = scene;
        this.size = size;
        this.color = color;
        this.x = x;
        this.y = y;
        this.z = z;
        this.cube = null;
    }
    load() {
        const cubeGeometry = new THREE.BoxGeometry(
            this.size,
            this.size,
            this.size
        );
        const material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            shading: THREE.FlatShading
        });
        this.cube = new THREE.Mesh(cubeGeometry, material);
        this.cube.position.x = this.x;
        this.cube.position.y = this.y;
        this.cube.position.z = this.z;
        console.log(this.cube.geometry);
        const geo = new THREE.EdgesGeometry(this.cube.geometry); // or WireframeGeometry
        const mat = new THREE.LineBasicMaterial({
            color: 0xff0000,
            linewidth: 3
        });
        const wireframe = new THREE.LineSegments(geo, mat);
        this.cube.add(wireframe);

        this.scene.add(this.cube);
    }
}
