import React, {Component} from 'react';

class CoreValsReminder extends Component{
  render(){
    var rows = [];
    for (var k in this.props.coreVals){
      rows.push(
        <li className="li-pad" key={k}>
          <strong>{k}: </strong> {this.props.coreVals[k]}
        </li>
      );
    }
    return (
      <div className="core-vals-reminder">
        <h2>Our Core Values:</h2>
        <ul>
          {rows}
        </ul>

      </div>
    );
  }
}

export default CoreValsReminder;
