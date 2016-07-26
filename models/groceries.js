var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var grocerySchema = new Schema({
  itemName: String,
  quantity: Number
})

var Grocery = mongoose.model('Grocery', grocerySchema);

module.exports = Grocery;
