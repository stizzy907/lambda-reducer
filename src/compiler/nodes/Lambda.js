import Node from './Node';

export default class lambda extends Node {
  constructor(lambda, id, dot, expr) {
    super();
    this.lambda = lambda;
    this.id = id;
    this.dot = dot;
    this.expr = expr;
  }

  toJSON() {
    return {
      name: 'Lambda',
      id: this.id.toJSON(),
      expr: this.expr.toJSON(),
    };
  }

  toString(format) {
    const expr = this.expr.toString(format);
    const id = this.id.toString(format);
    switch (format) {
      case '[]':
        return `[Lambda [λ] ${id} [.] ${expr}]`;
      default:
        return `(λ${id}.${expr})`;
    }
  }

  ids() {
    return {
      ...this.expr.ids(),
      [this.id.text]: 'bound',
    };
  }
}
