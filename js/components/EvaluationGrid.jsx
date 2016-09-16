import React from 'react';
import ReactDOM from 'react-dom';
const $ = require('jquery');

const EvaluationGrid = React.createClass({
  getInitialState: function(){
    return {visible: false};
  },
  generateGrid: function(){
    var gridPositions = this.props.evals.reduce( (prev,ev) => {
        var name = ev.name;
        var scorecard = Math.round(ev.scorecard
          .map(sci=>({score:Number(sci.score), weight:Number(sci.weight)}) ) 
          .reduce( (p,c) => p+(c.score*c.weight) , 0));
        var coreVals = Math.round(Object.keys(ev.coreVals).reduce( (p,c) => p+ Number(ev.coreVals[c]) , 0)/
                                        Object.keys(ev.coreVals).length);
        return prev.concat({name, scorecard, coreVals});
    }, []);
    console.log(gridPositions);
    //TODO: PREVENT THIS FROM INSTANTIATING EVERY TIME THE FUNCTION RUNS
    var grid = [ ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""],
          ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""] ];

    gridPositions.forEach( (e, idx) => {
      var row = 10-e.scorecard;
      if (row < 0) row = 0;
      if (row > 5) row = 5;
      var col = e.coreVals-5;
      if (col < 0) col = 0;
      if (col > 5) col = 5;
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
  },
  _hideOverlay: function(){
    this.setState({visible: false});
  },
  _reveal: function(){
    this.setState({visible: true});
    console.log("Revealing overlay");
  },
  render: function(){
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
});

export default EvaluationGrid;
