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


//MAIN APPLICATION
const URL = 'http://fvi-grad.com:8008/api?';
import store from './store.js';
//if ( localStorage && localStorage.getItem("state") )
//  store.dispatch({type: "HYDRATE", newState: JSON.parse(localStorage.getItem("state"))});


const render = require('./renderfunction.jsx');
store.subscribe(render);
store.subscribe( () => {
  let state = store.getState();
  let data = $.param({
    user: JSON.parse(localStorage.getItem('profile')).upn,
    state: state
  });
  localStorage.setItem("state", JSON.stringify(state));
  $.ajax({
    url: URL+data,
    method: 'POST',
    headers: {
      authorization: "Bearer "+localStorage.getItem('token')
    },
    success: function(resp, txt, xhr){
      console.log(JSON.parse(resp));
      //store.dispatch({type: "HYDRATE", newState: resp.state});
    }
  });
});
render();
