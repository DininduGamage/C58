const questions = [
    {
        question: "Who ran the first four-minute mile?",
        answers: [
            {text: "Roger Moore", correct: false},
            {text: "Roger Ramjet", correct: false},
            {text: "Roger Bannister", correct: true},
            {text: "Banastre Tarleton", correct: false},
        ]
    },

    {
        question: "In polo, what is a period of play called?",
        answers: [
            {text: "Set", correct: false},
            {text: "Quarter", correct: false},
            {text: "Chukka", correct: true},
            {text: "Half", correct: false},
        ]
    },

    {
        question: "In what sport would one find an Albion round?",
        answers: [
            {text: "Croquet", correct: false},
            {text: "Archery", correct: true},
            {text: "Badminton", correct: false},
            {text: "Tennis", correct: false},
        ]
    },

    {
        question: "In Australian football, what is the maximum number of players allowed on the field at a time?",
        answers: [
            {text: "36", correct: true},
            {text: "14", correct: false},
            {text: "40", correct: false},
            {text: "28", correct: false},
        ]
    },

    {
        question: "How many years old are horses that run in the Kentucky Derby?",
        answers: [
            {text: "4", correct: false},
            {text: "3", correct: true},
            {text: "1", correct: false},
            {text: "2", correct: false},
        ]
    },

    {
        question: "Who is the over-rall highest wicket-taker in Cricket World Cups?",
        answers: [
            {text: "Glenn McGrath", correct: true},
            {text: "Muttiah Muralitharan", correct: false},
            {text: "Jasprit Bumrah", correct: false},
            {text: "Shane Warne", correct: false},
        ]
    },

    {
        question: "Who was the host of first FIFA World Cup?",
        answers: [
            {text: "Uruguay", correct: true},
            {text: "Paraguay", correct: false},
            {text: "Brazil", correct: false},
            {text: "France", correct: false},
        ]
    },

    {
        question: "Who has scored most goals in a calender year?",
        answers: [
            {text: "Lionel Messi", correct: true},
            {text: "Cristiano Ronaldo", correct: false},
            {text: "Pelé", correct: false},
            {text: "Luka Modrić", correct: false},
        ]
    },

    {
        question: "Which team has won most Cricket World Cups?",
        answers: [
            {text: "India", correct: false},
            {text: "West Indies", correct: false},
            {text: "Paksitan", correct: false},
            {text: "Australia", correct: true},
        ]
    },

    {
        question: "Who held the record for most wickets in Test cricket?",
        answers: [
            {text: "Glenn McGrath", correct: false},
            {text: "James Anderson", correct: false},
            {text: "Muttiah Muralitharan", correct: true},
            {text: "Shane Warne", correct: false},
        ]
    }
]

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion(){
    resetState()

    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = "none"
    
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++

    } else {
        selectedBtn.classList.add("incorrect")
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })

    nextButton.style.display = "block"
}

function showScore() {
    resetState()

    questionElement.innerHTML = `You scored ${score} / ${questions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()

    } else {
        showScore()
    }
}
 
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton()

    } else {
        startQuiz()
    }
})

startQuiz()