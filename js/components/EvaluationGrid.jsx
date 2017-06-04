import React, {Component} from 'react';
import GridOverlay from './GridOverlay.jsx';

class EvaluationGrid extends Component{
  constructor(props){
    super(props);
    this.state = {visible: false};
  }
  _hideOverlay=()=>{
    this.setState({visible: false});
  }
  _reveal=()=>{
    this.setState({visible: true});
    console.log("Revealing overlay");
  }
  render(){
    var style = {marginBottom: "20px"};
    var overlayStyle = {height: window.innerHeight};
    var overlay = <div></div>;
    if (this.state.visible){
      overlay = (
      <div className='overlay' style={overlayStyle} onClick={this._hideOverlay}>
        <GridOverlay evals={this.props.evals} />
      </div>);
    }
    return (
      <div>
        <div className="btn center-block" style={style} onClick={this._reveal}>
          Plot Grid!
        </div>
        {overlay}
      </div>

    );
  }
}

export default EvaluationGrid;
