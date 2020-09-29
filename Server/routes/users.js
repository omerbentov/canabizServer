const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const { User, validate } = require("../modules/user");
const _ = require("lodash");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const router = express.Router();

var m_db;

function AssignConnection(i_db) {
  m_db = i_db;
}

function ValidatePassword(i_password) {
  const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 6,
  };

  return passwordComplexity(complexityOptions).validate(i_password);
}

async function CryptPassword(i_password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(i_password, salt);

  return hashPassword;
}

// post - add user
router.post("/", async (req, res) => {
  // validatin needed fix
  // // const { error } = user.Validate(req.body);
  // // if (error) return res.status(400).send(error.details[0].message);

  // unique email
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registered.");

  // validate password
  if (!ValidatePassword(req.body.password))
    return res.status(400).send("Password is invalid...");

  //create user
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  //crypt password
  user.password = await CryptPassword(user.password);

  //save result
  let result = await user.save();
  console.log(result);

  //send back
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(result);
});

//get
router.get("/", async (req, res) => {
  const users = await User.find({ _id: req.body.user_id });
  console.log(users);
  res.send(users);
});

router.get("/me", auth.user, async (req, res) => {
  const me = await User.findById(req.user._id).select("-password"); // exclude password
  res.send(me);
});

//update
router.put("/", auth.user, async (req, res) => {
  const UpdatedUser = await User.updateMany(
    //find
    { _id: req.body.user_id },
    {
      //set
      $set: {
        name: req.body.new_name,
      },
    }
  );

  res.send(UpdatedUser);
});

router.delete("/", [auth.user, auth.admin], async (req, res) => {
  const deletedUser = await User.deleteMany({ _id: req.body.user_id });

  res.send(deletedUser);
});

exports.router = router;
exports.AssignConnection = AssignConnection;
