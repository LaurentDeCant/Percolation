import {
  HEIGHT,
  WIDTH,
} from './constants';

class Renderer {
  static getRow(y) {
    return parseInt(y / HEIGHT, 10);
  }

  static getColumn(x) {
    return parseInt(x / WIDTH, 10);
  }

  constructor(sites, rows, columns) {
    this.sites = sites;
    this.canvas = document.getElementById('canvas');
    this.canvas.height = rows * HEIGHT + rows - 2;
    this.canvas.width = columns * WIDTH + columns - 2;
    this.canvas.addEventListener('click', event => this.handleOnClick(event));
    this.listener = undefined;
  }

  handleOnClick(event) {
    const row = Renderer.getRow(event.offsetY);
    const column = Renderer.getColumn(event.offsetX);
    this.listener(row, column);
  }

  subscribe(listener) {
    this.listener = listener;
  }

  render() {
    const context = this.canvas.getContext('2d');
    for (let i = 0; i < this.sites.length; i += 1) {
      for (let j = 0; j < this.sites[i].length; j += 1) {
        const x = j * WIDTH + j;
        const y = i * HEIGHT + i;
        context.fillStyle = this.sites[i][j] ? 'white' : 'black';
        context.fillRect(x, y, WIDTH, HEIGHT);
      }
    }
  }
}

export default Renderer;
