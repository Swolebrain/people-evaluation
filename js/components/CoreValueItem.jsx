import React, {Component} from 'react';
import store from '../store.js';

class CoreValueItem extends Component{
  _handleCoreValChange=(e)=>{
    store.dispatch({
      type: 'COREVAL_CHANGE', employee: this.props.employee,
      newVal: e.target.value, k: this.props.k
    });
  }
  render(){
      return (
        <li className="core-li" key={this.props.k}>
          {this.props.k}<br />
          <input type="number" min="1" max="10" value={this.props.val}
           onChange={this._handleCoreValChange} />
        </li>
      );
  }
}

export default CoreValueItem;
