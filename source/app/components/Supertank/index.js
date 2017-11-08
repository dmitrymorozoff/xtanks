import * as THREE from "three";

const DEG_TO_RAD = 0.0174533;

export default class Tank {
    constructor(
		scene, x = 0, y = 0, z = 0, scale = 1,
		corpsParam = {
			size: {
				width: 200,
				height: 50,
				length: 600
			},
			type: 1,
			color: 0xff0000
		},
		towerParam = {
			size: {
				width: 250,
				height: 100,
				length: 350
			},
			type: 1,
			color: 0x00ff00
		},
		gunParam = {
			size: {
				radius: 15,
				length: 300
			},
			type: 1,
			color: 0x0000ff
		},
		trackParam = {
			size: {
				width: 100,
				height: 100,
				length: 600
			},
			type: 1,
			color: 0x000000
		},
	) {
        this.scene 	= scene;
        this.x 		= x;
        this.y 		= y + 800;
        this.z 		= z;
        this.scale 	= scale;

        this.corpsParam = corpsParam;
        this.towerParam = towerParam;
        this.gunParam 	= gunParam;
        this.trackParam = trackParam;

        this.corps 	= new THREE.Group();
        this.tower 	= new THREE.Group();
        this.gun 	= new THREE.Group();
        this.track 	= new THREE.Group();

        this.tank 	= new THREE.Group();
    }
    draw() {
    	this.corps = this.createCorps();
    	this.tower = this.createTower();
    	this.gun = this.createGun();
    	this.track = this.createTrack();

    	this.tank.add(this.corps);
    	this.tank.add(this.tower);
    	this.tank.add(this.gun);
    	this.tank.add(this.track);

        this.tank.position.x = this.x;
        this.tank.position.y = this.y;
        this.tank.position.z = this.z;

        this.scene.add(this.tank);
    }
    createCorps() {
    	let geometry,
    		material,
    		obj,
    		corps = new THREE.Group();

    	switch (this.corpsParam.type) {
    		case 1:
    			//верхний слой крпуса
    			geometry = new THREE.BoxGeometry(
		            this.corpsParam.size.width,
		            this.corpsParam.size.height,
		            this.corpsParam.size.length
		        );
		        material = new THREE.MeshPhongMaterial({
		            color: this.corpsParam.color
		        });
		        obj = new THREE.Mesh(geometry, material);
		        this.objSetPosition(
		        	obj,
		        	this.x,
		        	this.y,
		        	this.z
		        )
		        corps.add(obj);

		        //нижний слой корпуса (центральная часть)
		        geometry = new THREE.BoxGeometry(
		            this.corpsParam.size.width,
		            this.corpsParam.size.height * 2,
		            this.corpsParam.size.length / 2
		        );
		        material = new THREE.MeshPhongMaterial({
		            color: this.corpsParam.color
		        });
		        obj = new THREE.Mesh(geometry, material);
		        this.objSetPosition(
		        	obj,
		        	this.x,
		        	this.y - (this.corpsParam.size.height / 2 + this.corpsParam.size.height),
		        	this.z
		        )
		        corps.add(obj);

		        //нижний слой корпуса (передняя скошенная часть)
				geometry = new THREE.BoxGeometry(
		            this.corpsParam.size.width,
		            this.corpsParam.size.height * 2,
		            this.corpsParam.size.length / 4
		        );
		        material = new THREE.MeshPhongMaterial({
		            color: this.corpsParam.color
		        });
		        obj = new THREE.Mesh(geometry, material);
		        this.objSetPosition(
		        	obj,
		        	this.x,
		        	this.y - (this.corpsParam.size.height / 2 + this.corpsParam.size.height),
		        	this.z + this.corpsParam.size.length / 4 +  this.corpsParam.size.length / 8
		        )
		        corps.add(obj);

				//нижний слой корпуса (задняя скошенная часть)
				geometry = new THREE.BoxGeometry(
		            this.corpsParam.size.width,
		            this.corpsParam.size.height * 2,
		            this.corpsParam.size.length / 4
		        );
		        material = new THREE.MeshPhongMaterial({
		            color: this.corpsParam.color
		        });
		        obj = new THREE.Mesh(geometry, material);
		        this.objSetPosition(
		        	obj,
		        	this.x,
		        	this.y - (this.corpsParam.size.height / 2 + this.corpsParam.size.height),
		        	this.z - (this.corpsParam.size.length / 4 +  this.corpsParam.size.length / 8)
		        )
		        corps.add(obj);

				//право крыло
				geometry = new THREE.BoxGeometry(
		            this.trackParam.size.width + this.trackParam.size.width / 4,
		            this.corpsParam.size.height,
		            this.corpsParam.size.length
		        );
		        material = new THREE.MeshPhongMaterial({
		            color: this.corpsParam.color
		        });
		        obj = new THREE.Mesh(geometry, material);
		        this.objSetPosition(
		        	obj,
		        	this.x + this.corpsParam.size.width / 2 + this.trackParam.size.width / 2,
		        	this.y,
		        	this.z
		        )
		        corps.add(obj);

				//левое крыло
				geometry = new THREE.BoxGeometry(
		            this.trackParam.size.width + this.trackParam.size.width / 4,
		            this.corpsParam.size.height,
		            this.corpsParam.size.length
		        );
		        material = new THREE.MeshPhongMaterial({
		            color: this.corpsParam.color
		        });
		        obj = new THREE.Mesh(geometry, material);
		        this.objSetPosition(
		        	obj,
		        	this.x - (this.corpsParam.size.width / 2 + this.trackParam.size.width / 2),
		        	this.y,
		        	this.z
		        )
		        corps.add(obj);
    			break

    		default:
    			corps = null;
    			break;
    	}
        
        return corps;
    }
    createTower() {
    	let geometry,
    		material,
    		obj,
    		tower = new THREE.Group();

    	switch (this.towerParam.type) {
    		case 1:
    			//вращательный элемент
    			geometry = new THREE.CylinderGeometry( 
		        	this.corpsParam.size.width < this.corpsParam.size.length ? this.corpsParam.size.width / 2 : this.corpsParam.size.length / 2,
		        	this.corpsParam.size.width < this.corpsParam.size.length ? this.corpsParam.size.width / 2 : this.corpsParam.size.length / 2,
		        	this.towerParam.size.height / 4,
		        	32
		        );
		        material = new THREE.MeshPhongMaterial({
		            color: this.towerParam.color
		        });
		        obj = new THREE.Mesh(geometry, material);
		        this.objSetPosition(
		        	obj,
		        	this.x,
		        	this.y + this.corpsParam.size.height / 2 + this.towerParam.size.height / 8,
		        	this.z
		        );
		        tower.add(obj);

		        //башня
		        geometry = new THREE.BoxGeometry(
		            this.towerParam.size.width,
		            this.towerParam.size.height,
		            this.towerParam.size.length
		        );
		        material = new THREE.MeshPhongMaterial({
		            color: this.towerParam.color
		        });
		        obj = new THREE.Mesh(geometry, material);
		        this.objSetPosition(
		        	obj,
		        	this.x,
		        	this.y + this.corpsParam.size.height / 2 + this.towerParam.size.height / 4 + this.towerParam.size.height / 2,
		        	this.z
		        )
		        tower.add(obj);
    			break;

    		default: 
    			tower = null;
    			break;
    	}

        return tower;
    }
    createGun() {
    	let geometry,
    		material,
    		obj,
    		gun = new THREE.Group();

    	switch (this.gunParam.type) {
    		case 1:
    			//пушка
    			geometry = new THREE.CylinderGeometry( 
		        	this.gunParam.size.radius,
		        	this.gunParam.size.radius,
		        	this.gunParam.size.length,
		        	32
		        );
		        material = new THREE.MeshPhongMaterial({
		            color: this.gunParam.color
		        });
		        obj = new THREE.Mesh(geometry, material);
		        this.objSetPosition(
		        	obj,
		        	this.x,
		        	this.y + this.corpsParam.size.height / 2 + this.towerParam.size.height / 4 + this.towerParam.size.height / 2,
		        	this.z - (this.towerParam.size.length / 2 + this.gunParam.size.length / 2)
		        );
		        obj.rotateX(90 * DEG_TO_RAD);
		        gun.add(obj);
    			break;

    		default:
    			gun = null;
    			break;
    	}

        return gun;
    }
    createTrack() {
    	let geometry,
    		material,
    		obj,
    		track = new THREE.Group();

    	switch (this.trackParam.type) {
    		case 1:
    			//левая гусеница
		        geometry = new THREE.BoxGeometry(
		            this.trackParam.size.width,
		            this.trackParam.size.height,
		            this.trackParam.size.length
		        );
		        material = new THREE.MeshPhongMaterial({
		            color: this.trackParam.color
		        });
		        obj = new THREE.Mesh(geometry, material);
		        this.objSetPosition(
		        	obj,
		        	this.x - (this.corpsParam.size.width / 2 + this.trackParam.size.width / 4 + this.trackParam.size.width / 2),
		        	this.y - (this.corpsParam.size.height / 2 + this.corpsParam.size.height + this.corpsParam.size.height / 4),
		        	this.z
		        )
		        track.add(obj);

		        //правая гусеница
		        geometry = new THREE.BoxGeometry(
		            this.trackParam.size.width,
		            this.trackParam.size.height,
		            this.trackParam.size.length
		        );
		        material = new THREE.MeshPhongMaterial({
		            color: this.trackParam.color
		        });
		        obj = new THREE.Mesh(geometry, material);
		        this.objSetPosition(
		        	obj,
		        	this.x + this.corpsParam.size.width / 2 + this.trackParam.size.width / 4 + this.trackParam.size.width / 2,
		        	this.y - (this.corpsParam.size.height / 2 + this.corpsParam.size.height + this.corpsParam.size.height / 4),
		        	this.z
		        )
		        track.add(obj);
    			break;

    		default:
    			track = null;
    			break;
    	}

        return track;
    }
    objSetPosition(obj, x, y, z){
    	obj.position.x = x;
    	obj.position.y = y;
    	obj.position.z = z;
    }
}