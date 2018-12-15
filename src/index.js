import UnionFind from './unionFind';
import Renderer from './renderer';

const ROWS = 5;
const COLUMNS = 5;
const ROOT_INDEX = 0;

const CLOSED_SITE = 1;
const OPEN_SITE = 2;
const CONNECTED_SITE = 3;

const CLOSED_COLOR = 'black';
const OPEN_COLOR = 'white';
const CONNECTED_COLOR = 'blue';

function buildUnionFind() {
  const unionFind = new UnionFind(ROWS * COLUMNS + 1);
  for (let i = 0; i < COLUMNS; i += 1) {
    unionFind.union(ROOT_INDEX, i + 1);
  }
  return unionFind;
}

function buildSites() {
  const sites = new Array(ROWS);
  for (let i = 0; i < sites.length; i += 1) {
    sites[i] = new Array(COLUMNS);
    for (let j = 0; j < sites[i].length; j += 1) {
      sites[i][j] = CLOSED_SITE;
    }
  }
  return sites;
}

function mapIndices(row, column) {
  return row * COLUMNS + column + 1;
}

const unionFind = buildUnionFind();
const sites = buildSites();
const renderer = new Renderer(ROWS, COLUMNS);

renderer.onRender((row, column) => {
  switch (sites[row][column]) {
    case CLOSED_SITE:
      return CLOSED_COLOR;
    case OPEN_SITE:
      return OPEN_COLOR;
    case CONNECTED_SITE:
      return CONNECTED_COLOR;
    default:
      return CLOSED_COLOR;
  }
});

renderer.onClick((row, column) => {
  unionFind.union(ROOT_INDEX, mapIndices(row, column));
  sites[row][column] = OPEN_SITE;
});

renderer.render();
