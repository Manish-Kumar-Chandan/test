'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON(){
      return {...this.get(), id:undefined}
    }
  };
  user.init({
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: { 
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:"Email is Required"},
        notEmpty:{msg:"Email is Required"}
      },
      unique: true 
    },
    password: { 
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:"Password is Required"},
        notEmpty:{msg:"Password is Required"}
      }
    },
    nickname: { 
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:"Nick Name is Required"},
        notEmpty:{msg:"Nick Name is Required"}
      },
      unique: true 
    },
    role: { 
      type:DataTypes.INTEGER,
      allowNull: false, 
      defaultValue: '0'
    },
    reset: { 
      type:DataTypes.STRING,
      allowNull: false, 
      defaultValue: 'null'
    },
    token:{
      type:DataTypes.STRING
    },
    status: {
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};