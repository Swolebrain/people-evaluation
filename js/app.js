//MISC
const generateId = (name) => name.toLowerCase().split(" ").join("-");
const PANELWIDTH = 370;

//REACT INCLUDES
const React = require('react');
const ReactDOM = require('react-dom');

//COMPONENTS
const EvaluationGrid = require('./components/EvaluationGrid.jsx');
const CoreValsReminder = require('./components/CoreValsReminder.jsx');
const ScoreCardItem = require('./components/ScoreCardItem.jsx');
const ScoreCardPanel = require('./components/ScoreCardPanel.jsx');
const CoreValueItem = require('./components/CoreValueItem.jsx');
const EvaluationPanel = require('./components/EvaluationPanel.jsx');
const SCInput = require('./components/SCInput.jsx');
const EvaluationCreator = require('./components/EvaluationCreator.jsx');
const EvaluationList = require('./components/EvaluationList.jsx');
const EvaluationApp = require('./components/EvaluationApp.jsx');

//REDUX INCLUDES
const reducer = require('./reducers.js');
const Redux = require('redux');

//MAIN APPLICATION
const { createStore } = Redux;
const store = createStore(reducer);
if ( localStorage && localStorage.getItem("state") )
  store.dispatch({type: "HYDRATE", newState: JSON.parse(localStorage.getItem("state"))});

const render = require('./renderfunction.jsx');
store.subscribe(render);
store.subscribe( () => localStorage.setItem("state", JSON.stringify(store.getState())));
render();
