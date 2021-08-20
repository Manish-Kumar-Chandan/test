const mongoose = require("mongoose");
const Validator = require("validatorjs");
const { ErrorConstants } = require("../utils/constants");
const { ValidationError, firstError } = require("../utils/error");
const Schema = mongoose.Schema;

const combSchema = new Schema(
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

const addComb = (body) => {
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
      let data = await new Comb(body).save();
      resolve(data);
    } catch (err) {
      reject({ message: ErrorConstants.COMB_ALREADY_ADDED });
    }
  });
};

const getComb = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Comb.find();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const patchComb = (id, name) => {
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
      let data = await findCombById(id);
      data.name = name;
      await data.save();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const findCombById = (id) => {
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
      let data = await Comb.findById(id);
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const deleteCombById = (id) => {
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
      let data = await Comb.findById(id).deleteOne();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const deleteAllComb = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Comb.deleteMany();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const Comb = mongoose.model("Comb", combSchema);
module.exports = {
  Comb,
  addComb,
  getComb,
  findCombById,
  patchComb,
  deleteCombById,
  deleteAllComb,
};
