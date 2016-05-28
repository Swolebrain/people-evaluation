module.exports = React.createClass({
  render: function(){
    var selfProps = this.props;
    var width = (window.innerWidth-PANELWIDTH-30)/(store.getState().evals.length-1);
    var rot = parseInt(45*this.props.evals.length/5); //dampen rotation the fewer elements there are
    var evaluationPanels = this.props.evals.map(function(e, idx, arr){
      var left = Math.min(parseInt(width)*idx, PANELWIDTH*idx);
      var styleProp = {left: left,
                  zIndex: idx,
                  transform: `perspective(2000px) rotate3d(0,1,0,${rot}deg)`};
      return (
        <EvaluationPanel key={generateId(e.name)} name={e.name} index={idx} styleProp={styleProp}
          scorecard={e.scorecard} coreVals={e.coreVals} />
        );
    });
    return (
      <div className="evaluation-list-row">
        {evaluationPanels}
      </div>
    );
  }
});
