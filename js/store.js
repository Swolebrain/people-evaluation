//REDUX INCLUDES
const reducer = require('./reducers.js');
const Redux = require('redux');

const { createStore } = Redux;
const store = createStore(reducer);

export default store;
