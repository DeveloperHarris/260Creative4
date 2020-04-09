const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const multer = require("multer");
const upload = multer();

const collegeSchema = new mongoose.Schema({
  fullName: String,
  shortName: String,
  abbreviation: String,
  city: String,
  state: String,
  logo: String,
  description: String,
  founded: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.ObjectID,
    ref: "User",
  },
});

const College = mongoose.model("College", collegeSchema);

// POST a college profile
router.post("/", validUser, upload.single("college"), async (req, res) => {
  let college = new College({
    fullName: req.body.fullName,
    shortName: req.body.shortName,
    abbreviation: req.body.abbreviation,
    city: req.body.city,
    state: req.body.state,
    logo: req.body.logo,
    description: req.body.description,
    founded: req.body.founded,
    owner: req.user,
  });

  try {
    await Comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// GET all colleges
router.get("/all", async (req, res) => {
  try {
    let colleges = await College.find().sort({
      fullName: 1,
    });
    return res.send(colleges);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// GET a single college
router.get("/:id", async (req, res) => {
  try {
    let college = await College.findOne({
      _id: req.params.id,
    });
    return res.send(college);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: College,
  routes: router,
};
