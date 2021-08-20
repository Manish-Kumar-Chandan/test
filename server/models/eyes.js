const mongoose = require("mongoose");
const Validator = require("validatorjs");
const { ErrorConstants } = require("../utils/constants");
const { ValidationError, firstError } = require("../utils/error");
const Schema = mongoose.Schema;

const eyesSchema = new Schema(
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

const addEyes = (body) => {
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
      let data = await new Eyes(body).save();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: ErrorConstants.EYE_ALREADY_ADDED || err.message});
    }
  });
};

const getEyes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Eyes.find();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const patchEyes = (id, name) => {
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
      let data = await findEyesById(id);
      data.name = name;
      await data.save();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: ErrorConstants.EYE_NOT_FOUND || err.message});
    }
  });
};

const findEyesById = (id) => {
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
      let data = await Eyes.findById(id);
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const deleteEyesById = (id) => {
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
      let data = await Eyes.findById(id).deleteOne();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const deleteAllEyes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Eyes.deleteMany();
      resolve(data);
    } catch (err) {
      console.error(err);
      reject({ message: err.message || ErrorConstants.COMB_NOT_FOUND });
    }
  });
};

const Eyes = mongoose.model("Eyes", eyesSchema);
module.exports = {
  Eyes,
  addEyes,
  getEyes,
  findEyesById,
  patchEyes,
  deleteEyesById,
  deleteAllEyes,
};
