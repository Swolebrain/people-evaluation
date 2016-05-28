module.exports = React.createClass({
  render: function(){
    var scoreCardItems = this.props.scorecard.map( (e) =>
      <ScoreCardItem employee={this.props.employee} item={e} key={generateId(e.name)}></ScoreCardItem>
    );
    return (
      <div>
        {scoreCardItems}
      </div>
    );
  }
});
