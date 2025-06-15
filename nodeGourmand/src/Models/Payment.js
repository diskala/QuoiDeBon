const { Sequelize , DataTypes} = require ('sequelize');

module.exports= (Sequelize)=>{
    const stripePayment =Sequelize.define('payment',{
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        success:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },

        
    })

    
}