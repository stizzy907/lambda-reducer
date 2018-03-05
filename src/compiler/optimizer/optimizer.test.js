import optimizer from './optimizer';
import { compose } from '../compose';
import { parser } from '../parser';
import { tokenizer } from '../tokenizer';

const optimize = compose(optimizer, parser, tokenizer);

describe('optimizer', () => {
  it('should shrink', () => {
    const source = '(λz.λy.z y x)(λy.λx.y x a)';
    const actual = optimize(source);
    expect(actual).toBe(undefined);
  });
});
