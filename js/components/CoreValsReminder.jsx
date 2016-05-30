import React from 'react';

const CoreValsReminder = React.createClass({
  render: function(){
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
});

export default CoreValsReminder;
