// variables
const container = document.querySelector(".container");
const boxes = document.querySelectorAll(".btn");
const resetBtn = document.querySelector(".resetBtn");
const showMssg = document.querySelector(".mssg");
const showLine = document.querySelector(".line");
const turnIndicator= document.getElementById("turn-indicator");
// gameover
let gameOver = false;

// pattern

let winPattern = [
  // horizontal
  [0, 1, 2, 0, 45, 0, 100],
  [3, 4, 5, 0, 145, 0, 100],
  [6, 7, 8, 0, 245, 0, 100],

  // verticle
  [0, 3, 6, -100, 145, 90, 100],
  [1, 4, 7, 0, 145, 90, 100],
  [2, 5, 8, 100, 145, 90, 100],

  // cross
  [0, 4, 8, -45, 145, 45, 132],
  [2, 4, 6, -45, 145, -45, 132],
];

// set intial turn
let turnX = true;

// function for show turn

const turnIndicate=()=>{
    turnIndicator.innerText=turnX===false?"X":"O";
}

// function for changing turn
const changeTurn = (e) => {
  if (turnX) {
    e.innerText = "X";
    e.style.color = "red";
    turnX = false;
  } else {
    e.innerText = "O";
    e.style.color = "blue";
    turnX = true;
  }
  e.disabled = true;
};


// function checking winner
const checkWinner = () => {
  for (pattern of winPattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        if (pos1Val === "O") {
          showLine.style.backgroundColor = "blue";
          showLine.style.boxShadow = "0 0 4px blue";
        } else {
          showLine.style.backgroundColor = "red";
          showLine.style.boxShadow = "0 0 4px red";
        }

        showLine.style.display = "block";
        showLine.style.transform = `translate(${pattern[3]}px , ${pattern[4]}px ) rotate(${pattern[5]}deg)`;
        showLine.style.width = `${pattern[6]}%`;
        showMssg.classList.add("show-win");
        showMssg.innerHTML = `Congratulation <span> ${pos1Val} </span>`;
        boxes.forEach((e) => (e.disabled = true));
        gameOver = true;
        return;
      }
    }
  }
};

// check for draw

const checkDraw = () => {
  let allFiled = true;
  boxes.forEach((e) => {
    if (e.innerText === "") allFiled = false;
  });
  if (allFiled && gameOver == false) {
    showMssg.classList.add("show-draw");
    showMssg.innerHTML = `It's a <span> Draw </span>`;
    boxes.forEach((e) => (e.disabled = true));
  }
};

// function for applying
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    turnIndicate();
    changeTurn(box);
    checkWinner();
    checkDraw();
  });
});

// function for reset
const resetGame = () => {
turnIndicate();
  turnX = true;
  gameOver = false;
  boxes.forEach((e) => (e.disabled = false));
  boxes.forEach((e) => (e.innerText = ""));
  showMssg.classList.remove("show-win");
  showMssg.classList.remove("show-draw");
  showLine.style.display = "none";
};

resetBtn.addEventListener("click", resetGame);
