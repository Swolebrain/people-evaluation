import $ from 'jquery';
import {API_URL} from './globals';

const updateServer = ({evals, coreValues, otherManagers}) => {
  let data = {
    user: JSON.parse(localStorage.getItem('profile')).upn,
    state: {evals, coreValues}
  };
  localStorage.setItem("state", JSON.stringify(data));
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