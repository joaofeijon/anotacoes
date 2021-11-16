//express
const express = require('express')
const app = express()
const PORT = 8080

//expres-session
const session = require('express-session')
app.use(session({
    secret: 'test',
    cookie: {maxAge: 60000}
}))

//database
const connection = require('./database/database.js')
connection.authenticate().then(() =>{console.log('esta conencato com o mysql')}).catch((err) => {console.log('Houver um erro ' + err)})

//modles
const Article = require('./articles/Article')
const Category = require('./categories/Category')
const User = require('./user/User')

//ejs
app.set('view engine', 'ejs');

//static
app.use(express.static('public'))

//bodyParser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//rota HTTP
//http articles
const articles = require('./articles/articlesController')
app.use('', articles)

//http category
const category = require('./categories/categoriesController')
app.use('', category)

//http user
const user = require('./user/userController')
app.use('', user)

//rotas
app.get('/', (req, res) => {

    Article.findAll({
        order:[
            ['id', 'DESC']
        ],
        limit: 4
    }).then((articles) =>{

        Category.findAll().then(categories => {
            res.render('index.ejs', {articles: articles, categories: categories})
        })
    })


})



app.get('/:slug', (req, res) =>{
    var slug = req.params.slug
    Article.findOne({
        where:{
            slug:slug
        }
    }).then((article) =>{
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render('article.ejs', {article: article, categories: categories})
            })
        }else{
            res.redirect('/')
        }
    }).catch((err) =>{
        res.redirect('/')
    })
})

app.get('/category/:slug', (req, res) => {
    var slug = req.params.slug
    Category.findOne({
        where:{
            slug: slug
        }, include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
             category.findAll().then((categories) => {
                res.render('index', {articles: category.articles, categories: categories})
            })
        }else{
            res.redirect('/')
            console.log('erro 04')
        }
    }).catch(err => {
        res.redirect('/')
        console.log('erro 04')
    })
})



app.listen(PORT, () =>{console.log('O server ta rodando na porta ' + PORT)})