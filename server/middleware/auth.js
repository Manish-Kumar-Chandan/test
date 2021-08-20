const { User } = require("../models/user");
const { user } = require("../sequelize/models");
const config = require("../config/config").get(process.env.NODE_ENV);
const jwt = require("jsonwebtoken");

let auth = (req, res, next) => {
  let token = req.cookies.auth;
  jwt.verify(token, config.SECRET, async function(err, decoded) {
    if(err) return next(err);
    const find = await user.findOne({where:{ _id: decoded, token: token }})
    if (!find) return res.json({ error: true });
    req.token = token;
    req.user = find;
    next();
  });
    // User.verifyToken(token, (err, user) => {
    // if (err) return res.json({ error: true });
    // if (!user) return res.json({ error: true });
    // req.token = token;
    // req.user = user;
    // next();
  //});
};

module.exports = { auth };
