import React, {Component} from "react";
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class LeadershipWidget extends Component{
  constructor(props){
    super(props);

  }
  toggleSwitch(name){
    //this.setState({toggled: !this.state.toggled})
    console.log("toggling switch");
  }
  render(){
    console.log(this.props.leadership);
    let categories = this.props.leadership.map(leadershipObj=>leadershipObj.label);
    return (
      <div className="leadership">
        <MuiThemeProvider>
          {categories.map(cat=><Toggle label={cat} onClick={()=>this.toggleSwitch(cat)} />)}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default LeadershipWidget;
