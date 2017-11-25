import * as THREE from "three";
import getRandomInt from "../../../utils/index.js"
import {TweenMax}from 'gsap';
import { DEG_TO_RAD } from "../../constants/index.js";

export default class RotationCube {
    constructor(scene, size, x = 0, y = 0, z = 0, colors) {
        this.scene = scene;
        this.size = size;
        this.colors = colors;
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotationCube = null;
    }
    get() {
        return this.rotationCube;
    }
    load() {
        const sizeBetweenParts = this.size / 6;
        const cubeGeometry = new THREE.BoxGeometry(
            this.size,
            this.size / 3 - sizeBetweenParts,
            this.size
        );
        const cubeMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.SmoothShading,
            vertexColors: THREE.VertexColors
        });
        let part = null;
        let mergedGeometry = new THREE.Geometry();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < cubeGeometry.faces.length; j++) {
                let face = cubeGeometry.faces[j];
                face.color.setHex(this.colors[i]);
            }
            part = new THREE.Mesh(cubeGeometry);
            part.position.y = i * this.size / 3 - sizeBetweenParts;
            part.updateMatrix();
            mergedGeometry.merge(part.geometry, part.matrix);
        }
        const rotationCube = new THREE.Mesh(mergedGeometry, cubeMaterial);
        this.rotationCube = rotationCube;
        this.rotationCube.position.set(
            this.x,
            this.y - sizeBetweenParts,
            this.z
        );
        this.scene.add(this.rotationCube);
    }
    move() {
        TweenMax.to(this.rotationCube.rotation, 3, {
            y: 360 * DEG_TO_RAD,
            repeat: -1,
            yoyo: true,
            ease: Back.easeInOut.config(1.7)
        });
    }
}
