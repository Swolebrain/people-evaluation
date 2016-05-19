
const reducer = (state = {evals: {}, coreValues: {}}, action) => {
  switch (action.type){
    case 'COREVAL_CHANGE':
      console.log("running handleCVC");
      return handleCVC(state, action);
    case 'SC_SCORE_CHANGE':
      return scoreChange(state, action);
    case 'SC_WEIGHT_CHANGE':
      return weightChange(state, action);
    case 'ADD_EVAL':
      return addEval(state, action);
    default:
      console.log("reached default");
      return state;
  }
};

// action = {type, employee, newVal, k}
const handleCVC = (state, action) => {
  const newEvals = state.evals.map( (evalu) => {
    if (evalu.name === action.employee){
      let delta = {};
      delta[action.k] = action.newVal;
      var newEval = Object.assign({}, evalu,
        {
          coreVals: Object.assign({}, evalu.coreVals, delta)
        });
      return newEval;
    }
    else return evalu;
  });
  return {coreValues: Object.assign({}, state.coreValues), evals: newEvals};
};

//action = {type, employee, newVal, k}
const scoreChange = (state, action) => {
  return scoreCardChange(state, action, "score");
};

//action = {type, employee, newVal, k}
const weightChange = (state, action) => {
  return scoreCardChange(state, action, "weight");
};

//aux function
const scoreCardChange = (state, action, which) => {
  const newEvals = state.evals.map( (ev) =>{
    if (ev.name === action.employee){
      let deltaScoresArr = ev.scorecard.map( (e) => {
        if(e.name === action.k){
          if (which === "weight")
            return {name:e.name, weight: action.newVal, score: e.score};
          else if (which === "score")
            return {name:e.name, weight: e.weight, score: action.newVal};
        }
        else
          return e;
      });
      var newEval = Object.assign({}, ev,  { scorecard: deltaScoresArr } );
      return newEval;
    }
    else {
      return ev;
    }
  });
  return {coreValues: Object.assign({}, state.coreValues), evals: newEvals};
};

const addEval = (state, action) => {
  
};
