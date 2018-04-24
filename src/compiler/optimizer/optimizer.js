import * as Node from '../nodes';
import shrink from './shrink';
import findCandidates from './findCandidates';
import resolveConflicts from './resolveConflicts';
import replaceCandidates from './replaceCandidates';

const optimizer = tree => {
  const result = shrink(tree);
  const candidates = findCandidates(result);
  const candidate = candidates[0];
  console.log(candidates);
  resolveConflicts(candidate);
  console.log('resolved', candidate.toString());
  replaceCandidates(candidate);
};

export default optimizer;
