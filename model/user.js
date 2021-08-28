const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  age: Number,
  designation: String,
});

module.exports = mongoose.model("User", userSchema);
