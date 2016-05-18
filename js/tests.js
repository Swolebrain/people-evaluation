
const state = { evals: evals, coreValues: coreValues};

console.log(state.evals[0]);

var newState = reducer(state, {type: 'COREVAL_CHANGE', employee: 'lidia bravo', newVal: 3, k: 'SS' });
