'use strict';
module.exports = (sequelize, DataTypes) => {
  const reply = sequelize.define('reply', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {});

  reply.associate = function(models){
    reply.belongsTo(models.post, {
      foreignKey: "postId"
    })
  };
  reply.associate = function(models){
  reply.belongsTo(models.user,{
    foreignKey:"user_id",onDelete: 'cascade'
  });
};

  return reply;
};