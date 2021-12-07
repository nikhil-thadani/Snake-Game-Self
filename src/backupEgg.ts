import { Rectangle } from "./Snake";

export class Egg extends Rectangle {
  size;
  boardW;
  boardH;
  constructor(size: number, boardW: number, boardH: number) {
    super(size, size, 0x4286f4);
    this.size = size;
    this.boardH = boardH;
    this.boardW = boardW;
    this.generateNew();
  }
  generateNew() {
    this.x = Math.floor((Math.random() * this.boardW) / this.size) * this.size;
    this.y = Math.floor((Math.random() * this.boardH) / this.size) * this.size;
  }
}
