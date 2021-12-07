import {
  Application,
  Text,
  TextStyle,
  Sprite,
  Loader,
  Texture,
  TilingSprite,
} from "pixi.js";
import { Snake } from "./Snake";
import { Egg } from "./Egg";
import { Score } from "./Score";
let WIDTH: number = 1200;
let HEIGHT: number = 720;

const app = new Application({
  width: WIDTH,
  height: HEIGHT,
  antialias: true,
  resolution: 1,
});
document.body.appendChild(app.view);

const bgImg = Texture.from("./assets/images/bg.jpg");

const bgSprite = new TilingSprite(bgImg, app.screen.width, app.screen.height);
bgSprite.scale.set(2, 2);
app.stage.addChild(bgSprite);

const style = new TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fontStyle: "italic",
  fontWeight: "bold",
  fill: ["#ffffff", "#00ff99"], // gradient
  stroke: "#4a1850",
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: false,
  wordWrapWidth: 440,
  lineJoin: "round",
});
const score = new Score();
const richText = new Text(`Score ${Score.getScore()}`, style);
const startText = new Text(`Press Arrow Keys To Play`, style);
startText.x = 20;
startText.y = 20;
startText.name = "startText";
richText.x = app.screen.width - 200;
richText.y = 25;

app.stage.addChild(startText);
app.stage.addChild(richText);

let snake: any;
let food: any;
const size = 20;

function setup() {
  snake = new Snake(size, app.view.width, app.view.height);
  //   console.log(snake);
  app.stage.addChild(snake);

  food = new Egg(size, app.view.width, app.view.height);
  //   console.log(food);
  app.stage.addChild(food);

  snake.x = app.view.width / 2;
  snake.y = app.view.height / 2 - size;

  window.addEventListener("keydown", (e) => {
    if (app.stage.getChildByName("startText")) {
      app.stage.removeChild(startText);
    }
    switch (e.key) {
      case "ArrowUp":
        snake.currDirection = snake.directions.NORTH;
        break;
      case "ArrowDown":
        snake.currDirection = snake.directions.SOUTH;
        break;
      case "ArrowLeft":
        snake.currDirection = snake.directions.WEST;
        break;
      case "ArrowRight":
        snake.currDirection = snake.directions.EAST;
        break;

      default:
        break;
    }
  });

  gameLoop();
}

function gameLoop() {
  snake.move();

  if (
    snake.body[0].getGlobalPosition().x === food.position.x &&
    snake.body[0].getGlobalPosition().y === food.position.y
  ) {
    Score.updateScore(1);
    console.log(Score.getScore());

    snake.grow();
    food.generateNew();
  }

  setTimeout(gameLoop, 1000 / 15);
}

setup();

setInterval(() => {
  richText.text = `Score ${Score.getScore()}`;
}, 200);

window.addEventListener("resize", (e) => {
  app.screen.width = window.innerWidth - 100;
  app.screen.height = window.innerHeight - 100;
});
