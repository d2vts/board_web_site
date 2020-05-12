'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title:{
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content:{
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
    post.belongsTo(models.user,{
      foreignKey:"user_id",onDelete: 'cascade'
  });
  };
  return post;
};