const questions = [
    {
        question: "What is the name of the court poet of King Harshavardhana?",
        answers: [
            { text: "Tulsidas", correct: false },
            { text: "Banabhatta", correct: true },
            { text: "Surdas", correct: false },
            { text: "Raskhan", correct: false }
        ]
    },
    {
        question: "Which emperor wrote the play 'Nagananda' in Sanskrit language?",
        answers: [
            { text: "Prabhakaravardhana", correct: false },
            { text: "Harshavardhana", correct: true },
            { text: "Chandragupta II", correct: false },
            { text: "Bindusara", correct: false }
        ]
    },
     {
        question: "Takshashila University was located between which two rivers?",
        answers: [
            { text: "Indus and Jhelum", correct: true },
            { text: "Jhelum and Ravi", correct: false },
            { text: "Beas and Indus", correct: false },
            { text: "Satluj and Indus", correct: false }
         ]
     },
    {
         question: "Who is the most prominent god of 'Rig Veda'?",
         answers: [
             { text: "Indra", correct: true },
             { text: "Agni", correct: false },
             { text: "Surya", correct: false },
             { text: "Varuna", correct: false }
         ]
     },
    {
         question: "Jama Masjid of Delhi was built in which century?",
         answers: [
             { text: "15th", correct: false },
             { text: "16th", correct: false },
             { text: "17th", correct: true },
             { text: "18th", correct: false }
         ]
    },
      {
        question: "In which year did the Portuguese captured Goa from Bijapur?",
         answers: [
             { text: "1498", correct: false },
              { text: "1510", correct: true },
              { text: "1516", correct: false },
             { text: "1569", correct: false }
         ]
     },
    {
        question: "Who among the following were the pioneers in opening oceanic trade with India?",
         answers: [
             { text: "Dutch", correct: false },
              { text: "English", correct: false },
             { text: "French", correct: false },
             { text: "Portuguese", correct: true }
         ]
    },
    {
        question: "The tax collected by Marathas was known as",
         answers: [
             { text: "Chauth", correct: true },
              { text: "Pilgrim Tax", correct: false },
              { text: "Jazia", correct: false },
              { text: "Charai", correct: false }
        ]
    },
    {
        question: "At which of the following places did Hyder Ali built a modern arsenal?",
         answers: [
             { text: "Dindigul", correct: true },
             { text: "Mysore", correct: false },
             { text: "Srirangappattanam", correct: false },
              { text: "Arcot", correct: false }
        ]
    },
   {
        question: "Who planted the 'Tree of Liberty' at Srirangapatnam?",
         answers: [
             { text: "Chikka Krishna Raj", correct: false },
             { text: "Devraj", correct: false },
             { text: "Hyder Ali", correct: false },
              { text: "Tipu Sultan", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    // Shuffle the questions array
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    // Select the first 5 questions
    selectedQuestions = shuffledQuestions.slice(0, 5);
    showQuestion();
}


function showQuestion() {
    resetState();
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
     questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
       selectedBtn.classList.add("correct");
       score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < selectedQuestions.length){
        showQuestion();
    } else {
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${selectedQuestions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < selectedQuestions.length){
      handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
