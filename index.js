let canvas = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    
    this.coinInterval = 0;
    this.game = setInterval(game, 20); // This runs the game function every 20ms (50fps)
  },
  stop : function() {
        clearInterval(this.game);
    }
}

let x = 50.0;
let y = 50.0;

let score = 0;

let coinX = 0.0;
let coinY = 0.0;

let xVel = 0.0;
let yVel = 0.0;

const playerColor = "rgb(118,150,86)";
const screenColor = "rgb(0,0,0)";
const coinColor = "rgb(221,175,12)";
const textColor = "rgba(255,255,255, 0.5)";

function game() {
    canvas.coinInterval++;

    x += xVel;
    y += yVel;

    if ((x + 100 > coinX && x < coinX + 20) && (y + 100 > coinY && y < coinY + 20)) {
        score++;
        canvas.coinInterval = 0;
        updateCoin();
    }

    if (canvas.coinInterval === 120) {
        canvas.coinInterval = 0;
        updateCoin();
    }

    if (x < 0.0) {
        x = 0.0;
    } else if (x > 700.0) {
        x = 700.0;
    }

    if (y < 0.0) {
        y = 0.0;
    } else if (y > 700.0) {
        y = 700.0;
    }

    let ctx = canvas.context;

    ctx.fillStyle = screenColor;
    ctx.fillRect(0, 0, 800, 800);

    ctx.fillStyle = playerColor;
    ctx.fillRect(x, y, 100, 100);

    ctx.fillStyle = coinColor;
    ctx.fillRect(coinX, coinY, 20, 20);

    ctx.font = "32px Arial";
    ctx.fillStyle = textColor;
    ctx.fillText("Score: " + score, 10, 30);
}

function updateCoin() {
    coinX = Math.floor((Math.random() * 780));
    coinY = Math.floor((Math.random() * 780));

    if ((x + 100 > coinX && x < coinX + 20) && (y + 100 > coinY && y < coinY + 20)) {
        updateCoin();
    }
}

window.addEventListener("keydown", function(event) {
    switch(event.code) {
        case "KeyS":
        case "ArrowDown":
            yVel = 10.0;
            break;
        case "KeyW":
        case "ArrowUp":
            yVel = -10.0;
            break;
        case "KeyA":
        case "ArrowLeft":
            xVel = -10.0;
            break;
        case "KeyD":
        case "ArrowRight":
            xVel = 10.0;
            break;
    }
}, true);

window.addEventListener("keyup", function(event) {
    switch(event.code) {
        case "KeyS":
        case "ArrowDown":
        case "KeyW":
        case "ArrowUp":
            yVel = 0.0;
            break;
        case "KeyA":
        case "ArrowLeft":
        case "KeyD":
        case "ArrowRight":
            xVel = 0.0;
            break;
    }
}, true);
