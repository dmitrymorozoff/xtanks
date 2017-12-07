import config from "../config";
import { DEG_TO_RAD } from "../../client/app/constants/index";

export default class GameServer {
    constructor() {
        this.tanks = [];
    }
    addTank(tank) {
        this.tanks.push(tank);
    }
    removeTank(tankId) {
        this.tanks = this.tanks.filter(tank => {
            return tank.id != tankId;
        });
    }
    setMovement(data) {
        this.tanks.forEach(tank => {
            if (tank.id === data.id) {
                let angle =
                    Math.atan2(
                        data.mouse.y - tank.windowInfo.height / 2,
                        data.mouse.x - tank.windowInfo.width / 2
                    ) *
                    180 /
                    Math.PI;
                tank.towerAngle = -angle * DEG_TO_RAD;
                if (data.left) {
                    let newAngleLeft = config.TANK_INIT_SPEED * DEG_TO_RAD;
                    tank.angle += newAngleLeft;
                }
                if (data.right) {
                    let newAngleRight = config.TANK_INIT_SPEED * DEG_TO_RAD;
                    tank.angle -= newAngleRight;
                }
                if (data.top) {
                    tank.x += Math.sin(tank.angle) * config.TANK_INIT_SPEED;
                    tank.z += Math.cos(-tank.angle) * config.TANK_INIT_SPEED;
                }
                if (data.bottom) {
                    tank.x -= Math.sin(tank.angle) * config.TANK_INIT_SPEED;
                    tank.z -= Math.cos(-tank.angle) * config.TANK_INIT_SPEED;
                }
            }
        });
    }
    updateWindowInfo(data) {
        this.tanks.forEach(tank => {
            if (tank.id === data.id) {
                tank.windowInfo = {
                    ...data
                };
            }
        });
    }
    getData() {
        let gameData = {
            tanks: this.tanks
        };
        return gameData;
    }
}
