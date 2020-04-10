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
  website: String,
  supportedGames: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Game",
    },
  ],
  founded: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const College = mongoose.model("College", collegeSchema);

// POST a college profile
router.post("/", validUser, upload.single("college"), async (req, res) => {
  // TODO check parameters

  // TODO add support for supportedGames array
  let college = new College({
    fullName: req.body.fullName,
    shortName: req.body.shortName,
    abbreviation: req.body.abbreviation,
    city: req.body.city,
    state: req.body.state,
    logo: req.body.logo,
    description: req.body.description,
    supportedGames: req.body.supportedGames,
    founded: req.body.founded,
    owner: req.user,
  });

  try {
    await college.save();
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

// GET a specific college
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

// GET colleges with specific params
router.get("/", async (req, res) => {
  try {
    let queryConditions = {};

    if (req.query.name) {
      queryConditions.fullName = { $regex: req.query.name, $options: "i" };
    }

    let colleges = await College.find(queryConditions);
    return res.send(colleges);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: College,
  routes: router,
};
