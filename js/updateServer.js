import $ from 'jquery';
import {API_URL} from './globals';

const updateServer = (state) => {
  if (state.otherManagers) delete state.otherManagers;
  let data = {
    user: JSON.parse(localStorage.getItem('profile')).upn,
    state: state
  };
  localStorage.setItem("state", JSON.stringify(state));
  $.ajax({
    url: API_URL,
    method: 'POST',
    headers: {
      authorization: "Bearer "+localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data),
    dataType: 'json',
    success: function(resp, txt, xhr){
      console.log(resp);
    },
    error: function(err){
      console.log(err);
    }
  });
};

export default updateServer;