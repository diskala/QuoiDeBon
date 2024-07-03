 const { Sequelize, DataTypes } = require('sequelize');

module.exports=(sequelize)=>{

    const Notification = sequelize.define('notification', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        recetteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        viewed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
    return Notification;
};

