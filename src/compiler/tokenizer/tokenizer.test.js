import tokenizer from './tokenizer';

describe.only('tokenizer', () => {
  it('Should return eof', () => {
    expect(tokenizer('').next()).toEqual({
      index: 0,
      text: '',
      type: 'eof',
    });
  });

  it('Should return tokens', () => {
    const input = '\\x.\\y.(x + y)';
    const stream = tokenizer(input);
    let token;
    let tokens = [];
    while ((token = stream.next())) {
      tokens.push(token);
    }
    expect(tokens).toEqual([
      { index: 0, text: '\\', type: 'lambda' },
      { index: 1, text: 'x', type: 'id' },
      { index: 2, text: '.', type: '.' },
      { index: 3, text: '\\', type: 'lambda' },
      { index: 4, text: 'y', type: 'id' },
      { index: 5, text: '.', type: '.' },
      { index: 6, text: '(', type: '(' },
      { index: 7, text: 'x', type: 'id' },
      { index: 9, text: '+', type: 'id' },
      { index: 11, text: 'y', type: 'id' },
      { index: 12, text: ')', type: ')' },
      { index: 13, text: '', type: 'eof' },
    ]);
  });
});
