import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import EvaluationPanel from './EvaluationPanel.jsx';
import store from '../store.js';
const PANELWIDTH = 370;
import {generateId} from '../auxfunctions.js';

class EvaluationList extends Component{
  constructor(props){
    super(props);
    this.state = {windowWidth: window.innerWidth};
  }
  _handleResize = (e) => {
    this.setState({windowWidth: window.innerWidth});
  }
  componentDidMount(){
    window.addEventListener("resize", this._handleResize);
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this._handleResize);
  }
  render(){
    var numSlots = store.getState().evals.length-1;
    if (numSlots === 0)
      var width = PANELWIDTH;
    else
      var width = (this.state.windowWidth-PANELWIDTH-30)/numSlots;
    var rot = parseInt(45*this.props.evals.length/5); //dampen rotation the fewer elements there are
    if (rot > 45) rot = 45;
    var evaluationPanels = this.props.evals.map(function(e, idx, arr){
      var left = Math.min(parseInt(width)*idx, PANELWIDTH*idx);
      var styleProp = {left: left,
                  zIndex: idx,
                  transform: `perspective(2000px) rotate3d(0,1,0,${rot}deg)`};
      return (
        <EvaluationPanel key={generateId(e.name)} name={e.name} index={idx} styleProp={styleProp}
          scorecard={e.scorecard} coreVals={e.coreVals} />
        );
    });
    return (
      <div className="evaluation-list-row">
        {evaluationPanels}
      </div>
    );
  }
}

export default EvaluationList;
