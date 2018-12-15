import {
  COLUMNS,
  ROWS,
} from './constants';
import Renderer from './renderer';

function createSites() {
  const sites = new Array(ROWS);
  for (let i = 0; i < sites.length; i += 1) {
    sites[i] = new Array(COLUMNS);
    for (let j = 0; j < sites[i].length; j += 1) {
      sites[i][j] = false;
    }
  }
  return sites;
}

const sites = createSites();
const renderer = new Renderer(sites, ROWS, COLUMNS);
renderer.subscribe((row, column) => {
  sites[row][column] = true;
  renderer.render();
});
renderer.render();
