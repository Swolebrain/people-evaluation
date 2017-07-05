import React, {Component} from 'react';

class CoreValsReminder extends Component{
  render(){
    var rows = [];
    for (var k in this.props.coreVals){
      rows.push(
        <li className="li-pad" key={k}>
          <strong>{k}: </strong> {this.props.coreVals[k].toLowerCase()}
        </li>
      );
    }
    return (
      <div className="core-vals-reminder">
        <h2>Numeric Ratings Guide</h2>
        <ul className="smaller">
          <li><strong>5-6:</strong> all of the time/most of the time</li>
          <li><strong>3-4:</strong> some of the time</li>
          <li><strong>0-2:</strong> never/rarely</li>
        </ul>
        <h2>Our Core Values:</h2>
        <ul>
          {rows}
        </ul>

      </div>
    );
  }
}

export default CoreValsReminder;
