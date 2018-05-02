import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import compile from '../../compiler';
import { SyntaxTree } from '../../components/SyntaxTree';
import { StepList } from '../../components/StepList';

class App extends Component {
  state = { steps: [], step: undefined, answer: '' };

  solve = event => {
    event.preventDefault();
    try {
      const lambda = this.text.value;
      const { steps, tree } = compile(lambda);
      const step = steps[steps.length - 1];
      const answer = tree.toString('()');
      this.setState({ steps, step, answer, error: undefined });
    } catch (error) {
      this.setState({ error });
    }
  };

  change = event => {
    const value = event.target.value.replace(/\\/g, 'λ');
    if (event.target.value !== value) event.target.value = value;
  };

  stepChange = step => {
    this.setState({ step });
  };

  render() {
    const { error, steps, step, answer } = this.state;

    return (
      <div>
        <div className="navbar navbar-dark bg-primary">
          <a className="navbar-brand" href="/">
            Lambda Reducer
          </a>
        </div>
        <div className="container">
          <form onSubmit={this.solve}>
            <div className="form-group mt-3">
              <label htmlFor="lambdaInput">Lambda Expression:</label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="lambdaInput"
                placeholder="Enter lambda expression"
                ref={instance => (this.text = instance)}
                onChange={this.change}
              />
              <small id="lambdaHelpBlock" className="form-text text-muted">
                Use either \ or λ for lambda. Example expression: (λx. \y. x + y)(9)(5)
              </small>
            </div>
            <button type="submit" className="btn btn-primary">
              Solve
            </button>
          </form>
          {error && (
            <Card color="danger" outline className="my-3">
              <CardHeader className="bg-danger">Error!</CardHeader>
              <CardBody>{error.message}</CardBody>
            </Card>
          )}
          {!error &&
            answer && (
              <Fragment>
                <Card color="success" outline className="my-3">
                  <CardHeader className="bg-success">Answer</CardHeader>
                  <CardBody>
                    <div>{answer}</div>
                  </CardBody>
                </Card>
                <Card color="info" outline className="my-3">
                  <CardHeader className="bg-info">Syntax Tree</CardHeader>
                  <CardBody>
                    <div className="d-flex">
                      <div>
                        <StepList steps={steps} onChange={this.stepChange} />
                      </div>
                      <div className="flex-grow-1 mx-3">{step && <SyntaxTree source={step.tree.toString('[]')} />}</div>
                    </div>
                  </CardBody>
                </Card>
              </Fragment>
            )}
          <div />
        </div>
      </div>
    );
  }
}

export default App;
