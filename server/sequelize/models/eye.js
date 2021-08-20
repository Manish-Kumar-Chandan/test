'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eye extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({chicken}) {
      // define association here
      this.hasMany(chicken, { foreignKey: 'eyeId'})
    }
    toJSON(){
      return {...this.get(), id:undefined}
    }
  };
  eye.init({
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:"Eye Name is Required"},
        notEmpty:{msg:"Eye Name is Required"}
      },
      unique: true
    },
  }, {
    sequelize,
    modelName: 'eye',
  });
  return eye;
};