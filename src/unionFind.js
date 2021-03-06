class UnionFind {
  constructor(size) {
    this.items = new Array(size);
    this.sizes = new Array(size);
    for (let i = 0; i < this.items.length; i += 1) {
      this.items[i] = i;
      this.sizes[i] = 1;
    }
  }

  find(index) {
    let root = index;
    while (root !== this.items[root]) {
      root = this.items[root];
    }
    return root;
  }

  union(indexX, indexY) {
    const rootX = this.find(indexX);
    const rootY = this.find(indexY);
    if (this.items[rootX] !== this.items[rootY]) {
      if (this.sizes[rootX] < this.sizes[rootY]) {
        this.items[rootX] = rootY;
        this.sizes[rootY] += this.sizes[rootX];
      } else {
        this.items[rootY] = rootX;
        this.sizes[rootX] += this.sizes[rootY];
      }
    }
  }
}

export default UnionFind;
