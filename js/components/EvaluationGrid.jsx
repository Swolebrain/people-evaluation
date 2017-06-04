import React, {Component} from 'react';
import ReactDOM from 'react-dom';
const $ = require('jquery');

class EvaluationGrid extends Component{
  constructor(props){
    super(props);
    this.state = {visible: false};
  }
  generateGrid =()=>{
    var gridPositions = this.props.evals.reduce( (prev,ev) => {
        var name = ev.name;
        var scorecard = ev.scorecard
          .filter((e,i)=>i<=3)
          .map(sci=>Number(sci.score) )
          .reduce( (p,c) => p+c );
        var leadership = ev.scorecard
          .filter((e,i)=>i>3)
          .map(sci=>Number(sci.score) )
          .reduce( (p,c) => p+c );

        var coreVals = Math.round(Object.keys(ev.coreVals).reduce( (p,c) => p+ Number(ev.coreVals[c]) , 0)/
                                        Object.keys(ev.coreVals).length-1);

        // console.log(leadership);
        scorecard = Math.round((scorecard + leadership)/5)-1;
        console.log(scorecard);
        return prev.concat({name, scorecard, coreVals});
    }, []);
    console.log(gridPositions);
    //TODO: PREVENT THIS FROM INSTANTIATING EVERY TIME THE FUNCTION RUNS
    var grid = [ ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""],
          ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""] ];

    gridPositions.forEach( (e, idx) => {
      var col = e.scorecard;
      if (col < 0) col = 0;
      if (col > 5) col = 5;
      var row = 5-e.coreVals;
      if (row < 0) row = 0;
      if (row > 5) row = 5;
      grid[row][col] += e.name+'\n';
    });
    var rows = grid.map( function(row, index){
      var cells = row.map( (e, i) => <td key={i}> {e} </td>);
      return (
        <tr key={index}>
          {cells}
        </tr>);
      });
    return (
      <div>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
  _hideOverlay=()=>{
    this.setState({visible: false});
  }
  _reveal=()=>{
    this.setState({visible: true});
    console.log("Revealing overlay");
  }
  render(){
    var style = {marginBottom: "20px"};
    var overlayStyle = {height: $(document).height()};
    var overlay = <div></div>;
    if (this.state.visible){
      overlay = (
      <div className='overlay' style={overlayStyle} onClick={this._hideOverlay}>
        {this.generateGrid()}
      </div>);
    }
    return (
      <div>
        <div className="btn center-block" style={style} onClick={this._reveal}>
          Plot Grid!
        </div>
        {overlay}
      </div>

    );
  }
}

export default EvaluationGrid;
