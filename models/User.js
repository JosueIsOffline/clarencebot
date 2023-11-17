

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',  {
        user: {
            type: DataTypes.STRING,
            allowNull: false
        },
        discriminator: { 
            type: DataTypes.STRING,
            allowNull: false
        },
          
    })

    return User
}