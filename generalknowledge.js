const questions = [
    {
        question: "What is the largest continent in the world?",
        answers: [
            {text: "Australia", correct: false},
            {text: "Asia", correct: true},
            {text: "Europe", correct: false},
            {text: "Africa", correct: false},
        ]
    },

    {
        question: "What is the longest river in the world?",
        answers: [
            {text: "Nile", correct: true},
            {text: "Amazon", correct: false},
            {text: "Ganges", correct: false},
            {text: "Mahaweli", correct: false},
        ]
    },

    {
        question: "What is the highest mountain in the world?",
        answers: [
            {text: "Everest", correct: true},
            {text: "Kangchenjunga", correct: false},
            {text: "Makalu", correct: false},
            {text: "Piduruthalagala", correct: false},
        ]
    },

    {
        question: "What is the smallest country in the world?",
        answers: [
            {text: "China", correct: false},
            {text: "Italy", correct: false},
            {text: "Vatican City", correct: true},
            {text: "Molta", correct: false},
        ]
    },

    {
        question: "What is the highest waterfall in the world?",
        answers: [
            {text: "Niagara Falls", correct: false},
            {text: "Victoria Falls", correct: false},
            {text: "Cerberus Falls", correct: false},
            {text: "Angel Falls", correct: true},
        ]
    },

    {
        question: "Which of these is not an island?",
        answers: [
            {text: "Sri Lanka", correct: false},
            {text: "Madagascar", correct: false},
            {text: "Maldives", correct: false},
            {text: "India", correct: true},
        ]
    },

    {
        question: "What is the country with highest population in the world?",
        answers: [
            {text: "China", correct: false},
            {text: "India", correct: true},
            {text: "Bangladesh", correct: false},
            {text: "Pakistan", correct: false},
        ]
    },

    {
        question: "What is the country located in the continent of Europe?",
        answers: [
            {text: "Japan", correct: false},
            {text: "Brazil", correct: false},
            {text: "Canada", correct: false},
            {text: "Sweden", correct: true},
        ]
    },

    {
        question: "Which of these is a land-locked country?",
        answers: [
            {text: "Kazakhstan", correct: true},
            {text: "Sri Lanka", correct: false},
            {text: "India", correct: false},
            {text: "South Africa", correct: false},
        ]
    },

    {
        question: "What is the capical of France?",
        answers: [
            {text: "London", correct: false},
            {text: "Lisbon", correct: false},
            {text: "Paris", correct: true},
            {text: "Madrid", correct: false},
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