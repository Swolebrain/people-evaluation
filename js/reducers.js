
const reducer = (state = {evals: {}, coreValues: {}}, action) => {
  switch (action.type){
    case 'COREVAL_CHANGE':
      return handleCVC(state, action);
    case 'SC_SCORE_CHANGE':
      return scoreChange(state, action);
    case 'SC_WEIGHT_CHANGE':
      return weightChange(state, action);
    case 'ADD_EVAL':
      return addEval(state, action);
    default:
      return state;
  }
};

// action = {type, employee, newVal, k}
const handleCVC = (state, action) => {
  var nextState = state.evals.map( (evalu) => {
    if (evalu.name === action.employee){
      var newEval = Object.assign({}, evalu);
      newEval.coreVals[action.k] = Number(action.newVal);
      return newEval;
    }
    else return evalu;
  });
  return nextState;
};

const scoreChante = (state, action) => {

};

const weightChange = (state, action) => {

};

const addEval = (state, action) => {

};
