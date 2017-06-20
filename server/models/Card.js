const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let CardSchema = new Schema({
    name: String,
    cardType: Number
});

mongoose.model('Card', CardSchema);