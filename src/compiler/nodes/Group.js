import Node from './Node';

export default class Group extends Node {
  constructor(lparen, expr, rparen) {
    super();
    this.lparen = lparen;
    this.expr = expr;
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
      case '()':
        return `(${expr})`;
      default:
        return expr ? `(${expr})` : '';
    }
  }

  ids() {
    return {
      ...this.expr.ids(),
    };
  }
}
