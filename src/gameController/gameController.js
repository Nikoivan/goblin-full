export default class GameController {
  constructor(fieldType, enemyType, statType) {
    this.gameField = new fieldType(enemyType);
    this.statType = statType;

    this.onCellClick = this.onCellClick.bind(this);
    this.onStartGame = this.onStartGame.bind(this);

    this.startBtn = document.querySelector(".start-game");

    this.startBtn.addEventListener("click", this.onStartGame);
    this.gameField.field.addEventListener("click", (e) => this.onCellClick(e));
  }

  onStartGame() {
    this.startGameState = true;
    this.statistic = new this.statType(document.querySelector(".statistic"));
    this.gameField.start(this.enemy);
  }

  onCellClick(e) {
    if (this.startGameState) {
      if (e.target.closest(".goblin")) {
        this.gameField.deleteGoblin(e.target.closest(".cell").dataset.id);
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
  }

  stopGame() {
    this.gameField.stop();
    this.statistic.toStartSettings();
    this.startGameState = false;
  }
}
