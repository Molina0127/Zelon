const Database = require('sqlite-async')

function execute(db){
    return db.exec(`
    CREATE TABLE IF NOT EXISTS quizzes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        imageQuiz TEXT
    );

    CREATE TABLE IF NOT EXISTS allQuestions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT,
        option0 TEXT,
        option1 TEXT,
        option2 TEXT,
        option3 TEXT,
        answer INTEGER,
        textSugest TEXT,
        imageSugest TEXT,
        textSugestPos TEXT,
        quiz_id INTEGER,
        FOREIGN KEY (quiz_id) REFERENCES quizzes (id)
    );
    `)
}

module.exports = Database.open(__dirname+'/database.sqlite').then(execute)