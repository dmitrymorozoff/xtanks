import * as THREE from "three";

export default class FriTree {
    constructor(scene, size, x = 0, y = 0, z = 0, color) {
        this.scene = scene;
        this.size = size;
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
        this.tree = new THREE.Group();
    }
    load() {
        const trunkMaterial = new THREE.MeshPhongMaterial({
            color: 0x555555
        });

        const trunkGeometry = new THREE.BoxGeometry(
            this.size / 4,
            this.size / 1.5,
            this.size / 4
        );
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.x = this.x;
        trunk.position.y = this.y - this.size / 4;
        trunk.position.z = this.z;

        const geometry = new THREE.ConeGeometry(this.size / 2, this.size, 150);
        const materialTop = new THREE.MeshPhongMaterial({ color: this.color });
        const materialBottom = new THREE.MeshPhongMaterial({ color: 0x222222 });

        const treeBottom = new THREE.Mesh(geometry, materialBottom);
        const treeCenter = new THREE.Mesh(geometry, materialTop);

        const size = this.size / 4;

        treeBottom.position.y += size * 2;
        treeCenter.position.y += size * 4;

        this.tree.add(treeBottom);
        this.tree.add(treeCenter);
        this.tree.add(trunk);

        this.tree.position.x = this.x;
        this.tree.position.y = this.y;
        this.tree.position.z = this.z;

        this.scene.add(this.tree);
    }
}
