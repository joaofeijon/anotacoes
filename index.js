//express
const express = require('express')
const app = express()
const PORT = 8080

//database
const connection = require('./database/database.js')
connection.authenticate().then(() =>{console.log('esta conencato com o mysql')}).catch((err) => {console.log('Houver um erro ' + err)})

//modles
const Article = require('./articles/Article')
const Category = require('./categories/Category')

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

app.get('/', (req, res) => {

    Article.findAll().then((articles) =>{
        res.render('index.ejs', {articles: articles})
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
            res.render('article', {article:article})
        }else{
            res.redirect('/')
        }
    }).catch((err) =>{
        res.redirect('/')
    })
})

app.listen(PORT, () =>{console.log('O server ta rodando na porta ' + PORT)})