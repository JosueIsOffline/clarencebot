

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',  {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
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