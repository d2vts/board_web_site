'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false},
    nickname: {
      type:DataTypes.STRING,
      allowNull: false},
    phone: {
      type:DataTypes.STRING,
      allowNull: false},
    area: {
      type: DataTypes.STRING,
      allowNull: false},
    gender: {
      type:DataTypes.STRING,
      allowNull: false}
  }, {});
  user.associate = function (models) {
    user.hasMany(models.post);
    user.hasMany(models.reply);
  };
  return user;
};