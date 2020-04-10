const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();

const gameSchema = new mongoose.Schema({
  name: String,
  logo: String,
});

const Game = mongoose.model("Game", gameSchema);

// post new game
router.post("/", validUser, upload.single("game"), async (req, res) => {
  // TODO check parameters

  const game = new Game({
    name: req.body.name,
    logo: req.body.logo,
  });

  try {
    await game.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all games
router.get("/all", async (req, res) => {
  try {
    let games = await Game.find().sort({
      name: 1,
    });
    return res.send(games);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get single game
router.get("/:id", async (req, res) => {
  try {
    let game = Game.findOne({
      _id: req.params.id,
    });

    return res.send(game);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
