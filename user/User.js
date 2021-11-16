const Sequelize = require('sequelize')
const connection = require('../database/database.js')

const User = connection.define('User', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//User.sync({force: true})// roda so uma vez

module.exports = User