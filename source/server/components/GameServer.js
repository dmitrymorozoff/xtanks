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
}