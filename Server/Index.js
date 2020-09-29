const express = require("express");
var bodyParser = require("body-parser");
const config = require("config");
var cors = require("cors");

const users = require("./routes/users");
const products = require("./routes/products");
const comments = require("./routes/comments");
const compenies = require("./routes/compenies");
const auth = require("../Server/routes/auth");

const app = express();
const m_MongoCon = require("../MongoDB/MongooseOps");

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defiend.");
  process.exit(1);
}
// init db connection
m_MongoCon.Connect().then((con) => {
  users.AssignConnection(m_MongoCon);
  products.AssignConnection(m_MongoCon);
  comments.AssignConnection(m_MongoCon);
});

//global midelwares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set routes
app.use("/users", users.router);
app.use("/products", products.router);
app.use("/comments", comments.router);
app.use("/compenies", compenies.router);
app.use("/auth", auth.router);

app.listen(3000);

exports.Connection = m_MongoCon;
