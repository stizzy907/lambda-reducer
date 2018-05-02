import * as Node from '../nodes';

export default tokens => {
  let current = tokens.next();
  /*
    Expr   ::= Token<id> Expr
            |= Lambda Expr
            |= Group Expr
            |= e
    Lambda ::= Token<lambda> Token<id> Token<dot> Expr
    Group  ::= Token<lparen> Expr Token<rparen>
  */

  const CompileError = message => {
    throw new Error(`CompileError@${current.index + 1}: ${message}`);
  };

  const terminal = type => {
    if (current.type !== type) CompileError(`Expected ${type}`);
    const node = new Node.Token(current.type, current.text, current.index);
    current = tokens.next();
    return node;
  };

  const Expr = () => {
    switch (current.type) {
      case 'id':
        return new Node.Expr(terminal('id'), Expr());
      case 'lambda':
        return new Node.Expr(Lambda(), Expr());
      case '(':
        return new Node.Expr(Group(), Expr());
    }
  };

  const Lambda = () => {
    return new Node.Lambda(terminal('lambda'), terminal('id'), terminal('.'), Expr());
  };

  const Group = () => {
    return new Node.Group(terminal('('), Expr(), terminal(')'));
  };

  const result = Expr() || new Node.Epsilon();

  current.type !== 'eof' && CompileError('Expected eof');

  return {
    steps: [{ description: 'Parse', tree: result }],
    tree: result,
  };
};
