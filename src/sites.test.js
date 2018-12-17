import Sites,
{
  CLOSED,
  OPEN,
  CONNECTED,
} from './sites';

describe('Sites', () => {
  describe('Constructor', () => {
    test('Initializes sites to be closed', () => {
      const sites = new Sites(2, 2);

      expect(sites.get(0, 0)).toBe(CLOSED);
      expect(sites.get(0, 1)).toBe(CLOSED);
      expect(sites.get(1, 0)).toBe(CLOSED);
      expect(sites.get(1, 1)).toBe(CLOSED);
    });
  });

  describe('Open', () => {
    test('Opens two sites', () => {
      const sites = new Sites(2, 2);
      sites.open(1, 0);
      sites.open(1, 1);

      expect(sites.get(0, 0)).toBe(CLOSED);
      expect(sites.get(0, 1)).toBe(CLOSED);
      expect(sites.get(1, 0)).toBe(OPEN);
      expect(sites.get(1, 1)).toBe(OPEN);
    });

    test('Opens and connect two sites', () => {
      const sites = new Sites(2, 2);
      sites.open(0, 0);
      sites.open(0, 1);

      expect(sites.get(0, 0)).toBe(CONNECTED);
      expect(sites.get(0, 1)).toBe(CONNECTED);
      expect(sites.get(1, 0)).toBe(CLOSED);
      expect(sites.get(1, 1)).toBe(CLOSED);
    });
  });
});
