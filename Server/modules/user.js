const mongoose = require("mongoose");
const { ObjectID } = require("bson");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const { bool } = require("joi");

const userSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  id: ObjectID,
  name: { type: String, required: true, minlength: 3 }, // requierd field
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  //gender: { type: String, required: true, enum: ["Male", "Female"], lowercase: true, trim: true },
  //age: { type: Number, min: 18, set/get: v => Math.round(v)},
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      name: this.name,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};
const user = mongoose.model("User", userSchema);

function Validate(user) {
  const schema = {
    name: joi.string().min(5).max(50).required(),
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = user;
exports.Validate = Validate;
