module.exports = React.createClass({
  render: function(){
    var cls = this.props.k!=0?"block-input":"block-input";
    var id = `sc-item-${this.props.k}`;
    return (
      <input type="text" className={cls} id={id} ref={ (input) => this.input = input }/>
    );
  }
});
