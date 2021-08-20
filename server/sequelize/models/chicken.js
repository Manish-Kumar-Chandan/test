'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chicken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({beak, comb, skin, wattle, eye, stripe}) {
      // define association here
      this.belongsTo(beak, { foreignKey: 'beakId'})
      this.belongsTo(comb, { foreignKey: 'combId'})
      this.belongsTo(skin, { foreignKey: 'skinId'})
      this.belongsTo(wattle, { foreignKey: 'wattleId'})
      this.belongsTo(eye, { foreignKey: 'eyeId'})
      this.belongsTo(stripe, { foreignKey: 'stripeId'})
    }
    toJSON(){
      return{...this.get(), id:undefined, beakId:undefined, combId:undefined, skinId:undefined, stripeId:undefined, wattleId:undefined, eyeId:undefined}
    }
  };
  chicken.init({
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:"Chicken Name is Required"},
        notEmpty:{msg:"Chicken Name is Required"}
      },
      unique: true
    },
    breed: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:"Breed is Required"},
        notEmpty:{msg:"Breed is Required"}
      },
      unique: true
    }
  }, {
    sequelize,
    modelName: 'chicken',
  });
  return chicken;
};