const { auth } = require("../middleware/auth");
const express = require("express");
const {beak, comb, eye, wattle, skin, stripe} = require("../sequelize/models");

const {
  addBeak,
  getBeak,
  patchBeak,
  deleteBeakById,
  deleteAllBeak,
  findBeakById,
} = require("../models/beak");

const {
  addWattle,
  getWattle,
  patchWattle,
  deleteWattleById,
  deleteAllWattle,
  findWattleById,
} = require("../models/wattle");

const {
  addComb,
  getComb,
  patchComb,
  deleteCombById,
  deleteAllComb,
  findCombById,
} = require("../models/comb");

const {
  addEyes,
  getEyes,
  patchEyes,
  deleteEyesById,
  deleteAllEyes,
  findEyesById,
} = require("../models/eyes");

const {
  addStripes,
  getStripes,
  patchStripes,
  deleteStripesById,
  deleteAllStripes,
  findStripesById,
} = require("../models/stripes");

const {
  addSkins,
  getSkins,
  patchSkins,
  deleteSkinsById,
  deleteAllSkins,
  findSkinsById,
} = require("../models/skins");

const app = express.Router();

//----------------------------Beak---------------------------
app.post("/beak", auth, async (req, res) => {
  try {
    //var data = await addBeak(req.body);
    const {name} = req.body;
    const data = await beak.create({name})
    res.status(201).json(data);
  } catch (err) {
    if(err.message==="Validation error"){
     return res.status(400).json({message:'Beak Already Added'});
    }
    res.status(400).json({message:err.message});
  }
});

app.get("/beak", auth, async (req, res) => {
  try {
    //var data = await getBeak();
    const data = await beak.findAll();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.get("/beakById", auth, async (req, res) => {
  try {
    const data = await beak.findOne({where:{_id:req.query.id}})
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.patch("/beak", auth, async (req, res) => {
  var body = req.body;
  try {
    var data = await beak.findOne({where:{_id:body.id}});
    data.name = body.name
    await data.save()
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/beakById", auth, async (req, res) => {
  var body = req.query;
  try {
    const data=await beak.findOne({where:{_id:req.query.id}});
    await data.destroy();
    res.json();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/beak", auth, async (req, res) => {
  try {
    await deleteAllBeak();
    res.json();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//----------------------------Wattle---------------------------
app.post("/wattle", auth, async (req, res) => {
  try {
    const {name} = req.body;
    const data = await wattle.create({name})
    res.status(201).json(data);
  } catch (err) {
    if(err.message==="Validation error"){
      return res.status(400).json({message:'Wattle Already Added'});
     }
     res.status(400).json({message:err.message});
   }
});

app.get("/wattle", auth, async (req, res) => {
  try {
    const data = await wattle.findAll();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.get("/wattleById", auth, async (req, res) => {
  try {
    const data = await wattle.findOne({where:{_id:req.query.id}})
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.patch("/wattle", auth, async (req, res) => {
  var body = req.body;
  try {
    var data = await wattle.findOne({where:{_id:body.id}});
    data.name = body.name
    await data.save()
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/wattleById", auth, async (req, res) => {
  var body = req.query;
  try {
    const data=await wattle.findOne({where:{_id:req.query.id}});
    await data.destroy();
    res.json();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/wattle", auth, async (req, res) => {
  try {
    await deleteAllWattle();
    res.json();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//----------------------------Comb---------------------------
app.post("/comb", auth, async (req, res) => {
  try {
    const {name} = req.body;
    const data = await comb.create({name})
    res.status(201).json(data);
  } catch (err) {
    if(err.message==="Validation error"){
      return res.status(400).json({message:'Wattle Already Added'});
     }
     res.status(400).json({message:err.message});
   }
});

app.get("/comb", auth, async (req, res) => {
  try {
    const data = await comb.findAll();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.get("/combById", auth, async (req, res) => {
  try {
    const data = await comb.findOne({where:{_id:req.query.id}})
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.patch("/comb", auth, async (req, res) => {
  var body = req.body;
  try {
    var data = await comb.findOne({where:{_id:body.id}});
    data.name = body.name
    await data.save()
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/combById", auth, async (req, res) => {
  var body = req.query;
  try {
    const data=await comb.findOne({where:{_id:req.query.id}});
    await data.destroy();
    res.json();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/comb", auth, async (req, res) => {
  try {
    await deleteAllComb();
    res.json();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//----------------------------Eyes---------------------------
app.post("/eyes", auth, async (req, res) => {
  try {
    const {name} = req.body;
    const data = await eye.create({name})
    res.status(201).json(data);
  } catch (err) {
    if(err.message==="Validation error"){
      return res.status(400).json({message:'Eye Already Added'});
     }
     res.status(400).json({message:err.message});
   }
});

app.get("/eyes", auth, async (req, res) => {
  try {
    const data = await eye.findAll();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.get("/eyesById", auth, async (req, res) => {
  try {
    const data = await eye.findOne({where:{_id:req.query.id}})
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.patch("/eyes", auth, async (req, res) => {
  var body = req.body;
  try {
    var data = await eye.findOne({where:{_id:body.id}});
    data.name = body.name
    await data.save()
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/eyesById", auth, async (req, res) => {
  var body = req.query;
  try {
    const data=await eye.findOne({where:{_id:req.query.id}});
    await data.destroy();
    res.json();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/eyes", auth, async (req, res) => {
  try {
    await deleteAllEyes();
    res.json();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//----------------------------Stripes---------------------------
app.post("/stripes", auth, async (req, res) => {
  try {
    const {name} = req.body;
    const data = await stripe.create({name})
    res.status(201).json(data);
  } catch (err) {
    if(err.message==="Validation error"){
      return res.status(400).json({message:'Stripe Already Added'});
     }
     res.status(400).json({message:err.message});
   }
});

app.get("/stripes", auth, async (req, res) => {
  try {
    const data = await stripe.findAll();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.get("/stripesById", auth, async (req, res) => {
  try {
    const data = await stripe.findOne({where:{_id:req.query.id}})
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.patch("/stripes", auth, async (req, res) => {
  var body = req.body;
  try {
    var data = await stripe.findOne({where:{_id:body.id}});
    data.name = body.name
    await data.save()
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/stripesById", auth, async (req, res) => {
  var body = req.query;
  try {
    const data=await stripe.findOne({where:{_id:req.query.id}});
    await data.destroy();
    res.json();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/stripes", auth, async (req, res) => {
  try {
    await deleteAllStripes();
    res.json();
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//----------------------------Skin---------------------------
app.post("/skins", auth, async (req, res) => {
  try {
    const {name} = req.body;
    const data = await skin.create({name})
    res.status(201).json(data);
  } catch (err) {
    if(err.message==="Validation error"){
      return res.status(400).json({message:'Skin Already Added'});
     }
     res.status(400).json({message:err.message});
   }
});

app.get("/skins", auth, async (req, res) => {
  try {
    const data = await skin.findAll();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.get("/skinsById", auth, async (req, res) => {
  try {
    const data = await skin.findOne({where:{_id:req.query.id}})
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.patch("/skins", auth, async (req, res) => {
  var body = req.body;
  try {
    var data = await skin.findOne({where:{_id:body.id}});
    data.name = body.name
    await data.save()
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

app.delete("/skinsById", auth, async (req, res) => {
  var body = req.query;
  try {
    const data=await skin.findOne({where:{_id:req.query.id}});
    await data.destroy();
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
