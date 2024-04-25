const questions = [
    {
        question: "What is 3/5 of 100?",
        answers: [
            {text: "3", correct: false},
            {text: "5", correct: false},
            {text: "20", correct: false},
            {text: "60", correct: true},
        ]
    },

    {
        question: "If Tim’s age is 27 years old in 2011. What was his age in 2003?",
        answers: [
            {text: "17", correct: false},
            {text: "37", correct: false},
            {text: "20", correct: false},
            {text: "19", correct: true},
        ]
    },

    {
        question: "What is the remainder of 21 divided by 7?",
        answers: [
            {text: "21", correct: false},
            {text: "7", correct: false},
            {text: "1", correct: false},
            {text: "None of these", correct: true},
        ]
    },

    {
        question: "What is 7% of 1000/= equal to",
        answers: [
            {text: "7/=", correct: false},
            {text: "700/=", correct: false},
            {text: "70/=", correct: true},
            {text: "7000/=", correct: false},
        ]
    },

    {
        question: "I am a number. I have 7 in the ones place. I am less than 80 but greater than 70. What is my number?",
        answers: [
            {text: "67", correct: false},
            {text: "72", correct: false},
            {text: "77", correct: true},
            {text: "87", correct: false},
        ]
    },

    {
        question: "How many years are there in a decade?",
        answers: [
            {text: "5", correct: false},
            {text: "10", correct: true},
            {text: "50", correct: false},
            {text: "100", correct: false},
        ]
    },

    {
        question: "What is the square of 15?",
        answers: [
            {text: "15", correct: false},
            {text: "30", correct: false},
            {text: "252", correct: false},
            {text: "225", correct: true},
        ]
    },

    {
        question: "What is the value of x if x*x = 169",
        answers: [
            {text: "1", correct: false},
            {text: "13", correct: true},
            {text: "169", correct: false},
            {text: "338", correct: false},
        ]
    },

    {
        question: "What is the reciprocal of 17/15?",
        answers: [
            {text: "1.13", correct: false},
            {text: "15/17", correct: true},
            {text: "17/15", correct: false},
            {text: "34/30", correct: false},
        ]
    },

    {
        question: "In a century how many months are there?",
        answers: [
            {text: "12", correct: false},
            {text: "120", correct: false},
            {text: "1200", correct: true},
            {text: "12000", correct: false},
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