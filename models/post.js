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
    },
    c_date:{
      type: DataTypes.DATE,
      allowNull: false
    },
    views:{
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0
    }
  }, {});
  post.associate = function(models) {
    // associations can be defined here
  };
  return post;
};