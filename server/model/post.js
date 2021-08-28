const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  content: String,
  userID: String,
});

module.exports = mongoose.model("Post", postSchema);
