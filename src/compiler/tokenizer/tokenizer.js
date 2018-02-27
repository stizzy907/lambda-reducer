function* tokenize(input) {
  /*
    1:lambda (\\)
    2:dot    (\.)
    3:oparen (\()
    4:cparen (\))
    5:id     ([^\\\.\(\)\s]+)
  */

  const regex = /(\\)|(\.)|(\()|(\))|([^\\\.\(\)\s]+)/g;
  let match;

  // Will return null once no more matches are found
  while ((match = regex.exec(input))) {
    // destructure match object. Each new varialbe will have a value or be undefined which is falsy
    const [text, lambda, dot, oparen, cparen, id] = match;
    yield {
      text,
      index: match.index,
      type: lambda ? 'lambda' : dot ? '.' : oparen ? '(' : cparen ? ')' : id ? 'id' : undefined,
    };
  }
  yield {
    index: input.length,
    text: '',
    type: 'eof',
  };
}

// A generator returns an interator with just a next method. You must ask the next object if it is done.
// Gets around having to ask if the result is done, instead of asking the iterator if it is done.
export default input => {
  const tokens = tokenize(input);
  const next = () => {
    const result = tokens.next();
    return !result.done ? result.value : undefined;
  };
  return { next };
};
