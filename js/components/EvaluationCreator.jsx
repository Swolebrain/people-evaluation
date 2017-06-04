import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import store from '../store.js';
import SCInput from './SCInput.jsx';

class EvaluationCreator extends Component{
  _createEval = ()=>{
    let scorecard = [
      {name: "Right person?", score: 0, weight: 0.125},
      {name: "Right seat?", score: 0, weight: 0.125},
      {name: "Right things?", score: 0, weight: 0.125},
      {name: "Right attitude?", score: 0, weight: 0.125},
      {name: "Attracts new talent", score: 0, weight: 0.0833333333333333333},
      {name: "Grows and develops team through coaching", score: 0, weight: 0.0833333333333333333},
      {name: "Holds individuals accountable", score: 0, weight: 0.0833333333333333333},
      {name: "Inspire and motivate", score: 0, weight: 0.0833333333333333333},
      {name: "Ability to build trust", score: 0, weight: 0.0833333333333333333},
      {name: "Effective communication, clear, timely good listener", score: 0, weight: 0.0833333333333333333},
    ];
    let name = this.name.value;
    const action = {
      type: "ADD_EVAL",
      sc:{ name, scorecard }
    };
    store.dispatch(action);
    this._reset();
  }
  _reset=()=>{
    for (var k in this.inputs){
      this.inputs[k].input.value = "";
    }
    this.name.value = "";
  }
  componentWillMount = ()=>{
    this.inputs = {};
  }
  render(){
    // var inputs = Array(6).fill(1).map( (e,i) => i ).map( (elm,idx) => {
    //   return (
    //     <SCInput key={elm} k={elm} ref={ (ref) => this.inputs[idx] = ref }/>
    //   );
    // } );
    return (
      <div className='add-panel'>
        <h1>Add Employee Evaluation</h1>
        <div>Employee Name: </div>
        <input type="text" className="block-input" id="new-name" ref={ (ref) => this.name = ref }/>
        <div>Employee Scorecard Items: </div>

        <div className="btn" onClick={this._createEval}>
          Create new Scorecard
        </div>
      </div>
    );
  }
}

export default EvaluationCreator;
