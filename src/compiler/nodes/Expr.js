import Node from './Node';

export default class Expr extends Node {
  constructor(first, second) {
    super();
    this.first = first;
    this.second = second;
  }

  toJSON() {
    return {
      name: 'Expr',
      first: this.first.toJSON(),
      second: this.second.toJSON(),
    };
  }

  toString(format) {
    const f = this.first.toString(format);
    const s = this.second.toString(format);
    const expr = s ? `${f} ${s}` : f;

    switch (format) {
      case '[]':
        return `[Expr ${expr}]`;
      case '()':
        return s ? `(${expr})` : f;
      default:
        return expr;
    }
  }

  ids() {
    return {
      ...this.first.ids(),
      ...this.second.ids(),
    };
  }
}
