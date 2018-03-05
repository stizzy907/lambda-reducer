import * as Node from '../nodes';
import shrink from './shrink';
import findCandidates from './findCandidates';
import resolveConflicts from './resolveConflicts';

const optimizer = tree => {
  const result = shrink(tree);
  const candidates = findCandidates(result);
  const candidate = candidates[0];
  resolveConflicts(candidate);
  console.log('resolved', candidate.toString());
};

export default optimizer;
