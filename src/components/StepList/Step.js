import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';

class Step extends Component {
  click = () => {
    const { onClick, step } = this.props;
    onClick(step);
  };

  render() {
    const { step, active } = this.props;
    return (
      <ListGroupItem action active={active} tag="button" onClick={this.click}>
        {step.description}
      </ListGroupItem>
    );
  }
}

export default Step;
