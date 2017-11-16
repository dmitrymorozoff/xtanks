import * as THREE from "three";
import getRandomInt from "../../../utils/index.js";

export default class Pyramid {
    constructor(scene, size, x = 0, y = 0, z = 0, colors) {
        this.scene = scene;
        this.size = size;
        this.x = x;
        this.y = y;
        this.z = z;
        this.colors = colors;
        this.pyramid = new THREE.Group();
        this.pyramidTop = null;
    }
    load() {
        const pyramidBottomMaterial = new THREE.MeshPhongMaterial({
            color: 0x222222
        });
        const pyramidTopMaterial = new THREE.MeshBasicMaterial({
            color: this.colors[getRandomInt(0, this.colors.length)]
        });

        const pyramidGeometry = new THREE.BoxGeometry(
            this.size / 2,
            this.size / 2,
            this.size / 2
        );
        const pyramidGeometryTop = new THREE.BoxGeometry(
            this.size / 6,
            this.size / 6,
            this.size / 6
        );

        const pyramidBottom = new THREE.Mesh(
            pyramidGeometry,
            pyramidBottomMaterial
        );
        pyramidBottom.position.y -= this.size / 4;

        this.pyramidTop = new THREE.Mesh(
            pyramidGeometryTop,
            pyramidTopMaterial
        );

        this.pyramidTop.position.y = this.size - this.size / 2;
        this.pyramidTop.rotation.x = 180 * 0.0174533;

        this.pyramid.add(pyramidBottom);
        this.pyramid.add(this.pyramidTop);

        this.pyramid.position.x = this.x;
        this.pyramid.position.y = this.y;
        this.pyramid.position.z = this.z;

        this.scene.add(this.pyramid);
    }
    move() {
        TweenMax.to(this.pyramidTop.rotation, 50, {
            y: 180,
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut
        });
    }
}
