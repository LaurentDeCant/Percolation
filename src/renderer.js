export const HEIGHT = 100;
export const WIDTH = 100;

class Renderer {
  static getRow(y) {
    return parseInt(y / HEIGHT, 10);
  }

  static getColumn(x) {
    return parseInt(x / WIDTH, 10);
  }

  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.canvas = document.getElementById('canvas');
    this.canvas.height = rows * HEIGHT + rows - 2;
    this.canvas.width = columns * WIDTH + columns - 2;
    this.canvas.addEventListener('click', event => this.handleOnClick(event));
  }

  handleOnClick(event) {
    const row = Renderer.getRow(event.offsetY);
    const column = Renderer.getColumn(event.offsetX);
    this.clickListener(row, column);
    this.render();
  }

  onClick(listener) {
    this.clickListener = listener;
  }

  render() {
    const context = this.canvas.getContext('2d');
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.columns; j += 1) {
        const x = j * WIDTH + j;
        const y = i * HEIGHT + i;
        context.fillStyle = this.renderListener(i, j);
        context.fillRect(x, y, WIDTH, HEIGHT);
      }
    }
  }

  onRender(listener) {
    this.renderListener = listener;
  }
}

export default Renderer;
