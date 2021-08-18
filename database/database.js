const Sequelize = require('sequelize')

const connection = new Sequelize('guiapress', 'root', 'senha',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection
