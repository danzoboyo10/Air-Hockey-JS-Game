const hockeyBoard = document.querySelector("#hockeyBoard");
const ctx = hockeyBoard.getContext("2d"); // Context what we draw on 

const boardBackground = "white"



const scoreBoard = document.querySelector("#scoreBoard");
const restartBtn = document.querySelector("#restartBtn");


const tableWidth = hockeyBoard.width;
const tableHeight = hockeyBoard.height;


const aPaddle1Color = "red";
const aPaddle2Color = "red";
const aPaddleBorder = "black";
const puckColor = "black";
const puckRadius = 9;
const aPaddleSpeed = 30; 
let intervalID;
let puckSpeed = 1; // lowest speed
let puckX = tableWidth / 2; // want the puck in the center
let puckBorderColor = "black";
let puckY = tableHeight / 2;
let puckXDirection = 0; // direction puck goes on x axis
let puckYDirection = 0; // direction puck goes on y axis

let player1 = "PLAYER1:"
let player2 = "PLAYER2:"
let player1Score = 0;
let player2Score = 0;

let aPaddle1 = {
  width: 10, 
  height: 30, 
  x:0, 
  y:0
} 
let aPaddle2 = {
  width: 10, 
  height: 30, 
  x: tableWidth - 10,
  y: tableHeight - 30
} 

window.addEventListener("keydown", changeDirection); // to listen to keydown events
restartBtn.addEventListener("click", restartGame);

startGame();

function startGame() {
  createPuck();
  nextTick();

}
function nextTick() {
  intervalID = setTimeout(() => {
    ctx.clearRect(0, 0,  tableWidth, tableHeight)
    clearTable();
    drawAPaddles();
    movePuck();
    drawPuck(puckX, puckY);
    checkCollision();
    nextTick();    
  }, 10)

}
function clearTable() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, tableWidth, tableHeight);
  ctx.beginPath();
  ctx.moveTo(225, 0);
  ctx.lineTo(225, 200);
  ctx.strokeStyle = "#00008B";
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(150, 0);
  ctx.lineTo(150, 40);
  ctx.strokeStyle = "#00008B";
  ctx.stroke();

  ctx.font = "10px serif";
  ctx.strokeStyle = "red";
  // ctx.strokeText("By Danny Slebodnick", 90, 140);
  ctx.beginPath();
  ctx.moveTo(75, 0);
  ctx.lineTo(75, 200);
  ctx.strokeStyle = "#00008B";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(150, 75, 35, 0, 2 * Math.PI);
  ctx.moveTo(0, 75);

  ctx.strokeStyle = "#00008B"
  ctx.stroke();

  ctx.beginPath()
  ctx.moveTo(150, 110)
  ctx.lineTo(150, 150)
  ctx.strokeStyle = "#00008B"
  ctx.stroke();

}
function drawAPaddles() {
  ctx.strokeStyle = aPaddleBorder;

  ctx.fillStyle = aPaddle1Color;
  ctx.fillRect(aPaddle1.x, aPaddle1.y, aPaddle1.width, aPaddle1.height); 
  ctx.strokeRect(aPaddle1.x, aPaddle1.y, aPaddle1.width, aPaddle1.height)

  ctx.fillStyle = aPaddle2Color;
  ctx.fillRect(aPaddle2.x, aPaddle2.y, aPaddle2.width, aPaddle2.height); 
  ctx.strokeRect(aPaddle2.x, aPaddle2.y, aPaddle2.width, aPaddle2.height)
  
}


function createPuck() {
  puckSpeed = 1;
  if(Math.round(Math.random()) == 1) {
    puckXDirection = 1;
  }
  else {
    puckXDirection = -1;
  }
  if(Math.round(Math.random()) == 1) {
    puckYDirection = 1;
  }
  else {
    puckYDirection = -1;
  }

  puckX = tableWidth / 2;
  puckY = tableHeight / 2;
  drawPuck(puckX, puckY);
}
function movePuck() {
  puckX += (puckSpeed * puckXDirection)
  puckY += (puckSpeed * puckYDirection)

}

function drawPuck(puckX, puckY) {
  ctx.fillStyle = puckColor;
  ctx.strokeStyle = puckBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(puckX, puckY, puckRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();

}
function checkCollision() {
  if(puckY <= 0 + puckRadius) {
    puckYDirection *= - 1;
  }
  if(puckY >= tableHeight - puckRadius) {
    puckYDirection *= -1;
  }
  if(puckX <= 0) {
    player2Score += 1;
    updateScoreBoard();
    createPuck();
    return
  }

  if(puckX >= tableWidth) {
    player1Score += 1;
    updateScoreBoard();
    createPuck();
    return
  }
  //bouncing off air hockey paddles
  if(puckX <= (aPaddle1.x + aPaddle1.width + puckRadius)) {
    if(puckY > aPaddle1.y && puckY < aPaddle1.y + aPaddle1.height) {
      puckX = (aPaddle1.x + aPaddle1.width + puckRadius) // if puck is stuck in corner
      puckXDirection *= -1;
      puckSpeed += 1;
    }
  }
  if(puckX >= (aPaddle2.x - puckRadius)) {
    if(puckY > aPaddle2.y && puckY < aPaddle2.y + aPaddle2.height) {
      puckX = aPaddle2.x - puckRadius // if puck is stuck
      puckXDirection *= -1;
      puckSpeed += 1;
    }

  }

}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const aPaddle1Up = 87;
  const aPaddle1Down = 83;
  const aPaddle2Up = 38;
  const aPaddle2Down = 40;

  switch(keyPressed) {
    case(aPaddle1Up):
      if(aPaddle1.y > 0) {
        aPaddle1.y -= aPaddleSpeed; 
      }
      break;
    case(aPaddle1Down):
      if(aPaddle1.y < tableHeight - aPaddle1.height) {
        aPaddle1.y += aPaddleSpeed; 
      }
      break;
    case(aPaddle2Up):
      if(aPaddle2.y > 0) {
        aPaddle2.y -= aPaddleSpeed; 
      }
      break;
    case(aPaddle2Down):
      if(aPaddle2.y < tableHeight - aPaddle2.height) {
        aPaddle2.y += aPaddleSpeed; 
      }
      break;

  }

};
function updateScoreBoard() {
  scoreBoard.textContent = `${player1}${player1Score}\n ${player2}${player2Score}`
}
function restartGame() {
  player1Score = 0;
  player2Score= 0;
  aPaddle1 = {
    width: 10, 
    height: 30, 
    x:0, 
    y:0
  }; 
  aPaddle2 = {
    width: 10, 
    height: 30, 
    x: tableWidth - 10,
    y: tableHeight - 30
    };
    puckSpeed = 1;
    puckX = 0; 
    puckY = 0;
    puckXDirection = 0;
    updateScoreBoard();
    clearInterval(intervalID);
    startGame();
};

console.log(restartGame)
















