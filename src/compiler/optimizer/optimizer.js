import * as Node from '../nodes';

const shrink = node => {
  if (node instanceof Node.Group) {
    return shrink(node.expr);
  }
  if (node instanceof Node.Expr) {
    node.first = shrink(node.first);
    node.second = shrink(node.second);
    if (node.second instanceof Node.Epsilon) {
      return node.first;
    }
    console.log(node);
  }
  if (node instanceof Node.Lambda) {
    node.expr = shrink(node.expr);
  }
  return node;
};

const optimizer = tree => {
  console.log(tree.toString('[]'));
  const result = shrink(tree);
  console.warn(result.toString('[]'));
};

export default optimizer;
