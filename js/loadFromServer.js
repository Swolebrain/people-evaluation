const $ = require('jquery');
const URL = 'https://apps.techlaunch.io:8008/api?';

function loadFromServer(store, cb){
  if (localStorage && localStorage.getItem("profile")){
    let user = JSON.parse(localStorage.getItem("profile")).upn;
    $.ajax({
      url: URL,
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
}

export default loadFromServer;
