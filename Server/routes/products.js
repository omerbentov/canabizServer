const express = require("express");
const _ = require("lodash");
const { Product, Validate } = require("../modules/product");
const auth = require("../middleware/auth");
const { keys } = require("lodash");

const router = express.Router();

var m_db;

function AssignConnection(i_db) {
  m_db = i_db;
}

// post - add product
router.post("/", [auth.user, auth.admin], async (req, res) => {
  const user = new Product(_.pick(req.body, ["name", "shape", "ish", "price"]));

  let result = await user.save();
  res.send(result);
});

//get all product
router.get("/all", async (req, res) => {
  var products = await Product.find();

  console.log(products);
  res.send(products);
});

//get spec product
router.get("/:product_id", async (req, res) => {
  const products = await Product.find({ _id: req.params.product_id });
  console.log(products);
  res.send(products);
});

//update product
router.put("/", [auth.user, auth.admin], async (req, res) => {
  const UpdatedFlower = await Product.updateMany(
    //find
    { _id: req.body.product_id },
    {
      //set
      $set: {
        name: req.body.new_name,
      },
    }
  );

  res.send(UpdatedFlower);
});

//delete product
router.delete("/", [auth.user, auth.admin], async (req, res) => {
  const deletedFlower = await Product.deleteMany({
    _id: req.body.product_id,
  });

  res.send(deletedFlower);
});

exports.router = router;
exports.AssignConnection = AssignConnection;
