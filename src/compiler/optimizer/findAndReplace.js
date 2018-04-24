import * as Node from '../nodes';

const findAndReplace = (node, from, to) => {
  if (node === from) {
    return to;
  }

  if (node instanceof Node.Expr) {
    if (node.first === from) {
      return new Node.Expr(to, node.second).clone();
    }
    if (node.second === from) {
      return new Node.Expr(node.first, second).clone();
    }
    const first = findAndReplace(node.first, from, to);
    const second = findAndReplace(node.second, from, to);
    if (node.first !== first || node.second !== second) {
      return new Node.Expr(first, second).clone();
    }
  }

  if (node instanceof Node.Lambda) {
    if (node.expr === from) {
      const lambda = node.clone();
      lambda.expr = to;
      return lambda;
    }
    const expr = findAndReplace(node.expr, from, to);
    if (node.expr !== expr) {
      const lambda = node.clone();
      lambda.expr = expr;
      return lambda;
    }
  }
  return node;
};

export default findAndReplace;
