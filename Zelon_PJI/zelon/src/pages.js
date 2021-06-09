const Database = require('./database/db')

function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageSecond(req, res) {
    const data = req.query
    
    const isNotEmpty = Object.keys(data).length>0
    if(isNotEmpty){
        let queryString = "?quiz_id="+ data.quiz_id

        return res.redirect("/quiz"+queryString)
    }

    const query = `
        SELECT * FROM quizzes
    `

    try {
        const db = await Database
        const quizzes = await db.all(query)

        return res.render("second-page.html",{quizzes})
    } catch (error) {
        console.log(error)
    }
    
}

async function pageQuiz(req, res) {
    const filters = req.query

    const isNotEmpty = Object.keys(filters).length>0
    if(!isNotEmpty){
        filters.quiz_id = 1;
    }
    const query = `
            SELECT *
            FROM allQuestions
            WHERE allQuestions.quiz_id = ${filters.quiz_id}
    `
    const query1 = `
        SELECT * FROM quizzes
        WHERE quizzes.id = ${filters.quiz_id}
    `
    // caso haja erro na hora da consulta do banco de dados.
    try {
        const db = await Database
        const allQuestions = await db.all(query)
        const quizzes = await db.all(query1)

        return res.render("quiz.html",{quizzes, allQuestions, length: allQuestions.length})
    } catch (error) {
        console.log(error)
    }
}

function pageSobre(req, res) {
    return res.render("sobre.html")
}

function pageSaveQuiz(req, res) {
    return res.render("saveQuiz.html")
}

async function saveQuiz(req, res) {
    const createQuiz = require('./database/createQuiz')

    const quizzesValue = {
        title: req.body.title,
        imageQuiz: req.body.imageQuiz
    }


    const allQuestionsValues = req.body.question.map((question, index) => {
        return {
            
            question,
            option0: req.body.option0[index],
            option1: req.body.option1[index],
            option2: req.body.option2[index],
            option3: req.body.option3[index],
            answer: req.body.answer[index],
            textSugest: req.body.textSugest[index],
            imageSugest: req.body.imageSugest[index],
            textSugestPos: req.body.textSugestPos[index]
        }
    })

    try {
        const db = await Database
        await createQuiz(db, { quizzesValue, allQuestionsValues})
        
        let queryString = "?quiz_id="+ quiz_id

        return res.redirect("/quiz" + queryString)
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    pageLanding,
    pageSecond,
    pageQuiz,
    pageSobre,
    pageSaveQuiz,
    saveQuiz
}
