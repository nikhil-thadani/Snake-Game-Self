import { Container, Graphics, Point } from "pixi.js";
import { Score } from "./Score";

export class Rectangle extends Graphics {
  w;
  h;
  constructor(w: number, h: number, color = 0xf82929) {
    super();
    this.w = w;
    this.h = h;
    this.beginFill(color);
    this.drawRect(0, 0, this.w, this.h);
    this.endFill();
  }
}

export class Snake extends Container {
  size;
  boardH;
  boardW;
  head;
  body;
  vx;
  vy;
  directions;
  currDirection;
  lastBodyPart: any;
  constructor(size: number, boardW: any, boardH: any) {
    super();
    this.size = size;
    this.boardH = boardH;
    this.boardW = boardW;
    this.vx = 0;
    this.vy = 0;
    this.head = new Point(0, 0);
    this.body = this.children;
    this.directions = {
      NORTH: [0, -1],
      EAST: [1, 0],
      SOUTH: [0, 1],
      WEST: [-1, 0],
      STOP: [0, 0],
    };
    this.currDirection = this.directions.STOP;
    this.grow();
  }
  grow() {
    const cell = new Rectangle(this.size, this.size, 0xf00133);
    const added = this.addChild(cell);
    console.log(this.body);

    if (this.body.length > 1) {
      added.position.x = this.body[this.body.length - 2].x;
      added.position.y = this.body[this.body.length - 2].y;
    }
  }

  mod(a: any, n: any) {
    return a - n * Math.floor(a / n);
  }

  move() {
    // console.log(this.head.x);
    // console.log(this.head.y);

    this.head.x += this.currDirection[0] * this.size;
    this.head.y += this.currDirection[1] * this.size;

    this.head.x =
      this.mod(this.body[0].getGlobalPosition().x, this.boardW) -
      this.body[0].getGlobalPosition().x +
      this.head.x;
    this.head.y =
      this.mod(this.body[0].getGlobalPosition().y, this.boardH) -
      this.body[0].getGlobalPosition().y +
      this.head.y;
    const score = new Score();
    for (let i = 0; i < this.body.length - 1; i++) {
      if (i === 0) continue;
      if (this.head.x == this.body[i].x && this.head.y == this.body[i].y) {
        this.removeChildren(1);
        var res = confirm("You lost the game. Want to restart?");
        if (res == true) {
          this.head.x = 0;
          this.head.y = 0;
          Score.reset();
        } else {
          location.reload();
        }
      }
    }

    this.lastBodyPart = this.body[this.body.length - 1];
    this.lastBodyPart.position = this.head;
    // console.log(this.lastBodyPart);

    this.addChildAt(this.lastBodyPart, 0);
  }
}
