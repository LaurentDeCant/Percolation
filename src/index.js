import {
  COLUMNS,
  HEIGHT,
  ROWS,
  WIDTH
} from './constants';
import UnionFind from "./unionFind";

let sites, canvas;

initializeSites();
initializeCanvas();
render();

function initializeSites() {
  sites = new Array(ROWS);
  for (let i = 0; i < sites.length; i++) {
    sites[i] = new Array(COLUMNS);
    for (let j = 0; j < sites[i].length; j++) sites[i][j] = false;
  }
}

function initializeCanvas() {
  canvas = document.getElementById('canvas');
  canvas.height = ROWS * HEIGHT + ROWS - 2;
  canvas.width = COLUMNS * WIDTH + COLUMNS - 2;
  canvas.addEventListener('click', handleOnClick);
}

function handleOnClick(event) {
  let row = getRow(event.offsetY);
  let column = getColumn(event.offsetX);
  sites[row][column] = true;
  render();
}

function getRow(y) {
  return parseInt(y / HEIGHT);
}

function getColumn(x) {
  return parseInt(x / WIDTH);
}

function render() {
  let context = canvas.getContext('2d');
  for (let i = 0; i < sites.length; i++)
    for (let j = 0; j < sites[i].length; j++) {
      let x = j * WIDTH + j;
      let y = i * HEIGHT + i;
      context.fillStyle = sites[i][j] ? 'white' : 'black';
      context.fillRect(x, y, WIDTH, HEIGHT);
    }
}
