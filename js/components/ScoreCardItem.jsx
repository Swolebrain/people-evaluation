import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import store from '../store.js';

class ScoreCardItem extends Component{
  _handleSCScoreChange=(e)=>{
    if (!e.target.value.match(/^[0-6]$/)){
      return;
    }
    store.dispatch({type: 'SC_SCORE_CHANGE',
                  employee: this.props.employee,
                  newVal: e.target.value,
                  k: this.props.item.name});
  }
  _handleSCWeightChange=(e)=>{
    //TODO: ENFORCE WEIGHTS ADDING UP TO 1, WITH RED CSS BORDER
    store.dispatch({type: 'SC_WEIGHT_CHANGE',
                  employee: this.props.employee,
                  newVal: e.target.value,
                  k: this.props.item.name});
  }
  render(){
    return (
      <div className="sc-item">
        <div className="sc-name">
          {this.props.item.name}
        </div>
        <div className="sc-score">
          <input type="number" max={6} value={this.props.item.score} onChange={this._handleSCScoreChange} />
        </div>
        
      </div>
    );
  }
}
export default ScoreCardItem;
