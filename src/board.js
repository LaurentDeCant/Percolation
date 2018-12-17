import Sites, {
  CLOSED,
  OPEN,
  CONNECTED,
} from './sites';

const HEIGHT = 100;
const WIDTH = 100;

const CLOSED_COLOR = 'black';
const OPEN_COLOR = 'white';
const CONNECTED_COLOR = 'blue';

class Canvas {
  static getRow(y) {
    return parseInt(y / HEIGHT, 10);
  }

  static getColumn(x) {
    return parseInt(x / WIDTH, 10);
  }

  constructor(rows, columns) {
    this.sites = new Sites(rows, columns);
    this.canvas = document.getElementById('canvas');
    this.canvas.height = rows * HEIGHT + rows - 2;
    this.canvas.width = columns * WIDTH + columns - 2;
    this.canvas.addEventListener('click', event => this.handleOnClick(event));
  }

  handleOnClick(event) {
    const row = Canvas.getRow(event.offsetY);
    const column = Canvas.getColumn(event.offsetX);
    this.sites.open(row, column);
    this.render();
  }

  render() {
    const context = this.canvas.getContext('2d');
    for (let i = 0; i < this.sites.rows; i += 1) {
      for (let j = 0; j < this.sites.columns; j += 1) {
        const x = j * WIDTH + j;
        const y = i * HEIGHT + i;
        context.fillStyle = this.getColor(i, j);
        context.fillRect(x, y, WIDTH, HEIGHT);
      }
    }
  }

  getColor(row, column) {
    switch (this.sites.get(row, column)) {
      case CLOSED:
        return CLOSED_COLOR;
      case OPEN:
        return OPEN_COLOR;
      case CONNECTED:
        return CONNECTED_COLOR;
      default:
        return CLOSED_COLOR;
    }
  }
}

export default Canvas;
