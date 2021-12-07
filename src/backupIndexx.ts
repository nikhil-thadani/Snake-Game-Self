import {
  Application,
  Container,
  Rectangle,
  Graphics,
  DisplayObject,
} from "pixi.js";
const app = new Application({
  width: 1300,
  height: 720,
});
document.body.appendChild(app.view);
let snakes = [
  { x: 30, y: 10, w: 20, h: 20 },
  { x: 20, y: 10, w: 20, h: 20 },
  { x: 10, y: 10, w: 20, h: 20 },
];
const container = new Container();
app.stage.addChild(container);

draw();
function draw() {
  snakes.forEach((snake) => {
    const rect = new Graphics();
    rect.beginFill(0x449955);
    rect.drawRect(snake.x, snake.y, snake.w, snake.h);
    rect.endFill();
    container.addChild(rect);
  });
}
function generateFood() {
  const snakeFood = new Graphics();
  snakeFood.beginFill(0x641f3d);
  snakeFood.drawRect(
    Math.floor(Math.random() + 20) * 10,
    Math.floor(Math.random() + 20) * 10,
    20,
    20
  );
  snakeFood.endFill();
  app.stage.addChild(snakeFood);
}
let snakeFood: Graphics;
generateFood();
let snakeHead = container.children[container.children.length - 1];
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
// app.ticker.add(() => {
//   moveSnake();
// });
function checkCollision(a: Graphics, b: Graphics) {
  var ab = a.getBounds();
  var bb = b.getBounds();
  return (
    ab.x + ab.width > bb.x &&
    ab.x < bb.x + bb.width &&
    ab.y + ab.height > bb.y &&
    ab.y < bb.y + bb.height
  );
}
setInterval(() => {
  moveSnake();
  console.log(container.x);
  if (checkCollision(snakeFood, snakeFood)) {
    alert(true);
  }
}, 50);
function moveSnake() {
  if (direction == "right") {
    var lastElm = container.children.pop(); // x:10, y: 10
    lastElm.x = container.children[0].x + 20;
    lastElm.y = container.children[0].y + 0;
    container.children.unshift(lastElm);
  } else if (direction == "left") {
    lastElm = container.children.pop();
    lastElm.x = container.children[0].x - 20;
    lastElm.y = container.children[0].y;
    container.children.unshift(lastElm);
  } else if (direction == "down") {
    lastElm = container.children.pop(); // x:10, y: 10
    lastElm.y = container.children[0].y + 20;
    lastElm.x = container.children[0].x;
    container.children.unshift(lastElm);
  } else if (direction == "up") {
    lastElm = container.children.pop(); // x:10, y: 10
    lastElm.y = container.children[0].y - 20;
    lastElm.x = container.children[0].x;
    container.children.unshift(lastElm);
  }
}
