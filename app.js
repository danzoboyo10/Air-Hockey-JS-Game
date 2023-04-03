const hockeyBoard = document.querySelector("#hockeyBoard");
const ctx = hockeyBoard.getContext("2d"); // Context what we draw on 
const scoreBoard = document.querySelector("#scoreBoard");
const restartBtn = document.querySelector("restartBtn");
const tableWidth = hockeyBoard.width;
const tableHeight = hockeyBoard.height;
const boardBackground = "white"




const aPaddle1Color = "red";
const aPaddle2Color = "red";
const aPaddleBorder = "black";
const puckColor = "black";
const aPaddle1Img = "https://www.avogameroom.com/resources/apps/cart/category/215__cat.jpg"
const puckRadius = 10;
const aPaddleSpeed = 30; 
let intervalID;
let puckSpeed = 1; // lowest speed
let puckX = tableWidth / 2; // want the puck in the center
let puckBorderColor = "black";
let puckY = tableHeight / 2;
let puckXDirection = 0; // direction puck goes on x axis
let puckYDirection = 0; // direction puck goes on y axis
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
// restartBtn.addEventListener("click", restartGame);

startGame();

function startGame() {
  createPuck();
  nextTick();





}
function nextTick() {
  intervalID = setTimeout(() => {
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
function checkCollision() {}

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



function UpdateScoreBoard() {}
function restartGame() {}

















