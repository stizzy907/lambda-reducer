import * as Node from '../nodes';
import shrink from './shrink';

const optimizer = tree => {
  console.log(tree.toString('[]'));
  const result = shrink(tree);
  console.warn(result.toString('[]'));
};

export default optimizer;
