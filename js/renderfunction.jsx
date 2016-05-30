import React from 'react';
import ReactDOM from 'react-dom';
import EvaluationApp from './components/EvaluationApp.jsx';

module.exports = () =>{
  ReactDOM.render(
    <EvaluationApp />,
    document.getElementById("app-container")
  );
};
