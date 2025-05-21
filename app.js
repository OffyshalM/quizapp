const questionBanks = [
    {
        question: "Which of the following is NOT a software development life cycle model?",
        options: [
            "Waterfall Model",
            "Spiral Model",
            "V-Model",
            "Rectangular Model"
        ],
        correctAnswer: "Rectangular Model"
    },
    {
        question: "What is the main goal of software engineering?",
        options: [
            "To design complex hardware",
            "To reduce the cost of software",
            "To produce reliable and efficient software",
            "To maintain databases"
        ],
        correctAnswer: "To produce reliable and efficient software"
    },
    {
        question: "Which document describes user requirements for a system?",
        options: [
            "SRS (Software Requirements Specification)",
            "DFD (Data Flow Diagram)",
            "ER Diagram",
            "Use Case Diagram"
        ],
        correctAnswer: "SRS (Software Requirements Specification)"
    },
    {
        question: "What is the first phase in the software development life cycle?",
        options: [
            "Testing",
            "Design",
            "Requirement Analysis",
            "Maintenance"
        ],
        correctAnswer: "Requirement Analysis"
    },
    {
        question: "Which testing is done by end-users?",
        options: [
            "Unit Testing",
            "Integration Testing",
            "System Testing",
            "Acceptance Testing"
        ],
        correctAnswer: "Acceptance Testing"
    },
    {
        question: "Which one of the following is a functional requirement?",
        options: [
            "Portability",
            "Maintainability",
            "Performance",
            "User authentication"
        ],
        correctAnswer: "User authentication"
    },
    {
        question: "In Agile methodology, what is a “sprint”?",
        options: [
            "A race among developers",
            "A type of bug",
            "A short, time-boxed period to complete tasks",
            "A long phase of design"
        ],
        correctAnswer: "A short, time-boxed period to complete tasks"
    },
    {
        question: "Which software process model emphasizes risk analysis?",
        options: [
            "Waterfall Model",
            "Agile Model",
            "Spiral Model",
            "Prototype Model"
        ],
        correctAnswer: "Spiral Model"
    },
    {
        question: "What is the purpose of version control systems like Git?",
        options: [
            "To run programs",
            "To test hardware",
            "To manage code changes and collaboration",
            "To write documentation"
        ],
        correctAnswer: "To manage code changes and collaboration"
    },
    {
        question: "Who is responsible for ensuring that the software meets the business needs?",
        options: [
            "Developer",
            "Tester",
            "System Analyst",
            "UI Designer"
        ],
        correctAnswer: "System Analyst"
    }
];
let quizScores;

let currentQuestionIndex = 0;

let totalTime = 100;

let quizTimer;

let userAnswers = [];

let questionContainer = document.getElementById("questionContainer");
let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");
let optionContainer = document.getElementById("optionContainer");
let submitBtn = document.getElementById("submitBtn");
const courseTitle = document.getElementById("courseTitle");
const timeUp = document.getElementById("timeUp");

const restartQuizBtn = document.getElementById("restartQuiz");

function showQuestion() {
    let currentQuestion = questionBanks[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionContainer.innerHTML = `${questionNumber}. ${currentQuestion.question}`;

    optionContainer.innerHTML = "";

    currentQuestion.options.forEach((optionText, index) => {
        let isChecked = userAnswers[currentQuestionIndex] === optionText ? "checked" : "";
        let radioBox = `
  <div class="option-box ${isChecked ? 'selected' : ''}" data-value="${optionText}">
    <input type="radio"
           id="option${index}"
           name="option"
           value="${optionText}"
           ${isChecked}
           hidden>
    <label for="option${index}">${optionText}</label>
  </div>
`;

        optionContainer.innerHTML += radioBox;
    })
    showSubmitBtn();

}

function startQuiz() {
    currentQuestionIndex = 0;
    quizScores = 0;
    showQuestion();
}


function handleNextBtn() {
    selectedAnswer();

    if (currentQuestionIndex < questionBanks.length - 1) {

        currentQuestionIndex++;

        showQuestion()
    } else {
        endQuiz();
    }
}

nextBtn.addEventListener("click", handleNextBtn);

function handlePrevBtn() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion()
    }
}

prevBtn.addEventListener("click", handlePrevBtn);

function showSubmitBtn() {

    if (currentQuestionIndex === questionBanks.length - 1) {
        submitBtn.style.display = "block";
        nextBtn.style.display = "none";
        prevBtn.style.display = "inline-block";
    } else {
        submitBtn.style.display = "none";
        nextBtn.style.display = "inline-block";
        prevBtn.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
    }
}

startQuiz();
function selectedAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (selectedOption) {
        const answerPicked = selectedOption.value;
        userAnswers[currentQuestionIndex] = answerPicked;
    } else {
        userAnswers[currentQuestionIndex] = null;
    }

}
function calculateScore() {
    quizScores = 0;

    for (let i = 0; i < questionBanks.length; i++) {
        if (userAnswers[i] === questionBanks[i].correctAnswer) {
            quizScores++;
        }
    }
}

function displayResults() {
    questionContainer.style.display = "none";
    optionContainer.style.display = "none";
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
    submitBtn.style.display = "none";
    timerDisplay.style.display = "none";
    courseTitle.style.display = "none";
    timeUp.style.display = "none";

    const resultContainer = document.getElementById("resultContainer") || document.createElement("div");
    resultContainer.id = "resultContainer";
    resultContainer.innerHTML = `<h2 style="color:#00796b">Your Score: ${quizScores}/${questionBanks.length} (${quizScores / questionBanks.length * 100}%)</h2>`;

    questionBanks.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.correctAnswer;

        let isCorrect = userAnswer === correctAnswer;
        let resultItem = document.createElement("div");
        resultItem.style.marginBottom = "15px";
        resultItem.innerHTML = `
            <p><strong>Q${index + 1}:</strong> ${question.question}</p>
            <p>Your Answer: <span style="color:${isCorrect ? 'green' : 'red'}">${userAnswer || 'No answer'}</span></p>
            ${!isCorrect ? `<p>Correct Answer: <span style="color:green">${correctAnswer}</span></p>` : ""}
            <hr>
        `;
        resultContainer.appendChild(resultItem);
    });

    resultContainer.appendChild(restartQuizBtn);
    restartQuizBtn.style.display = "block";

    document.body.appendChild(resultContainer);
}

let quizSubmitted = false;

submitBtn.addEventListener("click", () => {
    quizSubmitted = true;
    const timerCanvas = document.querySelector(".circular-timer");
    const timerText = document.getElementById("timer");

    if (timerCanvas) timerCanvas.style.display = "none";
    if (timerText) timerText.style.display = "none";
    endQuiz()
    
});

function endQuiz() {
    selectedAnswer();
    calculateScore();
    displayResults();

}

let timerDisplay = document.getElementById("timer");
let circularTimer = document.getElementById("circularTimer");

quizTimer = setInterval(() => {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;

    let totalInitialTime = 100;
    let percent = ((totalInitialTime - totalTime) / totalInitialTime) * 100;
    circularTimer.style.setProperty("--percent", percent);

    totalTime--;

    if (totalTime < 0 && !quizSubmitted) {
        clearInterval(quizTimer);
        endQuiz();
        timeUp.style.display = "inline-block";
    }
}, 1000)

restartQuizBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    quizScores = 0;
    totalTime = 100;
    userAnswers = [];
    quizSubmitted = false;

    const resultContainer = document.getElementById("resultContainer");
    if (resultContainer) {
        resultContainer.remove();
    }

    questionContainer.style.display = "block";
    optionContainer.style.display = "block";
    nextBtn.style.display = "inline-block";
    prevBtn.style.display = "none";
    submitBtn.style.display = "none";
    courseTitle.style.display = "block";
    timeUp.style.display = "none";
    restartQuizBtn.style.display = "none";

    timerDisplay.style.display = "inline-block";
    circularTimer.style.display = "flex";  

    circularTimer.style.setProperty("--percent", 0);


    clearInterval(quizTimer);
    quizTimer = setInterval(() => {
        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;

        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;

        let totalInitialTime = 100;
        let percent = ((totalInitialTime - totalTime) / totalInitialTime) * 100;
        circularTimer.style.setProperty("--percent", percent);

        totalTime--;

        if (totalTime < 0 && !quizSubmitted) {
            clearInterval(quizTimer);
            endQuiz();
            timeUp.style.display = "inline-block";

            timerDisplay.style.display = "none";
            circularTimer.style.display = "none";
        }
    }, 1000);

    showQuestion();
});


optionContainer.addEventListener('click', function (e) {
  const clickedBox = e.target.closest('.option-box');
  if (!clickedBox) return;

  const allOptions = document.querySelectorAll('.option-box');
  allOptions.forEach(opt => opt.classList.remove('selected'));

  clickedBox.classList.add('selected');

  const input = clickedBox.querySelector('input[type="radio"]');
  if (input) input.checked = true;
});




