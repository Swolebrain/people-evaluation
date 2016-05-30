import React from 'react';
import store from '../store.js';

const CoreValueItem = React.createClass({
  _handleCoreValChange: function(e){
    store.dispatch({
      type: 'COREVAL_CHANGE', employee: this.props.employee,
      newVal: e.target.value, k: this.props.k
    });
  },
  render: function(){
      return (
        <li className="core-li" key={this.props.k}>
          {this.props.k}<br />
          <input type="number" min="1" max="10" value={this.props.val}
          keyName={this.props.k} onChange={this._handleCoreValChange} />
        </li>
      );
  }
});

export default CoreValueItem;
