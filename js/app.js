const API_URL = require('./globals').API_URL;

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
const loadFromServer = require('./loadFromServer.js');
const EvaluationApp = require('./components/EvaluationApp.jsx');

const $ = require('jquery');
console.log("Version from 11-28");


//MAIN APPLICATION

import store from './store.js';
//if ( localStorage && localStorage.getItem("state") )
//  store.dispatch({type: "HYDRATE", newState: JSON.parse(localStorage.getItem("state"))});

const render = require('./renderfunction.jsx');
store.subscribe(render);

render();
