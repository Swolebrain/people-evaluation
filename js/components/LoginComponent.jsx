import EvaluationApp from './EvaluationApp.jsx';
import React from 'react';

const LoginComponent = React.createClass({
  render: function(){
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
});

export default LoginComponent;
