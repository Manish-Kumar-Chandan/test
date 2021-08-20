'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('chickens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      },
      beakId:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      combId:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      eyeId:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      skinId:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      stripeId:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      wattleId:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('chickens');
  }
};