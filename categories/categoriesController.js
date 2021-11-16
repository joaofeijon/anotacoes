//express
const express = require('express')
const router = express.Router()

//slugify routes
const slugify = require('slugify')

//modles
const Category = require('./Category.js')
const Article = require('../articles/Article')

//middleware
const adminAuth = require('../middlewares/adminAuth.js')

router.get('/admin/categories/new', adminAuth, (req, res) => {
    res.render('admin/categories/new.ejs')
})

router.post('/categories/save', adminAuth, (req, res) => {
    var title = req.body.title
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/admin/categories')
        })
    }else{
        res.redirect('/admin/categories/new')
    }
})

router.get('/admin/categories', adminAuth,(req, res) => {

    Category.findAll().then((categories) => {
        res.render('admin/categories/index.ejs', {categories: categories})
    })

})


//deletar
router.post('/categories/delete', adminAuth,(req, res) => {
    var id = req.body.id
    if(id != undefined){

        if(isNaN(id)){
            res.redirect('/admin/categories')
           
        }else{//ser na for numero
            Category.destroy({
                where: {id: id}
            }).then(() => {res.redirect('/admin/categories')})
        }
            
    }else{//null
        res.redirect('/admin/categories')
    }
})

//editar
router.get('/admin/categories/edit/:id',adminAuth, (req, res) => {
    var id = req.params.id

    if(isNaN(id)){
        res.redirect('/admin/categories')
    }

    Category.findByPk(id).then((category) =>{
        if (category != undefined){

            res.render('admin/categories/edit.ejs', {category: category})

        }else{
            res.redirect('/admin/categories')
        }
    }).catch((err) => {
        res.redirect('/admin/categories')
    })
})


router.post('/categories/update', adminAuth,(req, res) => {
    var id = req.body.id
    var title = req.body.title

    Category.update({title: title, slug: slugify(title)}, {where: {id: id}}).then(() => {
        res.redirect('/admin/categories')
    })
})

//uma rota que pega o paramento pela url e busca no banco de dados todos os articos nessa categoria
router.get('/categories/:slug', (req, res) => {
    var slug = req.params.slug

    Category.findOne({
        where: {slug: slug}
    }).then((category) => {
        if(category != undefined){
            Article.findAll({
                where: {categoryId: category.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then((articles) => {
                Category.findAll().then((categories) => {
                    res.render('admin/articles/view', {articles: articles, categories: categories})
                })
            })
        }else{
            res.redirect('/')
        }
    })
})

module.exports = router

module.exports = router