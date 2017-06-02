import coreValues from './data.js';

const reducer = (state = {evals: [], coreValues: coreValues}, action) => {
  let newState;
  switch (action.type){
    case 'COREVAL_CHANGE':
      newState = handleCVC(state, action); break;
    case 'SC_SCORE_CHANGE':
      newState = scoreChange(state, action); break;
    case 'SC_WEIGHT_CHANGE':
      newState = weightChange(state, action); break;
    case 'ADD_EVAL':
      console.log("Add eval reducer");
      newState = addEval(state, action); break;
    case 'HYDRATE':
      newState = handleHydrate(action.newState); break;
    case 'REMOVE_EVAL':
      newState = removeEval(state, action); break;
    case 'REHIRE_CHANGE':
      newState = rehireChange(state, action); break;
    default:
      return state;
  }
  //console.log(newState);
  return newState;
};

// action = {type, employee, newVal, k}
const handleCVC = (state, action) => {
  const newEvals = state.evals.map( (evalu) => {
    if (evalu.name === action.employee){
      let delta = {};
      delta[action.k] = Number(action.newVal);
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

//action = {type, sc: {name: str, scorecard: [{name, score, weight}] }}
const addEval = (state, action) => {
  console.log("hi");
  let cvScores = {};
  for (var k in state.coreValues){
    cvScores[k] = 0;
  }
  const fullSC = Object.assign({},
    action.sc,
    {coreVals: cvScores},
    {rehire: true},
    {leadership: 0});
  const newEvals = state.evals.concat(fullSC);
  console.log(newEvals);
  return {coreValues: Object.assign({}, state.coreValues), evals: newEvals};
};


//action = {type, employee}
const removeEval = (state, action) => {
  const newEvals = state.evals.filter( (e) => e.name != action.employee );
  return {coreValues: Object.assign({}, state.coreValues), evals: newEvals};
};

const handleHydrate = (newState) => {
  if (!newState.coreValues)
    newState.coreValues = Object.assign({}, state.coreValues);
  return Object.assign({}, newState);
}
//action = {type, evalIndex}
const rehireChange = (oldState, action) =>{
  console.log("toggling rehire for employee index "+action.evalIndex);
  let newState = JSON.parse(JSON.stringify(oldState));
  console.log(newState);
  newState.evals[action.evalIndex].rehire = !newState.evals[action.evalIndex].rehire;
}

if (module)
  module.exports = reducer;
