const API_URL = require('./globals').API_URL;
const $ = require('jquery');

function loadFromServer(store, cb){
  console.log("URL:", API_URL);
  if (!localStorage || !localStorage.getItem("profile")) return;
  
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
      if (!resp) return;
      let individualUser = resp.payload;
      console.log("made it here");
      if ( (!individualUser.user || !individualUser.state) && resp.type != "admin" ){
        if (cb && typeof cb == 'function') cb();
        return;
      }
      let ns = individualUser.state;
      if (!ns.evals) ns.evals = [];
      if (resp.type === "admin")
        store.dispatch({type: 'ADMIN_HYDRATE', data: resp.otherManagers});
      if (ns.evals && ns.coreValues)
        store.dispatch({type: "HYDRATE", newState: ns, usertype: resp.type});
      if (cb && typeof cb == 'function') cb();
    }
  });
}

export default loadFromServer;
