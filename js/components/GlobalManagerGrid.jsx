import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import GridOverlay from './GridOverlay.jsx';

class GlobalManagerGrid extends Component{
  constructor(props){
    super(props);
    this.state = {visible: false};
  }
  _hideOverlay=()=>{
    this.setState({visible: false});
  }
  _reveal=()=>{
    this.setState({visible: true});
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
    <div className="manager-eval">
      <h3>{this.props.user}</h3>
      <div className="btn" onClick={this._reveal}>Plot All Grids</div>
      {overlay}
    </div>);
  }
}

export default GlobalManagerGrid;
