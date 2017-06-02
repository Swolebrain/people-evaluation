import React, {Component} from 'react';
import EvaluationApp from './EvaluationApp.jsx';

class LoginComponent extends Component{
  render(){
    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <button onClick={this.props.show}>login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
