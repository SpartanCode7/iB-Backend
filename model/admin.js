const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

const Admin = mongoose.model("admins", adminSchema);

module.exports = Admin;
