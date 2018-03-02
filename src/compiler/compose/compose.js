const compose = (...functions) => {
  const identity = v => v;
  return functions.reduce((a, f) => (...args) => a(f(...args)), identity);
};

export default compose;
