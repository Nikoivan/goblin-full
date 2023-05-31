/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/gameController/gameController.js
class GameController {
  constructor(fieldType, enemyType, statType) {
    this.gameField = new fieldType(enemyType);
    this.statType = statType;
    this.onCellClick = this.onCellClick.bind(this);
    this.onStartGame = this.onStartGame.bind(this);
    this.startBtn = document.querySelector(".start-game");
    this.startBtn.addEventListener("click", this.onStartGame);
    this.gameField.field.addEventListener("click", e => this.onCellClick(e));
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
;// CONCATENATED MODULE: ./src/goblin/img/goblin.png
const goblin_namespaceObject = __webpack_require__.p + "2dbd01ce16c0fa83cb67.png";
;// CONCATENATED MODULE: ./src/goblin/goblin.js

class Goblin {
  constructor() {
    const goblin = document.createElement("img");
    goblin.classList.add("goblin");
    goblin.src = goblin_namespaceObject;
    this.element = goblin;
  }
  get goblin() {
    return this.element;
  }
  deleteGoblin() {
    this.element.remove();
  }
}
;// CONCATENATED MODULE: ./src/gameField/gameField.js
class GameField {
  constructor(enemy) {
    this.field = document.querySelector(".field");
    this.enemyType = enemy;
    this.positions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15];
    this.enemyPosition = null;
  }
  start() {
    this.intervalId = setInterval(() => {
      this.setGoblin();
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    if (this.goblin) {
      this.goblin.deleteGoblin();
    }
    this.goblin = null;
  }
  addGoblin(id) {
    this.goblin = new this.enemyType();
    const target = this.field.children[id];
    this.enemyPosition = id;
    target.append(this.goblin.goblin);
  }
  deleteGoblin() {
    this.goblin.deleteGoblin();
    this.goblin = null;
  }
  generateId() {
    let positions = this.positions.filter(el => el !== this.enemyPosition);
    return positions[Math.floor(Math.random() * positions.length)];
  }
  reAddGoblin(id) {
    const oldId = this.goblin.element.closest(".cell").dataset.id;
    const newCell = this.field.children[id];
    const a = newCell.querySelector("a");
    const newA = document.createElement("a");
    a.replaceWith(this.goblin.element);
    this.field.children[oldId].append(newA);
  }
  setGoblin() {
    const id = this.generateId();
    if (this.goblin) {
      this.reAddGoblin(id);
    } else {
      this.addGoblin(id);
    }
  }
}
/* harmony default export */ const gameField = (GameField);
;// CONCATENATED MODULE: ./src/statistic/statistic.js
class Statistic {
  constructor(blockName) {
    this.stat = blockName;
    this.hitsNumber = 0;
    this.missesNumber = 0;
    this.hits = this.stat.querySelector(".current-hits");
    this.misses = this.stat.querySelector(".current-misses");
  }
  addHit() {
    this.hitsNumber += 1;
    this.hits.textContent = this.hitsNumber;
  }
  addMiss() {
    this.missesNumber += 1;
    this.misses.textContent = this.missesNumber;
  }
  checkWin() {
    if (this.missesNumber === 5) {
      return "Game Over";
    } else if (this.hitsNumber === 10) {
      return "win";
    }
  }
  toStartSettings() {
    this.hitsNumber = 0;
    this.hits.textContent = 0;
    this.missesNumber = 0;
    this.misses.textContent = 0;
  }
}
;// CONCATENATED MODULE: ./src/js/app.js




const game = new GameController(gameField, Goblin, Statistic);
console.log(game);
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;