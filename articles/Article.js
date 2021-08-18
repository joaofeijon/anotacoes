const Sequelize = require('sequelize')
const connection = require('../database/database.js')
const Category = require('../categories/Category.js')

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }

})

Category.hasMany(Article)// N - 1, uma categoria para varios artigos

Article.belongsTo(Category) // 1 - 1, um artigo pertence a uma categoria

//Article.sync({force: true})// roda so uma vez

module.exports = Article