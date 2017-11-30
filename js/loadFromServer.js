import {API_URL} from './globals';
const $ = require('jquery');

function loadFromServer(store, cb){
  if (!localStorage || !localStorage.getItem("profile")) return;

  console.log(API_URL);
  let user = JSON.parse(localStorage.getItem("profile")).upn;
  $.ajax({
    url: API_URL,
    data: {user},
    headers: {
      authorization: "Bearer "+localStorage.getItem('token')
    },
    success: function(resp, txt, xhr){
      console.log("GET response: ");
      console.log(resp);
      if (!resp){
        console.log("loadFromServer didn't get a response");
        return;
      }
      let individualUser = resp.payload;
      if ( (!individualUser.user || !individualUser.state) && resp.type !== "admin" ){
        if (typeof cb === 'function') cb();
        return;
      }
      let ns = individualUser.state;
      if (!ns.evals) ns.evals = [];
      if (resp.type === "admin"){
        console.log("dispatching admin hydrate");
        store.dispatch({type: 'ADMIN_HYDRATE', data: resp.otherManagers});
      }
      if (ns.evals && ns.coreValues){
        let action = {type: "HYDRATE", newState: ns, usertype: resp.type}
        console.log("dispatching hydrate action:");
        console.log(action);
        store.dispatch(action);
      }
      if (typeof cb == 'function') cb();

    }
  });
  
}

export default loadFromServer;
