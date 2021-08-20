const mongoose = require("mongoose");
const Validator = require("validatorjs");
const { ErrorConstants } = require("../utils/constants");
const { ValidationError, firstError } = require("../utils/error");
const Schema = mongoose.Schema;

const skinsSchema = new Schema(
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

const addSkins = (body) => {
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
      let data = await new Skins(body).save();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: ErrorConstants.SKIN_ALREADY_ADDED || err.message });
    }
  });
};

const getSkins = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Skins.find();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const patchSkins = (id, name) => {
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
      let data = await findSkinsById(id);
      data.name = name;
      await data.save();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: ErrorConstants.SKIN_NOT_FOUND ||err.message });
    }
  });
};

const findSkinsById = (id) => {
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
      let data = await Skins.findById(id);
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const deleteSkinsById = (id) => {
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
      let data = await Skins.findById(id).deleteOne();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const deleteAllSkins = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Skins.deleteMany();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const Skins = mongoose.model("Skins", skinsSchema);
module.exports = {
  Skins,
  addSkins,
  getSkins,
  findSkinsById,
  patchSkins,
  deleteSkinsById,
  deleteAllSkins,
};
