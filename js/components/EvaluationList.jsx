import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import EvaluationPanel from './EvaluationPanel.jsx';
import store from '../store.js';
const PANELWIDTH = 370;
import generateId from '../auxfunctions.js';

class EvaluationList extends Component{
  constructor(props){
    super(props);
    this.state = {windowWidth: window.innerWidth};
  }
  componentDidMount(){
    window.addEventListener("resize", (e) => this.setState({windowWidth: window.innerWidth}));
  }
  render(){
    var user = store.getState().user;
    var isNewHorizons = typeof user != 'undefined' && user.indexOf("nhflorida.com") > 0;
    console.log(isNewHorizons);
    var numSlots = this.props.evals.length-1;
    if (numSlots === 0)
      var width = PANELWIDTH;
    else
      var width = (this.state.windowWidth-PANELWIDTH-30)/numSlots;
    var rot = parseInt(45*this.props.evals.length/5); //dampen rotation the fewer elements there are
    var evaluationPanels = this.props.evals.map(function(e, idx, arr){
      var left = Math.min(parseInt(width)*idx, PANELWIDTH*idx);
      var styleProp = {left: left,
                  zIndex: idx,
                  transform: `perspective(2000px) rotate3d(0,1,0,${rot}deg)`};
      return (
        <EvaluationPanel
          key={generateId(e.name)}
          user={user}
          name={e.name} index={idx} styleProp={styleProp}
          scorecard={e.scorecard} coreVals={e.coreVals}
          leadership={isNewHorizons?e.leadership:null}
          rehire={typeof e.rehire=="boolean"?e.rehire:false} />
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
