const mongoose = require("mongoose");
const { ObjectID } = require("bson");

const comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    date: { type: Date, default: Date.now },
    id: ObjectID,
    product_id: { type: String, required: true },
    user_id: { type: String, required: true },
    user_name: { type: String, required: true, minlength: 1 },
    message: { type: String, required: true, minlength: 1 },
    score: { type: Array, required: false },
  })
);

function Validate() {}

exports.Comment = comment;
exports.Validate = Validate;
