import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ScoreCardItem from './ScoreCardItem.jsx';
import {generateId} from '../auxfunctions.js';

class ScoreCardPanel extends Component{
  render(){
    var scoreCardItems = this.props.scorecard.map( (e,i) =>(
      <ScoreCardItem
        employee={this.props.employee} item={e}
        key={generateId(e.name)} />)

    );
    return (
      <div>
        {scoreCardItems}
      </div>
    );
  }
}

export default ScoreCardPanel;
