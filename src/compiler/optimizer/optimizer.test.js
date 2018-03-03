import optimizer from './optimizer';
import { compose } from '../compose';
import { parser } from '../parser';
import { tokenizer } from '../tokenizer';

const optimize = compose(optimizer, parser, tokenizer);

describe('optimizer', () => {
  it('should shrink', () => {
    const source = '(λx.x) (λy.y) (λy.y)0';
    const actual = optimize(source);
    expect(actual).toBe(undefined);
  });
});
