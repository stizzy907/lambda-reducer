import Node from './Node';

export default class Token extends Node {
  constructor(type, text, index) {
    super();
    this.type = type;
    this.text = text;
    this.index = index;
  }

  toJSON() {
    return {
      type: this.type,
      text: this.text,
      index: this.index,
    };
  }

  toString(format) {
    switch (format) {
      case '[]':
        return `[${this.text}]`;
      default:
        return this.text;
    }
  }

  ids() {
    return this.type === 'id' ? { [this.text]: 'unbound' } : undefined;
  }
}
