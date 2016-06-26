const $ = require('jquery');
const URL = 'http://fvi-grad.com:8008/api?';

function loadFromServer(store){
  if (localStorage && localStorage.getItem("profile")){
    let user = JSON.parse(localStorage.getItem("profile")).upn;
    $.ajax({
      url: URL,
      data: {user},
      headers: {
        authorization: "Bearer "+localStorage.getItem('token')
      },
      success: function(resp, txt, xhr){
        console.log("GET response: "+resp);
        store.dispatch({type: "HYDRATE", newState: JSON.parse(resp).state});
      }
    });
  }
}

export default loadFromServer;
