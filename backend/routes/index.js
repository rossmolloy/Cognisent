const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

mongoose.connect("localhost:27017/cognisent");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  phone: { type: String, required: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  contact1: { type: String, required: true },
  contact2: String,
  contact3: String,
  radius: Number,
  location: { latitude: Number, longitude: Number },
});

const User = mongoose.model("User", userSchema);

const updateUser = async (req, res, updates) => {
  User.findOneAndUpdate({ phone: req.params.phone }, updates, { new: true })
    .then((result) => {
      console.log(result);
      return res.status(200).json({ message: "Update complete." });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: err });
    });
};

router.post("/login", async (req, res) => {
  User.find({ phone: req.body.phone }).then((user) => {
    if (user.length < 1) {
      return res.status(400).json({ message: "Login failed." });
    } else {
      bcrypt
        .compare(req.body.password, user[0].password)
        .then((result) => {
          if (result) {
            const token = jwt.sign(
              {
                id: user[0].id,
                phone: user[0].phone,
              },
              "secret",
              { expiresIn: "2d" }
            );
            return res
              .status(200)
              .json({ message: "Login complete.", token: token });
          }

          return res.status(400).json({ message: "Login failed." });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ message: "Login failed." });
        });
    }
  });
});

router.post("/signup", async (req, res) => {
  User.find({ phone: req.body.phone }).then((numOfMatchingAccounts) => {
    if (numOfMatchingAccounts.length >= 1) {
      return res.status(400).json({ message: "User already exists." });
    } else {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const user = new User({
            phone: req.body.phone,
            fullName: req.body.fullName,
            password: hash,
            contact1: req.body.contact1,
            contact2: req.body.contact2,
            contact3: req.body.contact3,
          });
          user
            .save()
            .then((result) => {
              console.log(result);
              return res.status(200).json({ message: "Signup complete." });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({ message: err });
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ message: err });
        });
    }
  });
});

router.get("/user/:phone", async (req, res) => {
  User.find({ phone: req.params.phone }).then((user) => {
    if (user.length < 1) {
      return res.status(400).json({ message: "User retrieval failed." });
    } else {
      const userInfo = JSON.parse(JSON.stringify(user[0]));
      delete userInfo.password;
      return res.status(200).json(userInfo);
    }
  });
});

router.patch("/update/:phone", async (req, res) => {
  let updates = JSON.parse(JSON.stringify(req.body));
  if (req.body.password !== undefined) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        updates.password = hash;
        updateUser(req, res, updates);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: err });
      });
  } else {
    updateUser(req, res, updates);
  }
});

module.exports = router;
