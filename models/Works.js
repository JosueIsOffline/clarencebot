const { description } = require("../commands/adminCommnads/portfolio")

module.exports = (sequelize, DataTypes) => {
    const Work = sequelize.define('work', {
        title: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT, 
            allowNull: false
        },
        platform: {
            type: DataTypes.STRING
        },
        stack: {
            type: DataTypes.STRING
        }
    })
}