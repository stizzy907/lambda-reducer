import * as Node from '../nodes';

const reduceLambda = candidate => {
  const { first, second } = candidate;
  const { id, expr } = first;

  let result = expr.clone();

  if (second instanceof Node.Expr) {
    return new Node.Expr(replace(result, id, second.first), second.second.clone());
  }

  return replace(result, id, second);
};

const replace = (expr, id, value) => {
  if (expr instanceof Node.Token) {
    return expr.text === id.text ? value.clone() : expr;
  }
  if (expr instanceof Node.Expr) {
    return new Node.Expr(replace(expr.first, id, value), replace(expr.second, id, value));
  }
  if (expr instanceof Node.Lambda) {
    return new Node.Lambda(expr.lambda.clone(), expr.id.clone(), expr.dot.clone(), replace(expr.expr, id, value));
  }
  return expr;
};

export default reduceLambda;
