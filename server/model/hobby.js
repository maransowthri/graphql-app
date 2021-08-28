const mongoose = require("mongoose");
const { Schema } = mongoose;

const hobbySchema = new Schema({
  title: String,
  userID: String
});

module.exports = mongoose.model("Hobby", hobbySchema);