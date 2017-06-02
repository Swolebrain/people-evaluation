import React, {Component} from "react";
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from '../store.js';

class RehireWidget extends Component{
  constructor(props){
    super(props);
  }
  toggleSwitch(){
    store.dispatch({
      type: 'REHIRE_CHANGE',
      evalIndex: this.props.index
    });
  }
  render(){
    return(
      <div className="rehire">
        <MuiThemeProvider>
          <Toggle label="Would you Enthusiastically rehire?"
            onClick={(this.toggleSwitch).bind(this)} />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default RehireWidget;
