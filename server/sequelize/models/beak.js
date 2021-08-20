'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class beak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({chicken}) {
      // define association here
      this.hasMany(chicken, { foreignKey: 'beakId'})
    }
    toJSON(){
      return {...this.get(), id:undefined}
    }
  };
  beak.init({
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:"Beak Name is Required"},
        notEmpty:{msg:"Beak Name is Required"}
      },
      unique: true
    },
  }, {
    sequelize,
    modelName: 'beak',
  });
  return beak;
};