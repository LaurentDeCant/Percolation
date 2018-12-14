class UnionFind {
    constructor(size) {
        this.items = new Array(size);
        for (let i = 0; i < this.items.length; i++) {
            this.items = i;
        }
    }

    find(x) {
        value = this.items[x];
        while (value != this.items[value])
            value = this.items[value];
        return value;
    }

    union(x, y) {

    }
}

export default UnionFind;
