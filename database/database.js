const Sequelize = require('sequelize')

const connection = new Sequelize('guiapress', 'root', 'Jo08012007',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection