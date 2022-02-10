const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect("localhost:27017/cognisent");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  fullName: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.post("/signup", (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        fullName: req.body.fullName,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({ message: "Signup complete." });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

module.exports = router;
