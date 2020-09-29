const express = require("express");
const { User, validate } = require("../modules/user");
const _ = require("lodash");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
//const { config } = require("process");
const config = require("config");

// LogIn
router.post("/", async (req, res) => {
  // validatin needed fix
  //  // const { error } = Validate(req.body);
  //  // if (error) return res.status(400).send(error.details[0].message);

  // unique email
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  //match password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send(token);
});

function Validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
}

exports.router = router;
