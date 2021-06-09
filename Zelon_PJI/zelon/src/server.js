//servidor
const express =require('express')
const server = express()

const {
    pageLanding,
    pageSecond,
    pageQuiz,
    pageSobre,
    pageSaveQuiz,
    saveQuiz
} = require('./pages')

//Configurando nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})
//inicio e configuração do servidor
server
//configurar arquivos estáticos
.use(express.static("public"))
//rotas de aplicação
.use(express.urlencoded({ extended: true }))

.get("/", pageLanding)
.get("/second-page", pageSecond)
.get("/quiz", pageQuiz)
.get("/sobre", pageSobre)
.get("/save", pageSaveQuiz)
.post("/saveQuiz", saveQuiz)
//start do servidor
.listen(5000)