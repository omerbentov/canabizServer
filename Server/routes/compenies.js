const auth = require("../middleware/auth");
const express = require("express");
const mongoose = require("mongoose");
const { Company, Validate } = require("../modules/company");
const _ = require("lodash");
const router = express.Router();

var m_db;

function AssignConnection(i_db) {
  m_db = i_db;
}

// post - add comment
router.post(
  "/",
  /*auth.user,*/ async (req, res) => {
    const company = new Company(
      _.pick(req.body, ["name", "usadress", "phoneNumber"])
    );
    let result = await company.save();
    console.log(result);
    res.send(result);
  }
);

router.get(
  "/",
  /*auth.user,*/ async (req, res) => {
    var compenies;
    compenies = await Company.find().sort({
      date: -1,
    });

    console.log(compenies);
    res.send(compenies);
  }
);

exports.router = router;
exports.AssignConnection = AssignConnection;
