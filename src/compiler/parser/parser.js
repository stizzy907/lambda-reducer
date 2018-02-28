export default tokens => {
  let current = tokens.next();
  /*
    Main ::= ExprList 'eof'
    ExprList ::= Expr*
    Expr ::= 'id' | '(' ExprList ')' | Lambda
    Lambda ::= 'lambda' 'id' '.' ExprList
  */
};
