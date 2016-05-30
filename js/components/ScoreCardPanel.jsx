import React from 'react';
import ReactDOM from 'react-dom';
import ScoreCardItem from './ScoreCardItem.jsx';
import generateId from '../auxfunctions.js';

const ScoreCardPanel = React.createClass({
  render: function(){
    var scoreCardItems = this.props.scorecard.map( (e) =>
      <ScoreCardItem employee={this.props.employee} item={e} key={generateId(e.name)}></ScoreCardItem>
    );
    return (
      <div>
        {scoreCardItems}
      </div>
    );
  }
});

export default ScoreCardPanel;
