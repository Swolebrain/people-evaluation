
function runTests(){
  const state = { evals: evals, coreValues: coreValues};
  deepFreeze(state);

  //TEST 1 - handleCVC
  console.log("running test 1");
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
  console.log("running test 2");
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
  console.log("running test 3");
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

  //test 4: add new scorecard
  console.log("running test 4");
  let newState4 = reducer(state, {
    type: 'ADD_EVAL',
    sc: 	{
    	    name: "Victor Moreno",
    	    scorecard: [
    				{ name: "Do you even lift", score: 0, weight: 0},
    				{ name: "eat sleep code", score: 0, weight: 0 },
    				{ name: "mad max fury road", score: 0, weight: 0 }
    			]
    	}
  });
  expect(newState4.evals).toEqual(
    [
    	{
    	    name: "lidia bravo",
    	    scorecard: [
    				{ name: "Tames the Diamond D beast", score: 9, weight: 0.50},
    				{ name: "Has incredible patience", score: 9, weight: 0.25 },
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
    	},
    	{
    	    name: "eliezer tavarez",
    	    scorecard: [
    				{ name: "front double bicep", score: 9, weight: 0.50},
    				{ name: "lat spread", score: 9, weight: 0.25 },
    				{ name: "most muscular", score: 9, weight: 0.25 }
    			],
    	    coreVals: {
    				SS: 9,
    				Acc: 10,
    				Asp: 5,
    				Com: 9,
    				Exx: 9,
    				Giv: 8
    			}
    	},
      {
      	    name: "Victor Moreno",
      	    scorecard: [
      				{ name: "Do you even lift", score: 0, weight: 0},
      				{ name: "eat sleep code", score: 0, weight: 0 },
      				{ name: "mad max fury road", score: 0, weight: 0 }
      			],
      	    coreVals: {
      				SS: 0,
      				Acc: 0,
      				Asp: 0,
      				Com: 0,
      				Exx: 0,
      				Giv: 0
      			}
      	}
    ]
  );
  //test 4: add new scorecard
  console.log("running test 4");
  let newState5 = reducer(state, {
    type: 'REMOVE_EVAL',
    employee: 'eliezer tavarez'
  });
  expect(newState5.evals).toEqual(
    [
    	{
    	    name: "lidia bravo",
    	    scorecard: [
    				{ name: "Tames the Diamond D beast", score: 9, weight: 0.50},
    				{ name: "Has incredible patience", score: 9, weight: 0.25 },
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
    	}
    ]
  );

  console.log("tests passed");
}
//runTests();
