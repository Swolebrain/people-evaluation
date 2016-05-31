import React from 'react';
import EvaluationList from './EvaluationList.jsx';
import EvaluationGrid from './EvaluationGrid.jsx';
import EvaluationCreator from './EvaluationCreator.jsx';
import CoreValsReminder from './CoreValsReminder.jsx';
import LoginComponent from './LoginComponent.jsx';
import store from '../store.js';

const EvaluationApp = React.createClass({
  getInitialState: function(){
    this.lock = new Auth0Lock('trDPfReklgtHuU9vMwYtEYBGTz0nuLgp', 'swolebrain.auth0.com');
    if ( localStorage.getItem("token") && localStorage.getItem('profile'))
      return {
        store: store.getState(),
        token: localStorage.getItem('token'),
        profile: JSON.parse(localStorage.getItem('profile'))
      };
    else {
      return {store: store.getState()};
    }
  },
  showLock: function(e){
    e.preventDefault();
    this.lock.show({popup: false}, function(err, profile, idToken){
      if (err) alert(err);
      localStorage.setItem('token', idToken);
      localStorage.setItem('profile', JSON.stringify(profile));
      this.setState({store: store.getState(), token: idToken, profile: profile});
    }.bind(this));
  },
  render: function(){
    if (!this.state.token)
      return (
        <LoginComponent lock={this.lock} show={this.showLock}/>
      );
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
