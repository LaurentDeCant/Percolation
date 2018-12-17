import UnionFind from './unionFind';

const ROOT_INDEX = 0;

export const CLOSED = 1;
export const OPEN = 2;
export const CONNECTED = 3;
export const PERCOLATED = 4;

class Sites {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.buildTable(rows, columns);
    this.buildUnionFinds(rows, columns);
  }

  buildTable(rows, columns) {
    this.table = new Array(rows);
    for (let i = 0; i < this.table.length; i += 1) {
      this.table[i] = new Array(columns);
      for (let j = 0; j < this.table[i].length; j += 1) {
        this.table[i][j] = CLOSED;
      }
    }
  }

  buildUnionFinds(rows, columns) {
    this.topUnionFind = new UnionFind(rows * columns + 1);
    for (let i = 1; i <= columns; i += 1) {
      this.topUnionFind.union(ROOT_INDEX, i);
    }
    this.bottomUnionFind = new UnionFind(rows * columns + 1);
    for (let i = rows * columns; i > rows * columns - columns; i -= 1) {
      this.bottomUnionFind.union(ROOT_INDEX, i);
    }
  }

  rows() {
    return this.rows;
  }

  columns() {
    return this.columns;
  }

  open(row, column) {
    this.table[row][column] = OPEN;
    this.getNeighbors(row, column)
      .filter(x => this.table[x.row][x.column] === OPEN)
      .forEach((x) => {
        const index = this.map(row, column);
        this.topUnionFind.union(index, this.map(x.row, x.column));
        this.bottomUnionFind.union(index, this.map(x.row, x.column));
      });
    return this.percolated(row, column);
  }

  getNeighbors(row, column) {
    return [{
      row: row - 1,
      column,
    }, {
      row,
      column: column + 1,
    }, {
      row: row + 1,
      column,
    }, {
      row,
      column: column - 1,
    }].filter(x => x.row >= 0 && x.row < this.rows
      && x.column >= 0 && x.column < this.columns);
  }

  map(row, column) {
    return row * this.columns + column + 1;
  }

  percolated(row, column) {
    return this.topUnionFind.find(ROOT_INDEX) === this.topUnionFind.find(this.map(row, column))
      && this.bottomUnionFind.find(ROOT_INDEX) === this.bottomUnionFind.find(this.map(row, column));
  }

  get(row, column) {
    switch (this.table[row][column]) {
      case OPEN:
        if (this.topUnionFind.find(ROOT_INDEX) === this.topUnionFind.find(this.map(row, column))) {
          if (this.bottomUnionFind.find(ROOT_INDEX) === this.bottomUnionFind.find(this.map(row, column))) {
            return PERCOLATED;
          }
          return CONNECTED;
        }
        return OPEN;
      case CLOSED:
      default:
        return CLOSED;
    }
  }
}

export default Sites;
