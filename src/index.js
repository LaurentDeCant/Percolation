import {
  COLUMNS,
  HEIGHT,
  ROWS,
  WIDTH,
} from './constants';

let sites;
let canvas;

function initializeSites() {
  sites = new Array(ROWS);
  for (let i = 0; i < sites.length; i += 1) {
    sites[i] = new Array(COLUMNS);
    for (let j = 0; j < sites[i].length; j += 1) {
      sites[i][j] = false;
    }
  }
}

function getRow(y) {
  return parseInt(y / HEIGHT, 10);
}

function getColumn(x) {
  return parseInt(x / WIDTH, 10);
}

function render() {
  const context = canvas.getContext('2d');
  for (let i = 0; i < sites.length; i += 1) {
    for (let j = 0; j < sites[i].length; j += 1) {
      const x = j * WIDTH + j;
      const y = i * HEIGHT + i;
      context.fillStyle = sites[i][j] ? 'white' : 'black';
      context.fillRect(x, y, WIDTH, HEIGHT);
    }
  }
}

function handleOnClick(event) {
  const row = getRow(event.offsetY);
  const column = getColumn(event.offsetX);
  sites[row][column] = true;
  render();
}

function initializeCanvas() {
  canvas = document.getElementById('canvas');
  canvas.height = ROWS * HEIGHT + ROWS - 2;
  canvas.width = COLUMNS * WIDTH + COLUMNS - 2;
  canvas.addEventListener('click', handleOnClick);
}

initializeSites();
initializeCanvas();
render();
