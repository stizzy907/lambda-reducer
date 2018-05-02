import * as Node from '../nodes';
import shrink from './shrink';
import findCandidates from './findCandidates';
import resolveConflicts from './resolveConflicts';
import reduceLambda from './reduceLambda';
import findAndReplace from './findAndReplace';

const optimizer = ({ steps: originalSteps, tree: originalTree }) => {
  const steps = [...originalSteps];
  let tree = originalTree;

  const MAX_ATTEMPTS = 10;
  // It is pretty easy to cause infinite loops, or trees to grow indefinitely
  // Abort after 10 attempts
  let attempt = 0;
  while (++attempt <= MAX_ATTEMPTS) {
    const result = shrink(tree);
    const candidates = findCandidates(result);
    // Naive approach, only trying first candidate
    const candidate = candidates[0];
    // No candidates, we are done
    if (!candidate) break;
    resolveConflicts(candidate);
    const reduced = reduceLambda(candidate);
    tree = findAndReplace(tree, candidate, reduced);
    steps.push({ description: 'Optimize', tree });
  }

  return { steps, tree };
};

export default optimizer;
