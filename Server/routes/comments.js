const auth = require("../middleware/auth");
const express = require("express");
const mongoose = require("mongoose");
const { Comment, Validate } = require("../modules/comment");
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
    const comment = new Comment(
      _.pick(req.body, [
        "product_id",
        "user_id",
        "user_name",
        "message",
        "score",
      ])
    );
    let result = await comment.save();
    console.log(result);
    res.send(result);
  }
);

//new
router.get(
  "/byProduct/:product_id",
  /*auth.user,*/ async (req, res) => {
    var comments;
    comments = await Comment.find({ product_id: req.params.product_id }).sort({
      date: -1,
    });

    // // find avarage
    // let sum = 0;
    // comments.forEach((comment) => (sum += comment.score));
    // let avarage = sum / comments.length;
    // comments.push({ avarage: avarage });
    console.log(comments);
    res.send(comments);
  }
);

// get all comments
router.get(
  "/",
  /*auth.user,*/ async (req, res) => {
    var comments = await Comment.find();
    res.send(comments);
  }
);

//update comment message
router.put("/all", async (req, res) => {
  const updateComment = await Comment.updateMany(
    //find
    { user_id: req.body.user },
    {
      //set
      $set: {
        message: req.body.new_message,
      },
    }
  );

  res.send(updateComment);
});

// delete comment
router.delete("/", [auth.user, auth.admin], async (req, res) => {
  const deletedComment = await Comment.deleteMany({
    _id: req.body.comment_id,
  });

  res.send(deletedComment);
});

exports.router = router;
exports.AssignConnection = AssignConnection;
