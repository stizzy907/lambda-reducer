import * as Node from '../nodes';
import shrink from './shrink';
import findCandidates from './findCandidates';

const optimizer = tree => {
  const result = shrink(tree);
  const candidates = findCandidates(result);
  candidates.forEach(c => console.log('candidates', c.toString('[]')));
};

export default optimizer;
