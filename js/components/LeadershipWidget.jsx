import React, {Component} from "react";
import Toggle from 'material-ui/Toggle';
import store from '../store.js';


class LeadershipWidget extends Component{
  constructor(props){
    super(props);

  }
  toggleSwitch = (e)=>{
    //this.setState({toggled: !this.state.toggled})
    let newVal = this.props.item.score=="0"? 1 : 0;
    console.log("toggling switch: "+newVal);
    store.dispatch({type: 'SC_SCORE_CHANGE',
                  employee: this.props.employee,
                  newVal: newVal,
                  k: this.props.item.name});
  }
  render(){
    return (
      <Toggle label={this.props.item.name}
        toggled={this.props.item.score==1}
        onClick={this.toggleSwitch} />
    )
  }
}

export default LeadershipWidget;
