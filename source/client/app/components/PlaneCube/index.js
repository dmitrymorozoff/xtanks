import * as THREE from "three";

export default class PlaneCube {
    constructor(
        scene,
        width,
        height,
        depth,
        x = 0,
        y = 0,
        z = 0,
        color,
        material
    ) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
        this.cube = null;
        this.material = material;
        this.x = x;
        this.y = y;
        this.z = z;
        this.cube = null;
    }
    draw() {
        const light = new THREE.Color(0xffffff);
        const shadow = new THREE.Color(0x505050);
        const matrix = new THREE.Matrix4();

        const pxGeometry = new THREE.PlaneGeometry(100, 100);
        pxGeometry.faces[0].vertexColors = [light, shadow, light];
        pxGeometry.faces[1].vertexColors = [shadow, shadow, light];
        pxGeometry.faceVertexUvs[0][0][0].y = 0.5;
        pxGeometry.faceVertexUvs[0][0][2].y = 0.5;
        pxGeometry.faceVertexUvs[0][1][2].y = 0.5;
        pxGeometry.rotateY(Math.PI / 2);
        pxGeometry.translate(50, 0, 0);

        const nxGeometry = new THREE.PlaneGeometry(100, 100);
        nxGeometry.faces[0].vertexColors = [light, shadow, light];
        nxGeometry.faces[1].vertexColors = [shadow, shadow, light];
        nxGeometry.faceVertexUvs[0][0][0].y = 0.5;
        nxGeometry.faceVertexUvs[0][0][2].y = 0.5;
        nxGeometry.faceVertexUvs[0][1][2].y = 0.5;
        nxGeometry.rotateY(-Math.PI / 2);
        nxGeometry.translate(-50, 0, 0);

        const pyGeometry = new THREE.PlaneGeometry(100, 100);
        pyGeometry.faces[0].vertexColors = [light, light, light];
        pyGeometry.faces[1].vertexColors = [light, light, light];
        pyGeometry.faceVertexUvs[0][0][1].y = 0.5;
        pyGeometry.faceVertexUvs[0][1][0].y = 0.5;
        pyGeometry.faceVertexUvs[0][1][1].y = 0.5;
        pyGeometry.rotateX(-Math.PI / 2);
        pyGeometry.translate(0, 50, 0);

        const py2Geometry = new THREE.PlaneGeometry(100, 100);
        py2Geometry.faces[0].vertexColors = [light, light, light];
        py2Geometry.faces[1].vertexColors = [light, light, light];
        py2Geometry.faceVertexUvs[0][0][1].y = 0.5;
        py2Geometry.faceVertexUvs[0][1][0].y = 0.5;
        py2Geometry.faceVertexUvs[0][1][1].y = 0.5;
        py2Geometry.rotateX(-Math.PI / 2);
        py2Geometry.rotateY(Math.PI / 2);
        py2Geometry.translate(0, 50, 0);

        const pzGeometry = new THREE.PlaneGeometry(100, 100);
        pzGeometry.faces[0].vertexColors = [light, shadow, light];
        pzGeometry.faces[1].vertexColors = [shadow, shadow, light];
        pzGeometry.faceVertexUvs[0][0][0].y = 0.5;
        pzGeometry.faceVertexUvs[0][0][2].y = 0.5;
        pzGeometry.faceVertexUvs[0][1][2].y = 0.5;
        pzGeometry.translate(0, 0, 50);

        const nzGeometry = new THREE.PlaneGeometry(100, 100);
        nzGeometry.faces[0].vertexColors = [light, shadow, light];
        nzGeometry.faces[1].vertexColors = [shadow, shadow, light];
        nzGeometry.faceVertexUvs[0][0][0].y = 0.5;
        nzGeometry.faceVertexUvs[0][0][2].y = 0.5;
        nzGeometry.faceVertexUvs[0][1][2].y = 0.5;
        nzGeometry.rotateY(Math.PI);
        nzGeometry.translate(0, 0, -50);

        const geometry = new THREE.Geometry();
        geometry.merge(py2Geometry);
        geometry.merge(pyGeometry);
        geometry.merge(pxGeometry);
        geometry.merge(nxGeometry);
        geometry.merge(pzGeometry);
        geometry.merge(nzGeometry);
        const cube = new THREE.Mesh(
            geometry,
            new THREE.MeshLambertMaterial({
                color: this.color,
                vertexColors: THREE.VertexColors
            })
        );
        cube.position.x = this.x;
        cube.position.y = this.y;
        cube.position.z = this.z;
        this.scene.add(cube);
    }
}
