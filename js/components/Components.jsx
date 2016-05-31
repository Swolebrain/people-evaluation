const EvaluationGrid = React.createClass({
  getInitialState: function(){
    return {visible: false};
  },
  generateGrid: function(){
    var gridPositions = this.props.evals.reduce( (prev,ev) => {
        var name = ev.name;
        var scorecard = Math.round(ev.scorecard.reduce( (p,c) => p+(c.score*c.weight) , 0));
        var coreVals = Math.round(Object.keys(ev.coreVals).reduce( (p,c) => p+ ev.coreVals[c] , 0)/
                                        Object.keys(ev.coreVals).length);
        return prev.concat({name, scorecard, coreVals});
    }, []);
    var grid = [ ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""],
          ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""] ];

    gridPositions.forEach( (e, idx) => {
      var row = 10-e.scorecard;
      if (row < 0) row = 0;
      if (row > 5) row = 5;
      var col = e.coreVals-5;
      if (col < 0) col = 0;
      if (col > 5) col = 5;
      grid[row][col] += e.name+'\n';
    });
    var rows = grid.map( function(row, index){
      var cells = row.map( (e, i) => <td key={i}> {e} </td>);
      return (
        <tr key={index}>
          {cells}
        </tr>);
      });
    return (
      <div>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  },
  _hideOverlay: function(){
    this.setState({visible: false});
  },
  _reveal: function(){
    this.setState({visible: true});
  },
  render: function(){
    var style = {marginBottom: "20px"};
    var overlayStyle = {height: $(document).height()};
    var overlay = <div></div>;
    if (this.state.visible){
      overlay = (
      <div className='overlay' style={overlayStyle} onClick={this._hideOverlay}>
        {this.generateGrid()}
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
});

const CoreValsReminder = React.createClass({
  render: function(){
    var rows = [];
    for (var k in this.props.coreVals){
      rows.push(
        <li className="li-pad" key={k}>
          <strong>{k}: </strong> {this.props.coreVals[k]}
        </li>
      );
    }
    return (
      <div className="core-vals-reminder">
        <h2>Our Core Values:</h2>
        <ul>
          {rows}
        </ul>

      </div>
    );
  }
});
const ScoreCardItem = React.createClass({
  _handleSCScoreChange: function(e){
    store.dispatch({type: 'SC_SCORE_CHANGE',
                  employee: this.props.employee,
                  newVal: e.target.value,
                  k: this.props.item.name});
  },
  _handleSCWeightChange: function(e){
    //TODO: ENFORCE WEIGHTS ADDING UP TO 1, WITH RED CSS BORDER
    store.dispatch({type: 'SC_WEIGHT_CHANGE',
                  employee: this.props.employee,
                  newVal: e.target.value,
                  k: this.props.item.name});
  },
  render: function(){
    return (
      <div className="sc-item">
        <div className="sc-name">
          {this.props.item.name}
        </div>
        <div className="sc-score">
          <input type="number" value={this.props.item.score} onChange={this._handleSCScoreChange} />
        </div>
        <div className="sc-weight">
          <input type="number" min="0" max="1" step="0.1"
          value={this.props.item.weight} onChange={this._handleSCWeightChange} />
        </div>
      </div>
    );
  }
});
const ScoreCardPanel = React.createClass({
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
const CoreValueItem = React.createClass({
  _handleCoreValChange: function(e){
    store.dispatch({
      type: 'COREVAL_CHANGE', employee: this.props.employee,
      newVal: e.target.value, k: this.props.k
    });
  },
  render: function(){
      return (
        <li className="core-li" key={this.props.k}>
          {this.props.k}<br />
          <input type="number" min="1" max="10" value={this.props.val}
          keyName={this.props.k} onChange={this._handleCoreValChange} />
        </li>
      );
  }
});
const EvaluationPanel = React.createClass({
  componentWillMount: function(){
    this._hovered = false;
  },
  _handleMouseEnter: function(){
    this._hovered = true;
    this.setState({num: Math.random()});
  },
  _handleMouseLeave: function(){
    this._hovered = false;
    this.setState({num: Math.random()});
  },
  _removeEval: function(e){
    store.dispatch({
      type: 'REMOVE_EVAL',
      employee: this.props.name
    });
  },
  render: function(){
    var corevalz = [];
    for (var k in this.props.coreVals){
      corevalz.push( <CoreValueItem key={k} k={k}
        employee={this.props.name} val={this.props.coreVals[k]}></CoreValueItem> );
    }
    var localStyle; //style object cannot be mutated
    if (this._hovered){ //override the inherited style prop when hovered
      localStyle = { left: this.props.styleProp.left, zIndex: 99,
                  transform: "scale(1.05,1.05)" };
    }
    else{
      localStyle = this.props.styleProp;
    }
    return (
      <div className="employee-panel" style={localStyle}
              onMouseEnter={this._handleMouseEnter} onMouseLeave={this._handleMouseLeave}>
        <span className="close-btn" onClick={this._removeEval}>X</span>
        <h1>{this.props.name}</h1>
        <h2>Core Values</h2>
        <ul className="core-values-panel">
          {corevalz}
        </ul>
        <hr />
        <h2>Score Card</h2>
        <ScoreCardPanel employee={this.props.name}
        scorecard={this.props.scorecard}></ScoreCardPanel>
      </div>

    )
  }
});
const SCInput = React.createClass({
  render: function(){
    var cls = this.props.k!=0?"block-input":"block-input";
    var id = `sc-item-${this.props.k}`;
    return (
      <input type="text" className={cls} id={id} ref={ (input) => this.input = input }/>
    );
  }
});
const EvaluationCreator = React.createClass({
  _createEval: function(){
    let scorecard = [];
    for (var k in this.inputs){
      var txtVal = this.inputs[k].input.value;
      if (txtVal.length > 0){
        scorecard.push({
          name: txtVal,
          score: 0,
          weight: 0
        });
      }
    }
    let name = this.name.value;
    const action = {
      type: "ADD_EVAL",
      sc:{ name, scorecard }
    };
    store.dispatch(action);
    this._reset();
  },
  _reset: function(){
    for (var k in this.inputs){
      this.inputs[k].input.value = "";
    }
    this.name.value = "";
  },
  componentWillMount: function(){
    this.inputs = {};
  },
  render: function(){
    var inputs = Array(6).fill(1).map( (e,i) => i ).map( (elm,idx) => {
      return (
        <SCInput key={elm} k={elm} ref={ (ref) => this.inputs[idx] = ref }/>
      );
    } );
    return (
      <div className='add-panel'>
        <h1>Add Employee Evaluation</h1>
        <div>Employee Name: </div>
        <input type="text" className="block-input" id="new-name" ref={ (ref) => this.name = ref }/>
        <div>Employee Scorecard Items: </div>
        <div>
          {inputs}
        </div>
        <div className="btn" onClick={this._createEval}>
          Create new Scorecard
        </div>
      </div>
    );
  }
});
const EvaluationList = React.createClass({
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
const EvaluationApp = React.createClass({
  getInitialState: function(){
    return {
      coreVals:coreValues,
      evals:evals
    };
  },
  render: function(){
    return (
      <div>
        <EvaluationList coreVals={store.getState().coreValues} evals={store.getState().evals}  />
        <div>
          <EvaluationGrid evals={store.getState().evals} />
        </div>
        <div className="bottom-section">
          <EvaluationCreator />
          <CoreValsReminder coreVals={store.getState().coreValues} />
        </div>
      </div>

    );
  }
});