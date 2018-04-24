const Node = (text, depth) => ({ text, depth, size: text.length, offset: 0, children: [] });
const Token = text => ({ text, type: '[]'.includes(text) ? text : 'id' });
const max = (a, b) => Math.max(a, b);
const sum = (a, b) => a + b;

const parser = source => {
  const tokens = source.match(/\[|\]|[^\s[\]]+/g).map(Token);
  let current;
  const next = () => (current = tokens.shift());
  next();

  const parseNode = depth => {
    if (current.type === 'id') {
      const node = Node(current.text, depth);
      next();
      return node;
    }
    if (current.type === '[') {
      next(); // [
      const node = Node(current.text, depth);
      next(); // id
      let child;
      while ((child = parseNode(depth + 1))) {
        if (!child.children.length) child.size = child.text.length;
        node.children.push(child);
      }
      node.size = max(node.size, node.children.map(n => n.size).reduce(sum, 0));
      next(); // ]
      return node;
    }
  };

  const distribute = node => {
    if (node.children.length) {
      const childSize = node.children.map(n => n.size).reduce(sum, 0);
      if (node.size > childSize) {
        const diff = (node.size - childSize) / node.children.length;
        node.children.forEach(n => (n.size += diff));
      }
      let offset = node.offset;
      for (let child of node.children) {
        child.offset += offset;
        offset += child.size;
        distribute(child);
      }
    }
    return node;
  };

  try {
    return distribute(parseNode(0, 0));
  } catch (e) {
    return Node(e, 0);
  }
};

export default parser;
