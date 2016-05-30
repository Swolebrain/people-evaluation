import React from 'react';
import EvaluationList from './EvaluationList.jsx';
import EvaluationGrid from './EvaluationGrid.jsx';
import EvaluationCreator from './EvaluationCreator.jsx';
import CoreValsReminder from './CoreValsReminder.jsx';
import store from '../store.js';

const EvaluationApp = React.createClass({
  getInitialState: function(){
    return store.getState();
  },
  render: function(){
    return (
      <div>
        <EvaluationList coreVals={store.getState().coreValues} evals={store.getState().evals}  />
        <div>
          <EvaluationGrid evals={store.getState().evals} />
        </div>
        <div className="bottom-section">
          <EvaluationCreator />
          <CoreValsReminder coreVals={store.getState().coreValues} />
        </div>
      </div>

    );
  }
});

export default EvaluationApp;
