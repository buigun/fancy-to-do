require('dotenv').config()
const axios = require('axios')

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title must be filled'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Date must be filled'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    language: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(model,option) {

        return axios({
          headers: {
            'Authorization': `Bearer ${process.env.API_KEY}`
          },
          method: 'post',
          url: 'https://ws.detectlanguage.com/0.2/detect',
          data: {
            'q': `${model.title} ${model.description}`
          }
        })
        .then(result=>{

          let input = ''
          if (result.data.data.detections[0].language == 'ms' || result.data.data.detections[0].language == 'id') {
            input = `Bahasa Indonesia / Melayu`
          } else if (result.data.data.detections[0].language == 'en') {
            input = 'English'
          }

          model.language = input
        })
        .catch(err=>{
          console.log(err)
        })

      }
    }
  });
  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};