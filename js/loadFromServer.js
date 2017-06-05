const $ = require('jquery');
const URL = 'http://fvi-grad.com:8008/api?';

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
        if (!resp){
          console.log("loadFromServer didn't get a response");
          return;
        }
        let individualUser = resp.payload;
        if (!individualUser.user || !individualUser.state){
          console.log("loadFromServer individualUser has issue - "+JSON.strigify(individualUser));
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
          cb();
          return;
        }
        console.log("#########didn't dispatch any hydrate action");

      }
    });
  }
}

export default loadFromServer;
