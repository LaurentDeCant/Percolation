import Percolator from './percolator';

const ROWS = 10;
const COLUMNS = 10;

new Percolator(
  document.getElementById('canvas'),
  ROWS,
  COLUMNS,
).render();
