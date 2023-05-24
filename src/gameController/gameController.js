import GameField from "../gameField/gameField";
import Statistic from "../statistic/statistic";

export default class GameController {
  constructor() {
    this.gameField = new GameField();
    /// надо перенести под кнопку начать игру
    this.onCellClick = this.onCellClick.bind(this);
    this.onStartGame = this.onStartGame.bind(this);

    //this.gameField.start = this.gameField.start.bind(this.gameField);

    this.startBtn = document.querySelector(".start-game");

    this.startBtn.addEventListener("click", this.onStartGame);
    this.gameField.field.addEventListener("click", (e) => this.onCellClick(e));
  }

  onStartGame() {
    this.statistic = new Statistic();
    this.gameField.start();
  }

  onCellClick(e) {
    if (e.target.closest(".goblin")) {
      this.statistic.addHit();
    } else {
      this.statistic.addMiss();
    }

    const result = this.statistic.checkWin();
    if (result === "win") {
      this.stopGame();
      alert("Вы победили");
    } else if (result === "Game Over") {
      this.stopGame();
      alert(result);
    }
  }

  stopGame() {
    this.gameField.stop();
    this.statistic.toStartSettings();
  }
}