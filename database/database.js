const Sequelize = require('sequelize')

<<<<<<< HEAD
const connection = new Sequelize('database', 'root', 'senha',{
=======
const connection = new Sequelize('guiapress', 'root', 'senha',{
>>>>>>> a44d240989faaf47d6291acaa00443a884629624
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection
