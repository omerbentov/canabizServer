const mongoose = require("mongoose");
const { ObjectID } = require("bson");

const Company = mongoose.model(
  "Company",
  new mongoose.Schema({
    date: { type: Date, default: Date.now },
    id: ObjectID,
    name: { type: String, required: true, minlength: 1 },
    adress: { type: String, required: true, minlength: 1 },
    phoneNumber: { type: Number, required: true, min: 9, max: 13 },
  })
);

function Validate() {}

exports.Company = Company;
exports.Validate = Validate;
