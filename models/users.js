const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    let user = sequelize.define("User", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },    
        email: {
            filed: "email",
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        password: {
            field: "password",
            type: DataTypes.STRING(30),
            allowNull: false
        } ,
        nickname: {
            field: "nickname",
            type: DataTypes.STRING(30),
            allowNull: false
        } ,
        phone: {
            field: "phone",
            type: DataTypes.STRING(30),
            allowNull: false
        } ,
        area: {
            field: "area",
            type: DataTypes.STRING(50),
            allowNull: true
        } 
        ,
        gender: {
            field: "gender",
            type: DataTypes.STRING(30),
            allowNull: false
        } 
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: "user_info",
        timestamps: true,
        paranoid : true
    });
    return user;
}
