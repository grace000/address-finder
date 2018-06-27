// Include the Mongoose Dependencies
var mongoose = require("mongoose");


var Schema = mongoose.Schema;

// Create a Schema for capturing clicks. We'll use clickID to update the same clickCounter
var HistorySchema = new Schema({
  location: {
    type: String
  },
  date: {
    type: Date 
  }
});

// Create the Model
var History = mongoose.model("history", HistorySchema);

// Export it for use elsewhere
module.exports = History;
