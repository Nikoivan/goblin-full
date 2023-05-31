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
    let positions = this.positions.filter((el) => el !== this.enemyPosition);
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

export default GameField;
