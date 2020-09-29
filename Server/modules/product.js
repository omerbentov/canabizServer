const mongoose = require("mongoose");
const { ObjectID } = require("bson");

const product = mongoose.model(
  "products",
  new mongoose.Schema({
    date: { type: Date, default: Date.now },
    id: ObjectID,
    name: { type: String, required: true, minlength: 2 }, // requierd field
    shape: {
      type: String,
      required: true,
      enum: ["flower", "oil"],
      lowercase: true,
      trim: true,
    },
    ish: {
      type: String,
      required: true,
      enum: ["indica", "sativa", "hybrid"],
      lowercase: true,
      trim: true,
    },
    price: { type: Number, default: 0, min: 0, set: (v) => Math.round(v) },
  })
);

function Validate() {}

exports.Product = product;
exports.Validate = Validate;
