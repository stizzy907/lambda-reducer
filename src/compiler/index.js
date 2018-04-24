import { optimizer } from './optimizer';
import { compose } from './compose';
import { parser } from './parser';
import { tokenizer } from './tokenizer';

export default compose(optimizer, parser, tokenizer);
