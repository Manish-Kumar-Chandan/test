'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stripe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({chicken}) {
      // define association here
      this.hasMany(chicken, { foreignKey: 'stripeId'})
    }
    toJSON(){
      return {...this.get(), id:undefined}
    }
  };
  stripe.init({
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:"Stripe Name is Required"},
        notEmpty:{msg:"Stripe Name is Required"}
      },
      unique: true
    },
  }, {
    sequelize,
    modelName: 'stripe',
  });
  return stripe;
};