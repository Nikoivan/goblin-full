export default class Statistic {
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
