const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')
const Article = require('./Article')
const slugify = require('slugify')

router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then((articles) => {
        res.render('admin/articles/index.ejs', {
            articles: articles
        })
    })
})

router.get('/admin/article/new', (req, res) => {
    Category.findAll().then((categories) => {
        res.render('admin/articles/new.ejs', {categories:categories})
    })
    
})

router.post('/articles/save', (req, res) => {
    var title = req.body.title
    var body =  req.body.body
    var category = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect('/admin/articles')
    })
})


//deletar
router.post('/articles/delete', (req, res) => {
    var id = req.body.id
    if(id != undefined){

        if(isNaN(id)){
            res.redirect('/admin/articles')
           
        }else{//ser na for numero
            Article.destroy({
                where: {id: id}
            }).then(() => {res.redirect('/admin/articles')})
        }
            
    }else{//null
        res.redirect('/admin/categories')
    }
})

module.exports = router