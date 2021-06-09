module.exports = async function(db, {quizzesValue, allQuestionsValues}){

    const insertedQuizzes = await db.run(`
        INSERT INTO quizzes (
            title,
            imageQuiz
        ) VALUES (
            "${quizzesValue.title}",
            "${quizzesValue.imageQuiz}"
        );
    `)

    quiz_id = insertedQuizzes.lastID

    const insertedAllQuestions = allQuestionsValues.map((allQuestionsValue)=>{
        return db.run(`
        INSERT INTO allQuestions (
            question,
            option0,
            option1,
            option2,
            option3,
            answer,
            textSugest,
            imageSugest,
            textSugestPos,
            quiz_id
        ) VALUES (
            "${allQuestionsValue.question}",
            "${allQuestionsValue.option0}",
            "${allQuestionsValue.option1}",
            "${allQuestionsValue.option2}",
            "${allQuestionsValue.option3}",
            "${allQuestionsValue.answer}",
            "${allQuestionsValue.textSugest}",
            "${allQuestionsValue.imageSugest}",
            "${allQuestionsValue.textSugestPos}",
            "${quiz_id}"
        );
    `)
    })
    
    await Promise.all(insertedAllQuestions)
}