import Node from './Node';
import Epsilon from './Epsilon';

export default class Group extends Node {
  constructor(lparen, expr, rparen) {
    super();
    this.lparen = lparen;
    this.expr = expr || new Epsilon();
    this.rparen = rparen;
  }

  toJSON() {
    return {
      name: 'Group',
      expr: this.expr.toJSON(),
    };
  }

  toString(format) {
    const expr = this.expr.toString(format);
    switch (format) {
      case '[]':
        return `[Group [(] ${expr} [)]]`;
      default:
        return `(${expr})`;
    }
  }

  ids() {
    return {
      ...this.expr.ids(),
    };
  }
}
