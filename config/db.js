const express = require('express');
const router = express.Router()

//Declare MongoDB 
const mongoose = require('mongoose')
//run method to connect to MongoDB
mongoose.connect(
  "mongodb+srv://spartan:realresearch2022@cluster0.xmfms.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//incase Debbuging
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Database Connected successfully");
});

module.exports = router