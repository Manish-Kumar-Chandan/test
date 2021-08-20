const { auth } = require("../middleware/auth");
const express = require("express");
const {
  addSkins,
  getSkins,
  patchSkins,
  deleteSkinsById,
  deleteAllSkins,
  findSkinsById,
} = require("../models/skins");
const app = express.Router();

app.post("/skins", auth, async (req, res) => {
  try {
    var data = await addSkins(req.body);
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.get("/skins", auth, async (req, res) => {
  try {
    var data = await getSkins();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.get("/skinsById", auth, async (req, res) => {
  try {
    var data = await findSkinsById(req.query.id);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.patch("/skins", auth, async (req, res) => {
  var body = req.body;
  try {
    var data = await patchSkins(body.id, body.name);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/skinsById", auth, async (req, res) => {
  var body = req.query;
  try {
    await deleteSkinsById(body.id);
    res.json();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/skins", auth, async (req, res) => {
  try {
    await deleteAllSkins();
    res.json();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = app;
