import React, { Component } from 'react';
import compile from '../../compiler';
import { SyntaxTree } from '../../components/SyntaxTree';

class App extends Component {
  state = { brackets: '', parens: '' };

  pushMe = () => {
    const lambda = this.text.value;
    const answer = compile(lambda);
    const brackets = answer.toString('[]');
    const parens = answer.toString('()');
    this.setState({ brackets });
    this.setState({ parens });
  };

  change = event => {
    const value = event.target.value.replace(/\\/g, 'λ');
    if (event.target.value !== value) event.target.value = value;
  };

  render() {
    const { brackets, parens } = this.state;

    return (
      <div>
        <div className="navbar navbar-dark bg-primary">
          <a className="navbar-brand" href="/">
            Lambda Reducer
          </a>
        </div>
        <div className="container">
          <form>
            <div className="form-group">
              <label className="col-sm-6 col-form-label" htmlFor="lambdaInput">
                Lambda Reducer:
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="lambdaInput"
                placeholder="Enter lambda expression"
                ref={instance => (this.text = instance)}
                onChange={this.change}
              />
              <small id="lambdaHelpBlock" class="form-text text-muted">
                Use either \ or λ for lambda. Example expression: (λx. \y. x + y)(9)(5)
              </small>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.pushMe}>
              Solve
            </button>
          </form>
          {brackets && (
            <div class="jumbotron jumbotron-fluid">
              <h1 class="display-5">Syntax Tree:</h1>
              <div class="lead">
                <SyntaxTree source={brackets} />
                <h1 class="display-5">Answer:</h1>
                <div>{parens}</div>
              </div>
            </div>
          )}
          <div />
        </div>
      </div>
    );
  }
}

export default App;
