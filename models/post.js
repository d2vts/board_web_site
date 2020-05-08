'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title:{
      type: DataTypes.STRING,
      allowNull: false
    },
    writer:{
      type: DataTypes.STRING,
      allowNull: false
    },content:{
      type: DataTypes.TEXT
    },
    views:{
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0
    }
  }, {});
  post.associate = function(models) {
    post.hasMany(models.reply);
  };
  return post;
};