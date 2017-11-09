import * as THREE from "three";

const DEG_TO_RAD = 0.0174533;

export default class Tank {
    constructor(
        scene,
        x = 0,
        y = 0,
        z = 0,
        scale = 0.2,
        corpsParam = {
            size: {
                width: 200,
                height: 50,
                length: 600
            },
            type: 1,
            color: 0x53baed
        },
        towerParam = {
            size: {
                width: 250,
                height: 100,
                length: 350
            },
            type: 1,
            color: 0x53baed
        },
        gunParam = {
            size: {
                radius: 15,
                length: 300
            },
            type: 1,
            color: 0xaea19e
        },
        trackParam = {
            size: {
                width: 100,
                height: 100,
                length: 600
            },
            type: 1,
            color: 0x4a4246
        },
    ) {
        this.scene 	= scene;
        this.x 		= x;
        this.y 		= y + 50;
        this.z 		= z;
        this.scale 	= scale;

        this.corpsParam = corpsParam;
        this.towerParam = towerParam;
        this.gunParam 	= gunParam;
        this.trackParam = trackParam;

        this.corps 	= this.createGroup();
        this.tower 	= this.createGroup();
        this.gun 	= this.createGroup();
        this.track 	= this.createGroup();

        this.tank 	= this.createGroup();

        this.tankInfo = {
        	size: {
        		width: null,
        		height: null,
        		length: null
        	}
        };

        this.setScale();
        this.setTankInformation();
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

        this.tank.scale.x = this.scale;
        this.tank.scale.y = this.scale;
        this.tank.scale.z = this.scale;

        this.scene.add(this.tank);
    }
    createCorps() {
        let obj, corps = this.createGroup();

        switch (this.corpsParam.type) {
            case 1:
                //верхний слой крпуса
                obj = this.getObj(
                	this.getBoxGeometry(
                		this.corpsParam.size.width,
	                    this.corpsParam.size.height,
	                    this.corpsParam.size.length
                	),
                	this.getMeshPhongMaterial(
                		this.corpsParam.color
                	)
                );
                this.objSetPosition(obj, this.x, this.y, this.z);
                corps.add(obj);

                //нижний слой корпуса (центральная часть)
                obj = this.getObj(
                	this.getBoxGeometry(
                		this.corpsParam.size.width,
	                    this.corpsParam.size.height * 2,
	                    this.corpsParam.size.length / 2
                	),
                	this.getMeshPhongMaterial(
                		this.corpsParam.color
                	)
                );
                this.objSetPosition(
                    obj,
                    this.x,
                    this.y - (this.corpsParam.size.height / 2 + this.corpsParam.size.height),
                    this.z
                );
                corps.add(obj);

                //нижний слой корпуса (передняя скошенная часть)
                obj = this.getObj(
                	this.getBoxGeometry(
                		this.corpsParam.size.width,
	                    this.corpsParam.size.height * 2,
	                    this.corpsParam.size.length / 4
                	),
                	this.getMeshPhongMaterial(
                		this.corpsParam.color
                	)
                );
                this.objSetPosition(
                    obj,
                    this.x,
                    this.y - (this.corpsParam.size.height / 2 + this.corpsParam.size.height),
                    this.z + this.corpsParam.size.length / 4 + this.corpsParam.size.length / 8
                );
                corps.add(obj);

                //нижний слой корпуса (задняя скошенная часть)
                obj = this.getObj(
                	this.getBoxGeometry(
                		this.corpsParam.size.width,
	                    this.corpsParam.size.height * 2,
	                    this.corpsParam.size.length / 4
                	),
                	this.getMeshPhongMaterial(
                		this.corpsParam.color
                	)
                );
                this.objSetPosition(
                    obj,
                    this.x,
                    this.y - (this.corpsParam.size.height / 2 + this.corpsParam.size.height),
                    this.z - (this.corpsParam.size.length / 4 + this.corpsParam.size.length / 8)
                );
                corps.add(obj);

                //право крыло
                obj = this.getObj(
                	this.getBoxGeometry(
                		this.trackParam.size.width + this.trackParam.size.width / 4,
	                    this.corpsParam.size.height,
	                    this.corpsParam.size.length
                	),
                	this.getMeshPhongMaterial(
                		this.corpsParam.color
                	)
                );
                this.objSetPosition(
                    obj,
                    this.x + this.corpsParam.size.width / 2 + this.trackParam.size.width / 2,
                    this.y,
                    this.z
                );
                corps.add(obj);

                //левое крыло
                obj = this.getObj(
                	this.getBoxGeometry(
                		this.trackParam.size.width + this.trackParam.size.width / 4,
	                    this.corpsParam.size.height,
	                    this.corpsParam.size.length
                	),
                	this.getMeshPhongMaterial(
                		this.corpsParam.color
                	)
                );
                this.objSetPosition(
                    obj,
                    this.x - (this.corpsParam.size.width / 2 +this.trackParam.size.width / 2),
                    this.y,
                    this.z
                );
                corps.add(obj);
                break;

            default:
                corps = null;
                break;
        }

        return corps;
    }
    createTower() {
        let obj, tower = this.createGroup();

        switch (this.towerParam.type) {
            case 1:
                //вращательный элемент
                obj = this.getObj(
                	this.getCylinderGeometry(
            			this.corpsParam.size.width < this.corpsParam.size.length ? this.corpsParam.size.width / 2 : this.corpsParam.size.length / 2,
                    	this.corpsParam.size.width < this.corpsParam.size.length ? this.corpsParam.size.width / 2 : this.corpsParam.size.length / 2,
	                    this.towerParam.size.height / 4,
	                    32
                	),
                	this.getMeshPhongMaterial(
                		this.towerParam.color
                	)
                );
                this.objSetPosition(
                    obj,
                    this.x,
                    this.y + this.corpsParam.size.height / 2 + this.towerParam.size.height / 8,
                    this.z
                );
                tower.add(obj);

                //башня
                obj = this.getObj(
                	this.getBoxGeometry(
                		this.towerParam.size.width,
	                    this.towerParam.size.height,
	                    this.towerParam.size.length
                	),
                	this.getMeshPhongMaterial(
                		this.towerParam.color
                	)
                );
                this.objSetPosition(
                    obj,
                    this.x,
                    this.y + this.corpsParam.size.height / 2 + this.towerParam.size.height / 4 + this.towerParam.size.height / 2,
                    this.z
                );
                tower.add(obj);
                break;

            default:
                tower = null;
                break;
        }

        return tower;
    }
    createGun() {
        let obj, gun = this.createGroup();

        switch (this.gunParam.type) {
            case 1:
                //пушка
                obj = this.getObj(
                	this.getCylinderGeometry(
                		this.gunParam.size.radius,
	                    this.gunParam.size.radius,
	                    this.gunParam.size.length,
	                    32
                	),
                	this.getMeshPhongMaterial(
                		this.gunParam.color
                	)
                );
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
        let obj, track = this.createGroup();

        switch (this.trackParam.type) {
            case 1:
                //левая гусеница
                obj = this.getObj(
                	this.getBoxGeometry(
                		this.trackParam.size.width,
	                    this.trackParam.size.height,
	                    this.trackParam.size.length
                	),
                	this.getMeshPhongMaterial(
                		this.trackParam.color
                	)
                );
                this.objSetPosition(
                    obj,
                    this.x - (this.corpsParam.size.width / 2 + this.trackParam.size.width / 4 + this.trackParam.size.width / 2),
                    this.y - (this.corpsParam.size.height / 2 + this.corpsParam.size.height + this.corpsParam.size.height / 4),
                    this.z
                );
                track.add(obj);

                //правая гусеница
                obj = this.getObj(
                	this.getBoxGeometry(
                		this.trackParam.size.width,
	                    this.trackParam.size.height,
	                    this.trackParam.size.length
                	),
                	this.getMeshPhongMaterial(
                		this.trackParam.color
                	)
                );
                this.objSetPosition(
                    obj,
                    this.x + this.corpsParam.size.width / 2 + this.trackParam.size.width / 4 + this.trackParam.size.width / 2,
                    this.y - (this.corpsParam.size.height / 2 + this.corpsParam.size.height + this.corpsParam.size.height / 4),
                    this.z
                );
                track.add(obj);
                break;

            default:
                track = null;
                break;
        }

        return track;
    }
    setScale() {
    	this.corpsParam.size.width *= this.scale;
    	this.corpsParam.size.height *= this.scale;
    	this.corpsParam.size.length *= this.scale;

    	this.towerParam.size.width *= this.scale;
    	this.towerParam.size.height *= this.scale;
    	this.towerParam.size.length *= this.scale;

    	this.gunParam.size.radius *= this.scale;
    	this.gunParam.size.length *= this.scale;

    	this.trackParam.size.width *= this.scale;
    	this.trackParam.size.height *= this.scale;
    	this.trackParam.size.length *= this.scale;
    }
    createGroup() {
    	return new THREE.Group();
    }
    getObj(geometry, material) {
    	return new THREE.Mesh(geometry, material);
    }
    getBoxGeometry(widht, height, length) {
    	return new THREE.BoxGeometry(widht, height, length);
    }
    getCylinderGeometry(radiusTop, radiusBottom, height, roundness) {
    	return new THREE.CylinderGeometry(radiusTop, radiusBottom, height, roundness);
    }
    getMeshPhongMaterial(color) {
    	return new THREE.MeshPhongMaterial({
            color: color
        });
    }
    objSetPosition(obj, x, y, z) {
        obj.position.x = x;
        obj.position.y = y;
        obj.position.z = z;
    }
    setTankInformation() {
    	this.tankInfo.size.width = 1;
    	this.tankInfo.size.height = 1;
    	this.tankInfo.size.length = 1;
    }
    getTankInformation() {
    	return this.tankInfo;
    }
}