
const state = { evals: evals, coreValues: coreValues};
deepFreeze(state);

//TEST 1 - handleCVC
let newState = reducer(state, {type: 'COREVAL_CHANGE', employee: 'eliezer tavarez', newVal: 5, k: 'Acc' });
expect(
  newState.evals[1]
).toEqual({
    name: "eliezer tavarez",
    scorecard: [
      { name: "front double bicep", score: 9, weight: .50},
      { name: "lat spread", score: 9, weight: .25 },
      { name: "most muscular", score: 9, weight: .25 }
    ],
    coreVals: {
      SS: 9,
      Acc: 5,
      Asp: 5,
      Com: 9,
      Exx: 9,
      Giv: 8
    }
});

//TEST 2 - scoreChange
let newState2 = reducer(state, {type:'SC_SCORE_CHANGE',
                      employee: 'lidia bravo',
                      newVal: 6, k: 'Schedules and organizes all classes'});
expect(newState2.evals[0]).toEqual({
    name: "lidia bravo",
    scorecard: [
      { name: "Tames the Diamond D beast", score: 9, weight: .50},
      { name: "Has incredible patience", score: 9, weight: .25 },
      { name: "Schedules and organizes all classes", score: 6, weight: .25 }
    ],
    coreVals: {
      SS: 9,
      Acc: 10,
      Asp: 5,
      Com: 9,
      Exx: 9,
      Giv: 8
    }
});

//TEST 3 - weightChange
let newState3 = reducer(state, {type:'SC_WEIGHT_CHANGE',
                      employee: 'lidia bravo',
                      newVal: 0.30, k: 'Has incredible patience'});
expect(newState3.evals[0]).toEqual({
    name: "lidia bravo",
    scorecard: [
      { name: "Tames the Diamond D beast", score: 9, weight: 0.50},
      { name: "Has incredible patience", score: 9, weight: 0.3 },
      { name: "Schedules and organizes all classes", score: 9, weight: 0.25 }
    ],
    coreVals: {
      SS: 9,
      Acc: 10,
      Asp: 5,
      Com: 9,
      Exx: 9,
      Giv: 8
    }
});
console.log(newState3);
console.log("tests passed");
