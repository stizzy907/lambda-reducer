import React, { Component } from 'react';
import PropTypes from 'prop-types';

import parser from './parser';
import './styles.css';

const Line = props => <line {...props} />;
const Node = ({ text, className, ...props }) => (
  <svg {...props}>
    <text className={className} x="50%" y="50%">
      {text}
    </text>
  </svg>
);

class SyntaxTree extends Component {
  state = {};

  componentWillMount() {
    this.update();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.source !== this.props.source) {
      this.update();
    }
  }

  update() {
    const { source, textHeight, textAspectRatio, lineHeight } = this.props;
    const textWidth = textHeight * textAspectRatio;
    const rowHeight = textHeight + lineHeight;

    const tree = parser(source);

    const nodes = [];
    const lines = [];

    let maxDepth = 0;
    const recurse = node => {
      maxDepth = Math.max(maxDepth, node.depth);

      // nodes
      nodes.push({
        key: nodes.length,
        x: `${node.offset / tree.size * 100}%`,
        y: `${node.depth * rowHeight}`,
        width: `${node.size / tree.size * 100}%`,
        height: textHeight,
        text: node.text,
        className: node.children.length ? 'branch' : 'leaf',
      });

      for (let child of node.children) {
        // lines
        lines.push({
          key: lines.length,
          x1: `${(node.offset + node.size / 2) / tree.size * 100}%`,
          y1: node.depth * rowHeight + textHeight,
          x2: `${(child.offset + child.size / 2) / tree.size * 100}%`,
          y2: node.depth * rowHeight + rowHeight,
        });

        recurse(child);
      }
    };
    recurse(tree);

    const calculatedMaxWidth = tree.size * textWidth;
    const viewBox = `0 0 ${calculatedMaxWidth} ${maxDepth * rowHeight + textHeight}`;

    this.setState({ calculatedMaxWidth, lines, nodes, tree, viewBox });
  }

  render() {
    const { calculatedMaxWidth, lines, nodes, viewBox } = this.state;
    const { source, maxWidth: overrideMaxWidth, textHeight, textAspectRatio, lineHeight, ...props } = this.props;
    const maxWidth = overrideMaxWidth || calculatedMaxWidth;

    return (
      <svg className="SyntaxTree" viewBox={viewBox} style={{ maxWidth }} xmlns="http://www.w3.org/2000/svg" {...props}>
        {nodes.map(Node)}
        {lines.map(Line)}
      </svg>
    );
  }
}

SyntaxTree.propTypes = {
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  textHeight: PropTypes.number,
  textAspectRatio: PropTypes.number,
  lineHeight: PropTypes.number,
  source: PropTypes.string.isRequired,
};

SyntaxTree.defaultProps = {
  maxWidth: undefined,
  textHeight: 18,
  textAspectRatio: 0.66,
  lineHeight: 30,
};

export default SyntaxTree;
