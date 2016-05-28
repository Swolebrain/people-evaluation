module.exports = React.createClass({
  _handleSCScoreChange: function(e){
    store.dispatch({type: 'SC_SCORE_CHANGE',
                  employee: this.props.employee,
                  newVal: e.target.value,
                  k: this.props.item.name});
  },
  _handleSCWeightChange: function(e){
    //TODO: ENFORCE WEIGHTS ADDING UP TO 1, WITH RED CSS BORDER
    store.dispatch({type: 'SC_WEIGHT_CHANGE',
                  employee: this.props.employee,
                  newVal: e.target.value,
                  k: this.props.item.name});
  },
  render: function(){
    return (
      <div className="sc-item">
        <div className="sc-name">
          {this.props.item.name}
        </div>
        <div className="sc-score">
          <input type="number" value={this.props.item.score} onChange={this._handleSCScoreChange} />
        </div>
        <div className="sc-weight">
          <input type="number" min="0" max="1" step="0.1"
          value={this.props.item.weight} onChange={this._handleSCWeightChange} />
        </div>
      </div>
    );
  }
});
