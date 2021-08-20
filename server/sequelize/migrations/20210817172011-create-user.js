'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
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
    await queryInterface.dropTable('users');
  }
};