import imgUrl from "./img/goblin.png";

export default class Goblin {
  constructor() {
    const goblin = document.createElement("img");
    goblin.classList.add("goblin");
    goblin.src = imgUrl;
    this.element = goblin;
  }

  get goblin() {
    return this.element;
  }

  deleteGoblin() {
    this.element.remove();
  }
}
