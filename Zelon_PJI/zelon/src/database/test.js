const Database = require('./db')
const createQuiz = require('./createQuiz')

Database.then(async (db) => {
    //inserir dados
    quizzesValue = {
        title:"Tinha esquecido de mudar kkkkk",
        imageQuiz:"https://www.alura.com.br/artigos/assets/uploads/2018/10/arts-arts-and-crafts-concept-1314543.jpg",
    }

    //Os ids virão pelo banco de dados
    allQuestionsValues = [
        {
            question: "Quiz 5?",
            option0: "Errado",
            option1: "Errado",
            option2: "Erradin",
            option3: "Certo",
            answer: 3,
            textSugest:"Uma Sugestão",
            imageSugest:"https://www.gettyimages.pt/gi-resources/images/500px/983794168.jpg",
            textSugestPos:"Texto depois",
        },
        {
            question: "Quiz 5?",
            option0: "Errado",
            option1: "Errado",
            option2: "Erradin",
            option3: "Certo",
            answer: 3,
            textSugest:"Outra sugestão",
            imageSugest:"https://www.gettyimages.pt/gi-resources/images/500px/983794168.jpg",
            textSugestPos:"Texto depois",
        }
    ]

    await createQuiz(db, {quizzesValue ,allQuestionsValues})

    //consultar dados

    //todos as questions

    // const selectedAllQuestions = await db.all("SELECT * FROM allQuestions")
    // console.log(selectedAllQuestions)

    // const selectQuizzesAndQuestions = await db.all(`
    //     SELECT quizzes.*, allquestions.*
    //     FROM quizzes
    //     JOIN allquestions ON (allquestions.quiz_id = quizzes.id)
    //     WHERE allquestions.quiz_id = 1;
    // `)
    // console.log(selectQuizzesAndQuestions)


    // const selectClassesSchedules = await db.all(`
    //     SELECT allQuestions.*
    //     FROM allQuestions
    //     WHERE allQuestions.quiz_id = "1"
    // `)

    // console.log(selectClassesSchedules)

})