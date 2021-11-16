const Sequelize = require('sequelize')

const connection = new Sequelize('database', 'root', 'senha',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection