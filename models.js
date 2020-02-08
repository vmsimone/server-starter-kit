'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//template for all server objects
const yourSchema = mongoose.Schema({
  "title": { type: String, required: true },
  "description": { type: String, required: true }
});

//useful if including nested objects
// yourSchema.virtual('someValue').get(function() {
//   return '';
// });

yourSchema.methods.serialize = function() {
    return {
      id: this._id,
      title: this.title,
      description: this.description
    };
};

const Item = mongoose.model('Item', yourSchema); //collection name defaults to "items"

module.exports = { Item };