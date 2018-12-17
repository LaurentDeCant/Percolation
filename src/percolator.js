import Sites, {
  CLOSED,
  OPEN,
  CONNECTED,
  PERCOLATED,
} from './sites';

const HEIGHT = 50;
const WIDTH = 50;

const CLOSED_COLOR = 'black';
const OPEN_COLOR = 'white';
const CONNECTED_COLOR = 'red';
const PERCOLATED_COLOR = 'green';

class Percolator {
  static getRow(y) {
    return parseInt(y / HEIGHT, 10);
  }

  static getColumn(x) {
    return parseInt(x / WIDTH, 10);
  }

  constructor(canvas, rows, columns) {
    this.canvas = canvas;
    this.canvas.height = rows * HEIGHT + rows - 2;
    this.canvas.width = columns * WIDTH + columns - 2;
    this.canvas.addEventListener('click', event => this.handleOnClick(event));
    this.sites = new Sites(rows, columns);
  }

  handleOnClick(event) {
    const row = Percolator.getRow(event.offsetY);
    const column = Percolator.getColumn(event.offsetX);
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
      case PERCOLATED:
        return PERCOLATED_COLOR;
      default:
        return CLOSED_COLOR;
    }
  }
}

export default Percolator;
