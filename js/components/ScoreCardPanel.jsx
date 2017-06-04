import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ScoreCardItem from './ScoreCardItem.jsx';
import LeadershipWidget from './LeadershipWidget.jsx';
import generateId from '../auxfunctions.js';

class ScoreCardPanel extends Component{
  render(){
    var scoreCardItems = this.props.scorecard.map( (e,i) =>
      i<=3 ? <ScoreCardItem employee={this.props.employee} item={e} key={generateId(e.name)}></ScoreCardItem>
            : null
    );
    var leadershipItems = this.props.scorecard.map ( (e,i)=>
      i<=3 ? null : <LeadershipWidget
        employee={this.props.employee}
        item={e}
        key={generateId(e.name)} />
    );
    return (
      <div>
        {scoreCardItems}
        <MuiThemeProvider>
          <div>
            {leadershipItems}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default ScoreCardPanel;
