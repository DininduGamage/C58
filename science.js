const questions = [
    {
        question: "Which of these is a form of energy which is due to an object or a particle's motion?",
        answers: [
            {text: "Chemical Energy", correct: false},
            {text: "Kinetic Energy", correct: true},
            {text: "Potential Energy", correct: false},
            {text: "Thermal Energy", correct: false},
        ]
    },

    {
        question: "Who discovered X-rays?",
        answers: [
            {text: "Raymond Gosling", correct: false},
            {text: "Marie Curie", correct: false},
            {text: "Riccardo Giacconi", correct: false},
            {text: "Wilhelm Röntgen", correct: true},
        ]
    },

    {
        question: "The layer of the atmosphere in which weather occurs is called the:",
        answers: [
            {text: "Stratosphere", correct: false},
            {text: "Troposphere", correct: true},
            {text: "Mesosphere", correct: false},
            {text: "Ionosphere", correct: false},
        ]
    },

    {
        question: "What is the study of fungi called?",
        answers: [
            {text: "Virology", correct: false},
            {text: "Bacteriology", correct: false},
            {text: "Mycology", correct: true},
            {text: "Phycology", correct: false},
        ]
    },

    {
        question: "How many laws are there in Kepler's planetary motion?",
        answers: [
            {text: "5", correct: false},
            {text: "3", correct: true},
            {text: "1", correct: false},
            {text: "7", correct: false},
        ]
    },

    {
        question: "Who discovered the four main moons of Jupiter in 1610?",
        answers: [
            {text: "Galileo Galilei", correct: true},
            {text: "Edmund Halley", correct: false},
            {text: "Edward Emerson Bernard", correct: false},
            {text: "Nicholas Copernicus", correct: false},
        ]
    },

    {
        question: "Who is the only woman to have won two Nobel Prizes in two different fields?",
        answers: [
            {text: "Irène Joliot-Curie", correct: false},
            {text: "Lise Meitner", correct: false},
            {text: "Marie Curie", correct: true},
            {text: "Ève Curie", correct: false},
        ]
    },

    {
        question: "The scientific study of fishes is known as:",
        answers: [
            {text: "Paleontology", correct: false},
            {text: "Ichthyology", correct: true},
            {text: "Entomology", correct: false},
            {text: "Ornithology", correct: false},
        ]
    },

    {
        question: "What is the element with Atomic Number 17?",
        answers: [
            {text: "Chlorine", correct: true},
            {text: "Sodium", correct: false},
            {text: "Calcium", correct: false},
            {text: "Argon", correct: false},
        ]
    },

    {
        question: "What is the symbol of element 'Tin'?",
        answers: [
            {text: "Tn", correct: false},
            {text: "Ti", correct: false},
            {text: "Sn", correct: true},
            {text: "Pt", correct: false},
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