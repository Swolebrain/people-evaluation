import React, {Component} from 'react';
import EvaluationList from './EvaluationList.jsx';
import EvaluationGrid from './EvaluationGrid.jsx';
import EvaluationCreator from './EvaluationCreator.jsx';
import CoreValsReminder from './CoreValsReminder.jsx';
import LoginComponent from './LoginComponent.jsx';
import ManagerEvaluationLoader from './ManagerEvaluationLoader.jsx';
import store from '../store.js';
import loadFromServer from '../loadFromServer.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class EvaluationApp extends Component{
  constructor(props){
    super(props);
    this.lock = new Auth0Lock('trDPfReklgtHuU9vMwYtEYBGTz0nuLgp', 'swolebrain.auth0.com');
    this.state = this.getStateBasedOnAuth();
  }
  getStateBasedOnAuth = ()=>{

    const prf = JSON.parse(localStorage.getItem('profile'));
    const token = localStorage.getItem("token");
    if (token && JSON.parse(atob(token.split(".")[1])).exp < new Date().getTime()/1000){
      console.log("token expired", JSON.parse(atob(token.split(".")[1])));
      localStorage.removeItem('profile');
      localStorage.removeItem('token');
      return {store: store.getState()};
    }
    else if (token && prf){
      loadFromServer(store, ()=>this.setState({token, profile: prf}));
    }
    
  }
  showLock = (e) =>{
    e.preventDefault();
    this.lock.show({popup: false}, function(err, profile, idToken){
      if (err){
        alert(err);
        return;
      }
      profile.issued_timestamp = new Date().getTime();
      localStorage.setItem('token', idToken);
      localStorage.setItem('profile', JSON.stringify(profile));
      const callback = ()=>this.setState({token: idToken, profile: profile});
      loadFromServer(store, callback);
    }); //MIGHT NEED TO TAKE THIS OUT
  }
  renderDefaultView = () => (
    <div>
      <EvaluationList coreVals={store.getState().coreValues}
        evals={store.getState().evals}  />
      <div>
        <EvaluationGrid evals={store.getState().evals} />
      </div>
      <div className="bottom-section">
        <EvaluationCreator />
        <CoreValsReminder coreVals={store.getState().coreValues} />
      </div>
    </div>
  );
  renderGridLoader = ()=>(
    <div className="admin-section">
      <h2>Choose a Manager to view their Grid:</h2>
      {store.getState().otherManagers.map((managerObj,i)=>{
        let {user, state:managerState} = managerObj;
        let managerEvals = managerState.evals;
        // console.log("Reading manager eval:");
        // console.log(managerEvals);
        if (!Array.isArray(managerEvals) || managerEvals.length === 0) return null;
        return (
          <ManagerEvaluationLoader key={i} user={user} evals={managerEvals}/>
        );
      })}
    </div>
  );
  render(){
    if (!this.state || !this.state.token)
      return (
        <LoginComponent lock={this.lock} show={this.showLock}/>
      );
    var isAdmin = !!store.getState().otherManagers;
    if (isAdmin)
      return (
        <Router>
          <div>
            <div className="admin-navigation">
              <Link to="/">Manager Grids</Link>
              <Link to="/mygrid">My Grid</Link>
            </div>
            <Route exact path="/" render={this.renderGridLoader} />
            <Route path="/mygrid" render={this.renderDefaultView}/>
          </div>
        </Router>
      );
    //not admin:
    console.log("Rendering non admin UI");
    return this.renderDefaultView();
  }
}


export default EvaluationApp;
