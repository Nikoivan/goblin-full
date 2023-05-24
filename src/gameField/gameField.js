import Goblin from "../goblin/goblin";

class GameField {
  constructor() {
    this.field = document.querySelector(".field");
    this.goblin = null;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.setGoblin();
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);

    this.goblin.element.remove();
    this.goblin = null;
  }

  addGoblin(id) {
    this.goblin = new Goblin();
    const target = this.field.children[id];

    target.append(this.goblin.goblin);
  }

  generateId() {
    let positions = [];
    for (let i = 0; i < this.field.children.length; i += 1) {
      if (!this.field.children[i].querySelector(".goblin")) {
        positions.push(this.field.children[i].dataset.id);
      }
    }

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
