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
      newState = addEval(state, action); break;
    case 'HYDRATE':
      newState = handleHydrate(state, action); break;
    case 'REMOVE_EVAL':
      newState = removeEval(state, action); break;
    case 'ADMIN_HYDRATE':
      console.log('CALLING ADMIN HYDRATE');
      newState = hydrateOtherManagers(state, action);
      break;
    default:
      return state;
  }
  console.log(newState);
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
  let newState = {coreValues: Object.assign({}, state.coreValues), evals: newEvals};
  if (state.otherManagers) newState.otherManagers = JSON.parse(JSON.stringify(state.otherManagers));
  return newState;
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
  let newState = {coreValues: Object.assign({}, state.coreValues), evals: newEvals};
  if (state.otherManagers) newState.otherManagers = JSON.parse(JSON.stringify(state.otherManagers));
  return newState;
};

//action = {type, sc: {name: str, scorecard: [{name, score, weight}] }}
const addEval = (state, action) => {
  let cvScores = {};
  for (var k in state.coreValues){
    cvScores[k] = 0;
  }
  const fullSC = Object.assign({}, action.sc, {coreVals: cvScores});
  //console.log(state.evals);
  const newEvals = state.evals.concat(fullSC);
  let newState =  {coreValues: Object.assign({}, state.coreValues), evals: newEvals};
  if (state.otherManagers) newState.otherManagers = JSON.parse(JSON.stringify(state.otherManagers));
  return newState;
};


//action = {type, employee}
const removeEval = (state, action) => {
  const newEvals = state.evals.filter( (e) => e.name != action.employee );
  let newState= {coreValues: Object.assign({}, state.coreValues), evals: newEvals};
  if (state.otherManagers) newState.otherManagers = JSON.parse(JSON.stringify(state.otherManagers));
  return newState;
};

const handleHydrate = (state, action) => {
  if (!action.newState.coreValues)
    action.newState.coreValues = Object.assign({}, state.coreValues);
  let theNewState = Object.assign({}, action.newState);
  if (state.otherManagers)
    theNewState.otherManagers = state.otherManagers;
  return theNewState;
}

const hydrateOtherManagers = (oldState, action) => {
  let newState = JSON.parse(JSON.stringify(oldState));
  newState.otherManagers = action.data;
  return newState;
}

if (module)
  module.exports = reducer;
