let lastPaintTime = 0;
let speed = 5;

let gameboardDiamension = document.getElementById("gameboard");
let gameboardStats= document.getElementById("gameStats");


let currentBall = {
  x: -10,
  y: 0,
  bounced: false,
  hit: false,
  delivered: false
};

let balls = [];

let bat = {
  x: 20,
  y: 0,
  instance : null
}

getBoard = () => {
  let board = document.getElementById("gameboard");
  board.innerHTML = "";
  return board;
};

paintWicket = (board) =>{
  var htmlElement = document.createElement("div");
  htmlElement.style.gridRowStart = 20;
  htmlElement.style.gridColumnStart = 0;
  htmlElement.style.gridColumnEnd = 0;
  htmlElement.classList.add("wicket");
  board.appendChild(htmlElement);
}

paintBat = (board, bat) =>{
  var htmlElement = document.createElement("div");
  htmlElement.id = 'bat';
  htmlElement.style.gridRowStart = bat.x;
  htmlElement.style.gridColumnStart = bat.y;
  htmlElement.style.gridColumnEnd = 0;
  htmlElement.classList.add("bat");
  bat.instance = htmlElement;
  board.appendChild(htmlElement);
}


paintBall = (board, currentBall) => {
  var htmlElement = document.createElement("div");
  htmlElement.style.gridRowStart = currentBall.x;
  htmlElement.style.gridColumnStart = currentBall.y;
  htmlElement.classList.add("ball");
  board.appendChild(htmlElement);
};

throwBall = (board) => {
  if (!currentBall.delivered) {
    if (!currentBall.bounced) {
      currentBall.y = currentBall.y - 1;
      currentBall.x = currentBall.x + 1;
    } else {
      currentBall.y = currentBall.y - 1;
      currentBall.x = currentBall.x - 1;
    }
    if (currentBall.x == -1) {
      currentBall.bounced = true
    }
    if (currentBall.x == -15) {
      currentBall.delivered = true
    }
    paintBall(board, currentBall);
  }

}

ballLengths = [-8, -9, -10, -11, -12, -13, -14, -15,-16];
getNextLength = () => {
  return ballLengths[Math.floor(Math.random() * ballLengths.length)];
};

nextDelivery = () => {
  balls.push(currentBall);
  let ballHeight = getNextLength();
  currentBall = {
    x: ballHeight,
    y: 0,
    bounced: false,
    hit: false,
    delivered: false
  }
  return currentBall;
}

hitDrive = () =>{  
  document.getElementById("bat").style.transform = "rotate(-100deg)";
}

hit = (board, bat, currentBall) => {
 // console.log(bat.x,bat.y, Math.abs(currentBall.x), Math.abs(currentBall.y))
}

updateStats = () =>{
  gameboardStats.innerHTML = 'Balls Delivered : '+balls.length;
}

refreshBoard = () => {
  if (currentBall.delivered) {
    nextDelivery();
    updateStats();
  }
  var board = getBoard();
  paintWicket(board);
  paintBat(board,bat);
  throwBall(board);
  hit(board,bat,currentBall);
};

renderGame = (curentTime) => {
  window.requestAnimationFrame(renderGame);
  if ((curentTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = curentTime;
  refreshBoard();
};

refreshBoard();

window.requestAnimationFrame(renderGame);


window.addEventListener("click", (e) => {
  hitDrive();
});


//for mobile
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches || // browser API
    evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
  hitDrive();
};
