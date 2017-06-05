import React, {Component} from 'react';

const GridOverlay = props => {
  var gridPositions = props.evals.reduce( (prev,ev) => {
    var name = ev.name;
    var scorecard = ev.scorecard;
    if (name == "" || !Array.isArray(scorecard) || scorecard.length === 0){
      return prev;
    }
    scorecard = scorecard
      .map(sci=>Number(sci.score)*Number(sci.weight) )
      .reduce( (p,c) => p+c, 0 );

    var coreVals = Math.round(Object.keys(ev.coreVals).reduce( (p,c) => p+ Number(ev.coreVals[c]) , 0)/
                                    Object.keys(ev.coreVals).length);

    scorecard = Math.round(scorecard);
    return prev.concat({name, scorecard, coreVals});
  }, []);
  console.log(gridPositions);
  //TODO: PREVENT THIS FROM INSTANTIATING EVERY TIME THE FUNCTION RUNS
  var grid = [ ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""],
        ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""] ];

  gridPositions.forEach( (e, idx) => {
    var col = e.scorecard-5;
    if (col < 0) col = 0;
    if (col > 5) col = 5;
    var row = 10-e.coreVals;
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


export default GridOverlay;
