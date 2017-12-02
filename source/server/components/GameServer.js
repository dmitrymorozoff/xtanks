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
    updateTanksPosition(newTankData) {
        this.tanks.forEach(tank => {
            if (tank.id === newTankData.id) {
                tank.x = newTankData.x;
                tank.y = newTankData.y;
                tank.z = newTankData.z;
                tank.angle = newTankData.angle;
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
