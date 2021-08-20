const mongoose = require("mongoose");
const config = require("../config/config").get(process.env.NODE_ENV);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_I = 10;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  nickname: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    unique: 1
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  reset: {
    type: String,
    default: null
  },
  status: {
    type: Number,
    active: 1
  }
});

userSchema.pre("save", function(next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_I, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function(cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), config.SECRET);
  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.verifyToken = function(token, cb) {
  const user = this;
  jwt.verify(token, config.SECRET, function(err, decode) {
    if (err) return cb(err);
    var usersProjection = {
      __v: false,
      password: false,
      token: false
    };
    user.findOne(
      { _id: decode, token: token },
      usersProjection,
      (err, user) => {
        if (err) return cb(err);
        cb(null, user);
      }
    );
  });
};

userSchema.methods.deleteToken = function(token, cb) {
  var user = this;
  user.update({ $unset: { token: 1 } }, (err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
