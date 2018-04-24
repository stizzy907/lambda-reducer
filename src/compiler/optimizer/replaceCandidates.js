import * as Node from '../nodes';

const replaceCandidates = expr => {
  console.log('first', expr.first);
  console.log('second', expr.second);
  const firstIds = {
    ...expr.first.ids(),
  };
};

export default replaceCandidates;
