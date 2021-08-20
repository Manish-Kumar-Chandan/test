const mongoose = require("mongoose");
const Validator = require("validatorjs");
const { ErrorConstants } = require("../utils/constants");
const { ValidationError, firstError } = require("../utils/error");
const { User } = require("./user");
const Schema = mongoose.Schema;

const beakSchema = new Schema(
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

const addBeak = (body) => {
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
      let data = await new Beak(body).save();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: ErrorConstants.BEAK_ALREDAY_ADDED || err.message });
    }
  });
};

const getBeak = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Beak.find();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: ErrorConstants.BEAK_NOT_FOUND || err.message });
    }
  });
};

const patchBeak = (id, name) => {
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
      let data = await findBeakById(id);
      data.name = name;
      await data.save();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: ErrorConstants.BEAK_NOT_FOUND || err.message });
    }
  });
};

const findBeakById = (id) => {
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
      let data = await Beak.findById(id);
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.BEAK_NOT_FOUND });
    }
  });
};

const deleteBeakById = (id) => {
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
      let data = await Beak.findById(id).deleteOne();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.BEAK_NOT_FOUND });
    }
  });
};

const deleteAllBeak = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Beak.deleteMany();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.BEAK_NOT_FOUND });
    }
  });
};

const Beak = mongoose.model("Beak", beakSchema);
module.exports = {
  Beak,
  addBeak,
  getBeak,
  findBeakById,
  patchBeak,
  deleteBeakById,
  deleteAllBeak,
};
