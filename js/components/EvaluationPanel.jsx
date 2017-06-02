import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CoreValueItem from './CoreValueItem.jsx';
import LeadershipWidget from './LeadershipWidget.jsx';
import RehireWidget from './RehireWidget.jsx';
import ScoreCardPanel from './ScoreCardPanel.jsx';
import store from '../store.js';

class EvaluationPanel extends Component{
  componentWillMount(){
    this.setState({hovered: false});
  }
  _handleMouseEnter(){
    this.setState({hovered: true});
  }
  _handleMouseLeave(){
    this.setState({hovered: false});
  }
  _removeEval(e){
    store.dispatch({
      type: 'REMOVE_EVAL',
      employee: this.props.name
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    //this method is called by react whenever object receives new props
    //console.log('EvaluationPanel.shouldComponentUpdate')
    return true;
  }
  displayLeadershipWidget(){
    if (this.props.leadership===null)
      return null;
    <LeadershipWidget leadership={this.props.leadership}/>
  }
  render(){
    var corevalz = [];
    for (var k in this.props.coreVals){
      corevalz.push( <CoreValueItem key={k} k={k}
        employee={this.props.name} val={this.props.coreVals[k]}></CoreValueItem> );
    }
    var localStyle; //style object cannot be mutated
    if (this.state.hovered){ //override the inherited style prop when hovered
      localStyle = { left: this.props.styleProp.left, zIndex: 99,
                  transform: "scale(1.05,1.05)" };
    }
    else{
      localStyle = this.props.styleProp;
    }
    return (
      <div className="employee-panel" style={localStyle}
              onMouseEnter={(this._handleMouseEnter).bind(this)}
              onMouseLeave={(this._handleMouseLeave).bind(this)}>
        <span className="close-btn" onClick={(this._removeEval).bind(this)}>X</span>
        <h1>{this.props.name}</h1>
        <h2>Core Values</h2>
        <ul className="core-values-panel">
          {corevalz}
        </ul>
        <hr />
        <h2>Score Card</h2>
        <ScoreCardPanel employee={this.props.name}
        scorecard={this.props.scorecard}></ScoreCardPanel>
        <div className="nh-attributes sc-item">
          <RehireWidget index={this.props.index} toggled={this.props.rehire}/>
          {this.displayLeadershipWidget()}
        </div>
      </div>

    )
  }
}

export default EvaluationPanel;
