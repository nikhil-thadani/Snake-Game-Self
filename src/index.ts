import {
  Application,
  Container,
  Rectangle,
  Graphics,
  DisplayObject,
} from "pixi.js";
const app = new Application({
  width: innerWidth,
  height: innerHeight,
});
document.body.appendChild(app.view);
let snakeFood: Graphics;
let snakes = [
  { x: 40, y: 10, w: 20, h: 20 },
  { x: 30, y: 10, w: 20, h: 20 },
  { x: 20, y: 10, w: 20, h: 20 },
  { x: 10, y: 10, w: 20, h: 20 },
];
const container = new Container();
app.stage.addChild(container);
draw();
function draw() {
  container.removeChildren();
  snakes.forEach((snake) => {
    const rect = new Graphics();
    rect.beginFill(0x44995 + Math.random() * 5);
    rect.drawRect(snake.x, snake.y, snake.w, snake.h);
    rect.endFill();
    container.addChild(rect);
  });
}
let snakeHead = snakes[0];
// updatePos();
// function updatePos() {}
let direction = "";
let isX = false;
let isY = false;
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      direction = "right";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
  }
});
function checkCollision(a: DisplayObject, b: any) {
  var ab = a.getBounds();
  var bb = b.getBounds();
  return (
    ab.x + ab.width > bb.x &&
    ab.x < bb.x + bb.width &&
    ab.y + ab.height > bb.y &&
    ab.y < bb.y + bb.height
  );
}
generateFood();
function generateFood() {
  app.stage.removeChild(snakeFood);
  snakeFood = new Graphics();
  snakeFood.beginFill(0x641f3d);
  snakeFood.drawRect(
    Math.floor(Math.random() * 10) * 100,
    Math.floor(Math.random() * 10) * 100,
    20,
    20
  );
  snakeFood.endFill();
  app.stage.addChild(snakeFood);
}
setInterval(() => {
  moveSnake();
  draw();
  snakeHead = snakes[0];
  if (
    checkCollision(container.children[container.children.length - 1], snakeFood)
  ) {
    if (direction == "up") {
      snakes.unshift({ x: snakes[0].x, y: snakes[0].y + 10, w: 20, h: 20 });
      console.log("Collided");
    } else if (direction == "right") {
      snakes.unshift({ x: snakes[0].x + 10, y: snakes[0].y, w: 20, h: 20 });
    } else if (direction == "up") {
      snakes.unshift({ x: snakes[0].x, y: snakes[0].y - 10, w: 20, h: 20 });
    } else if (direction == "left") {
      snakes.unshift({ x: snakes[0].x - 10, y: snakes[0].y, w: 20, h: 20 });
    }
    generateFood();
  }

  // console.log(container.x);
}, 100);
function moveSnake() {
  if (direction == "right") {
    const lastArrayElm = snakes.pop();
    lastArrayElm.x = snakes[0].x + (snakes.length - 1) * 10;
    lastArrayElm.y = snakes[0].y;
    snakes.unshift(lastArrayElm);
  } else if (direction == "left") {
    const lastArrayElm = snakes.pop();
    lastArrayElm.x = snakes[0].x - (snakes.length - 1) * 10;

    lastArrayElm.y = snakes[0].y;
    snakes.unshift(lastArrayElm);
  } else if (direction == "down") {
    const lastArrayElm = snakes.pop();
    lastArrayElm.x = snakes[0].x;
    lastArrayElm.y = snakes[0].y + (snakes.length - 1) * 10;

    snakes.unshift(lastArrayElm);
  } else if (direction == "up") {
    const lastArrayElm = snakes.pop();
    lastArrayElm.x = snakes[0].x;
    lastArrayElm.y = snakes[0].y - (snakes.length - 1) * 10;
    snakes.unshift(lastArrayElm);
  }
}
