import * as THREE from "three";

export default class Home {
    constructor(scene, size, x = 0, y = 0, z = 0, color, rotate = 0) {
        this.scene = scene;
        this.size = size;
        this.color = color;
        this.x = x;
        this.y = y;
        this.z = z;
        this.home = new THREE.Group();
        this.rotate = rotate;
    }
    load() {
        const cubeGeometry = new THREE.BoxGeometry(
            this.size,
            this.size,
            this.size
        );
        const cubeMaterial = new THREE.MeshPhongMaterial({
            color: this.color
        });
        const main = new THREE.Mesh(cubeGeometry, cubeMaterial);

        const tubeGeometry = new THREE.BoxGeometry(
            this.size / 8,
            this.size / 2,
            this.size / 8
        );
        const tubeMaterial = new THREE.MeshPhongMaterial({
            color: 0x777777
        });
        const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
        tube.position.x += this.size / 4;
        tube.position.y += this.size / 2 + this.size / 3;
        tube.position.z += this.size / 4;

        const roofGeometry = new THREE.ConeGeometry(
            this.size,
            this.size / 2,
            4
        );
        const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);

        roof.position.y += this.size / 2 + this.size / 4;
        roof.rotation.y = 45 * 0.0174533;

        const windowGeometry = new THREE.BoxGeometry(
            this.size / 3,
            this.size / 3,
            this.size / 6
        );
        const windowMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff
        });
        let homeWindow = new THREE.Mesh(windowGeometry, windowMaterial);
        const windowPosition = this.size / 2;
        const windowPositions = [
            windowPosition,
            -windowPosition,
            windowPosition,
            -windowPosition
        ];
        const windowRotations = [0, 0, 90 * 0.0174533, 90 * 0.0174533];
        for (let i = 0; i < 4; i++) {
            homeWindow = new THREE.Mesh(windowGeometry, windowMaterial);
            if (i < 2) {
                homeWindow.position.z = windowPositions[i];
            } else {
                homeWindow.position.x = windowPositions[i];
            }

            homeWindow.rotation.y = windowRotations[i];
            this.home.add(homeWindow);
        }

        this.home.position.x = this.x;
        this.home.position.y = this.y;
        this.home.position.z = this.z;

        this.home.add(main);

        this.home.add(roof);
        this.home.add(tube);
        this.scene.add(this.home);
    }
}
