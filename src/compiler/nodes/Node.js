export default class Node {
  toJSON() {}

  toString() {
    return '';
  }

  ids() {}

  clone() {
    const node = new this.constructor();
    for (let k in this) {
      const v = this[k];
      node[k] = v instanceof Node ? v.clone() : v;
    }
    return node;
  }
}
