import * as Node from '../nodes';

const findCandidates = rootNode => {
  const nodes = [];
  const recurse = node => {
    if (node instanceof Node.Lambda) {
      recurse(node.expr);
    }
    if (node instanceof Node.Expr) {
      if (node.first instanceof Node.Lambda && !(node.second instanceof Node.Epsilon)) {
        nodes.push(node);
      }
      recurse(node.first);
      recurse(node.second);
    }
  };
  recurse(rootNode);
  return nodes;
};

export default findCandidates;
