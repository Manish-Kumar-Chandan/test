const { auth } = require("../middleware/auth");
const express = require("express");
const { chicken, beak, comb, wattle, skin, stripe, eye } = require("../sequelize/models");

const app = express.Router();

//create New Chicken
app.post("/chickens", async (req, res) => {
  const {name,breed,beakUuid, combUuid, eyeUuid, wattleUuid, skinUuid, stripeUuid}=req.body; 
  console.log(req.body)  
  try {
    const beakFound = await beak.findOne({ where: {_id:beakUuid} })
    const combFound = await comb.findOne({ where:{_id:combUuid} })
    const eyeFound = await eye.findOne({ where:{_id:eyeUuid} })
    const wattleFound = await wattle.findOne({ where:{_id:wattleUuid} })
    const skinFound = await skin.findOne({ where:{_id:skinUuid} })
    const stripeFound = await stripe.findOne({ where:{_id:stripeUuid} })
    
    const chickenInfo = await chicken.create({name, 
      breed, 
      beakId: beakFound.id, 
      combId: combFound.id, 
      eyeId: eyeFound.id,
      skinId: skinFound.id,
      wattleId: wattleFound.id,
      stripeId: stripeFound.id
    }); 
      
      res.json({chickens: chickenInfo});
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
});

app.get("/chickens", async(req, res)=>{
  try {
    const chickenInfo = await chicken.findAll({include:[beak,comb,wattle,skin,stripe,eye]});
    res.json({chickens: chickenInfo});
  } catch (error) {
    console.log(err);
    res.status(400).json(err); 
  }
})

module.exports = app;