import * as Node from '../nodes';

let id = 0;

const resolveConflicts = expr => {
  const rename = (node, from, to) => {
    if (node instanceof Node.Token && node.type === 'id' && node.text === from) {
      node.text = to;
    }
    if (node instanceof Node.Lambda) {
      rename(node.id, from, to);
      rename(node.expr, from, to);
    }
    if (node instanceof Node.Expr) {
      rename(node.first, from, to);
      rename(node.second, from, to);
    }
    return node;
  };

  const firstIds = {
    ...expr.first.ids(),
    [expr.first.id.text]: 'lambda',
  };
  const secondIds = {
    ...expr.second.ids(),
  };
  Object.keys(firstIds).forEach(k => {
    if (firstIds[k] === 'bound' && secondIds[k]) {
      rename(expr.first, k, `i${id}`);
      id++;
    } else if (secondIds[k] === 'bound' && firstIds[k].includes('bound')) {
      rename(expr.second, k, `i${id}`);
      id++;
    }
  });
};

export default resolveConflicts;
