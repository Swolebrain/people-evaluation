import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import store from '../store.js';
import SCInput from './SCInput.jsx';

class EvaluationCreator extends Component{
  _createEval(){
    let scorecard = [];
    for (var k in this.inputs){
      var txtVal = this.inputs[k].input.value;
      if (txtVal.length > 0){
        scorecard.push({
          name: txtVal,
          score: 0,
          weight: 0
        });
      }
    }
    let name = this.name.value;
    const action = {
      type: "ADD_EVAL",
      sc:{ name, scorecard }
    };
    store.dispatch(action);
    this._reset();
  }
  _reset(){
    for (var k in this.inputs){
      this.inputs[k].input.value = "";
    }
    this.name.value = "";
  }
  componentWillMount(){
    this.inputs = {};
  }
  render(){
    var user = store.getState().user;
    var defaultValues = Array(6).fill("");
    var isNewHorizons = typeof user != 'undefined' && user.indexOf("nhflorida.com") > 0;
    if (isNewHorizons){
      defaultValues = [
        "Right seat?",
        "Right person?",
        "Right things?",
        "Right attitude?",
        "", ""
      ];
    }
    var inputs = Array(6).fill(1).map( (e,i) => i ).map( (elm,idx) => {
      return (
        <SCInput
          defaultValue={defaultValues[idx]}
          key={elm} k={elm} ref={ (ref) => this.inputs[idx] = ref }/>
      );
    } );
    return (
      <div className='add-panel'>
        <h1>Add Employee Evaluation</h1>
        <div>Employee Name: </div>
        <input type="text" className="block-input" id="new-name"
          ref={ (ref) => this.name = ref }/>
        <div>Employee Scorecard Items: </div>
        <div>
          {inputs}
        </div>
        <div className="btn" onClick={(this._createEval).bind(this)}>
          Create new Scorecard
        </div>
      </div>
    );
  }
}

export default EvaluationCreator;
