'use strict';

const {hash} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'email must be filled'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password must be filled'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'username must be filled'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(model,option) {
        model.password = hash(model.password)
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Todo)
  };
  return User;
};