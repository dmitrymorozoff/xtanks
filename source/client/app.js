import Game from "./app/index";
// if (module && module.hot) {
//     module.hot.accept();
// }
const gameSettings = {
    camera: {
        x: 0,
        y: 100,
        z: 0,
    },
};

const game = new Game(gameSettings);
game.start();
