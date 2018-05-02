import parser from './parser';
import { tokenizer } from '../tokenizer';

describe('parser', () => {
  describe('valid', () => {
    ['', '((()))', 'λx.', '(λx.x y) (λy.y)'].forEach(source => {
      it(source, () => {
        const actual = parser(tokenizer(source));
        const expected = source;
        expect(actual.tree.toString()).toBe(expected);
      });
    });
  });

  describe('invalid', () => {
    it('((())', () => {
      const tryParse = () => parser(tokenizer('((())'));
      expect(tryParse).toThrow('CompileError@6: Expected )');
    });

    it('a.', () => {
      const tryParse = () => parser(tokenizer('a.'));
      expect(tryParse).toThrow('CompileError@2: Expected eof');
    });

    it('λa', () => {
      const tryParse = () => parser(tokenizer('λa'));
      expect(tryParse).toThrow('CompileError@3: Expected .');
    });

    it('λ.x', () => {
      const tryParse = () => parser(tokenizer('λ.x'));
      expect(tryParse).toThrow('CompileError@2: Expected id');
    });
  });
});
