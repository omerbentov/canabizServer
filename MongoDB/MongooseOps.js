const mongoose = require("mongoose");
const { ObjectID } = require("bson");

const connectionString =
  "mongodb+srv://OmerBentov:1234123121omer@cluster0.rqspd.azure.mongodb.net/CanaRate?retryWrites=true&w=majority";
var m_con;

async function Connect() {
  const con = await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log("Connected to MongoDB...");
  m_con = con;
  return con;
}

exports.Connect = Connect;
exports.con = m_con;
