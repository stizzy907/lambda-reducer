import compose from './compose';

describe('compose', () => {
  it('should handle 0 functions', () => {
    const c = compose();
    expect(c(123)).toBe(123);
  });

  it('should handle 1 function', () => {
    const c = compose(n => n * 2);
    expect(c(123)).toBe(246);
  });

  it('should handle multiple functions', () => {
    const c = compose(
      s => `a${s}b`,
      s =>
        s
          .split('')
          .reverse()
          .join(''),
      n => n.toString(),
      n => n * 2,
    );
    expect(c(123)).toBe('a642b');
  });
});
