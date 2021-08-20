const { auth } = require("../middleware/auth");
const express = require("express");
const config = require("../config/config").get(process.env.NODE_ENV);
const app = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//models
const { User } = require("../models/user");
const {user} = require('../sequelize/models');

app.get("/api/auth", auth, async (req, res) => {
  res.send({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    nickname: req.user.nickname
  });
});

// app.post("/api/login", (req, res) => {
//     User.findOne({ email: req.body.username }, (err, user) => {
//     console.log(user)
//     if (err) return res.json({ success: false });
//     if (!user)
//       return res.json({
//         isAuth: false,
//         message: "Auth Failed {Email not Found}"
//       });
//     if (user) {
//       user.comparePassword(req.body.password, (err, isMatch) => {
//         if (err) return res.json({ success: false });
//         if (!isMatch)
//           return res.json({
//             isAuth: false,
//             message: "Auth Failed {Wrong Password}"
//           });
//         user.generateToken((err, user) => {
//           if (err) return res.status(400).send(err);
//           res.cookie("auth", user.token).send({
//             isAuth: true,
//             id: user._id,
//             email: user.email
//           });
//         });
//       });
//     }
//   });
// });

app.post("/api/login", async(req, res) => {
  try {
    const u=await user.findOne({where:{ email: req.body.username }})
     if (!u)
       return res.json({
         isAuth: false,
         message: "Auth Failed {Email not Found}"
       });
    if (u) {
    const isMatch = bcrypt.compareSync(req.body.password, u.password);
        if (!isMatch)
            return res.json({
            isAuth: false,
            message: "Auth Failed {Wrong Password}"
          });

          var token = jwt.sign(u._id, config.SECRET);
          u.token = token;
          u.save()
          res.cookie("auth", u.token).send({
            isAuth: true,
            id: u._id,
            email: u.email
          });
    }
  } catch (error) {
    console.log(error)
  }
});

app.get("/api/logout", auth, async(req, res) => {
  try {
    console.log(req.cookies.auth)
    let admin = await user.findOne({where:{token:req.cookies.auth}});
    admin.token = null
    admin.save();
    res.status(200).send({msg:'User Logged out'});
  } catch (error) {
    res.status(400).send({error:error.message});
  }
  // req.user.deleteToken(req.token, (err, user) => {
  //   if (err) return res.status(400).send(err);
  //   res.sendStatus(200);
  // });
});

app.post("/api/register", async(req, res) => {
  try {
    let {nickname, email, password, role} = req.body
    let inttostr=JSON.stringify(password)
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(inttostr, salt);
    const data = await user.create({nickname,email,password:hash,role});
    res.status(200).send({success:true,user:data})
  } catch (error) {
    if(error.message==="Validation error"){
      return res.status(400).json({message:'Email and Nick Name should be unique'});
    }
    res.status(400).send(error.message)
  }
});

app.get("/api/users", async(req, res) => {
  try {
    const data= await user.findAll();
    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send(error.message)
  }
  // User.find({}, (err, users) => {
  //   if (err) return res.status(400).send(err);
  //   res.send(users);
  // });
});


module.exports = app;
