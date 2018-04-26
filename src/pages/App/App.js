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
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={this.pushMe}>
              Push Me
            </button>
          </form>
          {brackets && <SyntaxTree source={brackets} />}
          <div>{parens}</div>
          <div />
        </div>
      </div>
    );
  }
}

export default App;
