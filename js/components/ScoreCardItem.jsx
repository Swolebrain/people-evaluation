import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import store from '../store.js';

class ScoreCardItem extends Component{
  _handleSCScoreChange(e){
    store.dispatch({type: 'SC_SCORE_CHANGE',
                  employee: this.props.employee,
                  newVal: e.target.value,
                  k: this.props.item.name});
  }
  _handleSCWeightChange(e){
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
          <input type="number" value={this.props.item.score}
            onChange={(this._handleSCScoreChange).bind(this)} />
        </div>
        <div className="sc-weight">
          <input type="number" min="0" max="1" step="0.1"
          value={this.props.item.weight}
          onChange={(this._handleSCWeightChange).bind(this)} />
        </div>
      </div>
    );
  }
}
export default ScoreCardItem;
