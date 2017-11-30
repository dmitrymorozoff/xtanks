import Game from "./app/index.js";
if (module && module.hot) {
    module.hot.accept();
}
const gameSettings = {
    camera: {
        x: -1000,
        y: 1300,
        z: 1500
    }
};

const game = new Game(gameSettings);
game.start();
