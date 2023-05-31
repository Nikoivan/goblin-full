import GameController from "../gameController/gameController";
import Goblin from "../goblin/goblin";
import GameField from "../gameField/gameField";
import Statistic from "../statistic/statistic";

const game = new GameController(GameField, Goblin, Statistic);

console.log(game);
