import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';

import Step from './Step';

class StepList extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.steps !== prevState.steps) {
      return {
        ...prevState,
        steps: nextProps.steps,
        activeIndex: nextProps.steps.length - 1,
      };
    }
    return null;
  }

  state = { activeIndex: 0 };

  click = step => {
    const { steps, onChange } = this.props;
    this.setState({ activeIndex: Math.max(0, steps.indexOf(step)) });
    onChange(step);
  };

  render() {
    const { steps } = this.props;
    const { activeIndex } = this.state;
    console.log('activeIndex', activeIndex);

    return (
      <ListGroup>
        {steps.map((step, i) => <Step key={i} active={activeIndex === i} step={step} onClick={this.click} />)}
      </ListGroup>
    );
  }
}

export default StepList;
