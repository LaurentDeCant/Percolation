import UnionFind from './unionFind';

describe('UnionFind', () => {
  describe('Find', () => {
    test('Returns the root of the node', () => {
      const unionFind = new UnionFind(1);

      expect(unionFind.find(0)).toBe(0);
    });
  });

  describe('Union', () => {
    test('Combines nodes into one tree', () => {
      const unionFind = new UnionFind(2);
      unionFind.union(0, 1);

      expect(unionFind.find(0)).toBe(0);
      expect(unionFind.find(1)).toBe(0);
    });

    test('Combines nodes into two trees', () => {
      const unionFind = new UnionFind(4);
      unionFind.union(0, 1);
      unionFind.union(2, 3);

      expect(unionFind.find(0)).toBe(0);
      expect(unionFind.find(1)).toBe(0);
      expect(unionFind.find(2)).toBe(2);
      expect(unionFind.find(3)).toBe(2);
    });

    test('Combines trees into one tree', () => {
      const unionFind = new UnionFind(4);
      unionFind.union(0, 1);
      unionFind.union(2, 3);
      unionFind.union(1, 3);

      expect(unionFind.find(0)).toBe(0);
      expect(unionFind.find(1)).toBe(0);
      expect(unionFind.find(2)).toBe(0);
      expect(unionFind.find(3)).toBe(0);
    });
  });
});
