//deepFreeze = require('../node_modules/deep-freeze');
//expect = require('../node_modules/expect');

const generateId = (name) => name.toLowerCase().split(" ").join("-");

export default generateId;
