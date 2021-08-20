const mongoose = require("mongoose");
const Validator = require("validatorjs");
const { ErrorConstants } = require("../utils/constants");
const { ValidationError, firstError } = require("../utils/error");
const { User } = require("./user");
const Schema = mongoose.Schema;

const wattleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: 1,
      index: true,
    },
  },
  { timestamps: true }
);

const addWattle = (body) => {
  const { name } = body;
  const input = {
    name,
  };

  const rules = {
    name: "required",
  };

  const validation = new Validator(input, rules);

  return new Promise(async (resolve, reject) => {
    try {
      if (validation.fails()) throw new ValidationError(firstError(validation));
      let data = await new Wattle(body).save();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: ErrorConstants.WATTLE_ALREDAY_ADDED || err.message });
    }
  });
};

const getWattle = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Wattle.find();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.WATTLE_NOT_FOUND });
    }
  });
};

const patchWattle = (id, name) => {
  const input = {
    id,
    name,
  };

  const rules = {
    id: "required",
    name: "required",
  };

  const validation = new Validator(input, rules);
  return new Promise(async (resolve, reject) => {
    try {
      if (validation.fails()) throw new ValidationError(firstError(validation));
      let data = await findWattleById(id);
      data.name = name;
      await data.save();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: ErrorConstants.WATTLE_NOT_FOUND || err.message });
    }
  });
};

const findWattleById = (id) => {
  const input = {
    id,
  };

  const rules = {
    id: "required",
  };

  const validation = new Validator(input, rules);
  return new Promise(async (resolve, reject) => {
    try {
      if (validation.fails()) throw new ValidationError(firstError(validation));
      let data = await Wattle.findById(id);
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.WATTLE_NOT_FOUND });
    }
  });
};

const deleteWattleById = (id) => {
  const input = {
    id,
  };

  const rules = {
    id: "required",
  };

  const validation = new Validator(input, rules);

  return new Promise(async (resolve, reject) => {
    try {
      if (validation.fails()) throw new ValidationError(firstError(validation));
      let data = await Wattle.findById(id).deleteOne();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.WATTLE_NOT_FOUND });
    }
  });
};

const deleteAllWattle = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Wattle.deleteMany();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.WATTLE_NOT_FOUND });
    }
  });
};

const Wattle = mongoose.model("Wattle", wattleSchema);
module.exports = {
  Wattle,
  addWattle,
  getWattle,
  findWattleById,
  patchWattle,
  deleteWattleById,
  deleteAllWattle,
};
