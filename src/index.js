import "./styles.css";

const ROWS = 5;
const COLUMNS = 5;
const WIDTH = 100;
const HEIGHT = 100;

let table, canvas;

initializeTable();
initializeCanvas();
render();

function initializeTable() {
  table = new Array(ROWS);
  for (let i = 0; i < table.length; i++) {
    table[i] = new Array(COLUMNS);
    for (let j = 0; j < table[i].length; j++) table[i][j] = false;
  }
}

function initializeCanvas() {
  canvas = document.getElementById("canvas");
  canvas.height = ROWS * HEIGHT + ROWS - 2;
  canvas.width = COLUMNS * WIDTH + COLUMNS - 2;
  canvas.addEventListener("click", event => {
    let i = getRow(event.offsetY);
    let j = getColumn(event.offsetX);
    table[i][j] = !table[i][j];
    render();
  });
}

function getRow(y) {
  return parseInt(y / HEIGHT);
}

function getColumn(x) {
  return parseInt(x / WIDTH);
}

function render() {
  let context = canvas.getContext("2d");
  for (let i = 0; i < table.length; i++)
    for (let j = 0; j < table[i].length; j++) {
      let x = j * WIDTH + j;
      let y = i * HEIGHT + i;
      context.fillStyle = table[i][j] ? "white" : "black";
      context.fillRect(x, y, WIDTH, HEIGHT);
    }
}
