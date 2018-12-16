import Sites, {
  CLOSED,
  OPEN,
  CONNECTED,
} from './sites';
import Canvas from './canvas';

const ROWS = 5;
const COLUMNS = 5;

const CLOSED_COLOR = 'black';
const OPEN_COLOR = 'white';
const CONNECTED_COLOR = 'blue';

const sites = new Sites(ROWS, COLUMNS);
const canvas = new Canvas(ROWS, COLUMNS);

canvas.onRender((row, column) => {
  switch (sites.getSite(row, column)) {
    case CLOSED:
      return CLOSED_COLOR;
    case OPEN:
      return OPEN_COLOR;
    case CONNECTED:
      return CONNECTED_COLOR;
    default:
      return CLOSED_COLOR;
  }
});

canvas.onClick((row, column) => {
  sites.open(row, column);
});

canvas.render();
