import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class SCInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      textValue: this.props.defaultValue
    }
  }
  handleChange = e =>{
    this.setState({textValue:e.target.value})
  }
  render(){
    var cls = this.props.k!=0?"block-input":"block-input";
    var id = `sc-item-${this.props.k}`;
    return (
      <input type="text"
        value={this.state.value}
        onChange={this.handleChange}
        className={cls} id={id}
        ref={input=> this.input = input}/>
    );
  }
}

export default SCInput;
