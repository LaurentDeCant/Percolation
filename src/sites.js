import UnionFind from './unionFind';

const ROOT_INDEX = 0;

export const CLOSED = 1;
export const OPEN = 2;
export const CONNECTED = 3;

class Sites {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.buildTable(rows, columns);
    this.buildUnionFind(rows, columns);
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

  buildUnionFind(rows, columns) {
    this.unionFind = new UnionFind(rows * columns + 1);
    for (let i = 0; i < columns; i += 1) {
      this.unionFind.union(ROOT_INDEX, i + 1);
    }
  }

  open(row, column) {
    this.table[row][column] = OPEN;
    this.getNeighbors(row, column)
      .filter(x => this.table[x.row][x.column] === OPEN)
      .forEach((x) => {
        const index = this.mapIndex(row, column);
        this.unionFind.union(index, this.mapIndex(x.row, x.column));
      });
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

  mapIndex(row, column) {
    return row * this.columns + column + 1;
  }

  getSite(row, column) {
    switch (this.table[row][column]) {
      case OPEN:
        return this.unionFind.find(ROOT_INDEX) === this.unionFind.find(this.mapIndex(row, column))
          ? CONNECTED
          : OPEN;
      case CLOSED:
      default:
        return CLOSED;
    }
  }
}

export default Sites;
