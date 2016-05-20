"use strict";

var EventEmitter = require('events')

class Events extends EventEmitter{

}

const mEmitter = new Events();
module.exports = mEmitter;
