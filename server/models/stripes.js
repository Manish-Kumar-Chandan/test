const mongoose = require("mongoose");
const Validator = require("validatorjs");
const { ErrorConstants } = require("../utils/constants");
const { ValidationError, firstError } = require("../utils/error");
const Schema = mongoose.Schema;

const stripesSchema = new Schema(
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

const addStripes = (body) => {
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
      let data = await new Stripes(body).save();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: ErrorConstants.STRIPE_ALREADY_ADDED || err.message });
    }
  });
};

const getStripes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Stripes.find();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const patchStripes = (id, name) => {
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
      let data = await findStripesById(id);
      data.name = name;
      await data.save();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: ErrorConstants.STRIPE_NOT_FOUND || err.message });
    }
  });
};

const findStripesById = (id) => {
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
      let data = await Stripes.findById(id);
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const deleteStripesById = (id) => {
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
      let data = await Stripes.findById(id).deleteOne();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const deleteAllStripes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Stripes.deleteMany();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const Stripes = mongoose.model("Stripes", stripesSchema);
module.exports = {
  Stripes,
  addStripes,
  getStripes,
  findStripesById,
  patchStripes,
  deleteStripesById,
  deleteAllStripes,
};
