import shrink from './shrink';
import findCandidates from './findCandidates';
import resolveConflicts from './resolveConflicts';
import reduceLambda from './reduceLambda';
import findAndReplace from './findAndReplace';

const createAddStep = steps => next => {
  const prev = steps[steps.length - 1];
  if (prev.tree.toString('[]') !== next.tree.toString('[]')) steps.push(next);
};

const optimizer = ({ tree: originalTree, steps: originalSteps }) => {
  let tree = originalTree;
  const steps = [...originalSteps];
  const addStep = createAddStep(steps);

  resolveConflicts.reset();

  const MAX_ATTEMPTS = 100;
  // It is pretty easy to cause infinite loops, or trees to grow indefinitely
  // Abort after MAX_ATTEMPTS
  let attempt = 0;
  while (++attempt <= MAX_ATTEMPTS) {
    const result = shrink(tree);
    addStep({ description: 'Shrink', tree: result.clone() });
    const candidates = findCandidates(result);
    // Naive approach, only trying first candidate
    const candidate = candidates[0];
    // No candidates, we are done
    if (!candidate) break;
    resolveConflicts(candidate);
    addStep({ description: 'Rename', tree: tree.clone() });
    const reduced = reduceLambda(candidate);
    tree = findAndReplace(tree, candidate, reduced);
    addStep({ description: 'Reduce', tree: tree.clone() });
  }

  return { steps, tree };
};

export default optimizer;
