document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const quizSection = document.querySelector(".quiz");
    const timerElement = document.getElementById("timer");
    const scoreSection = document.getElementById("score-section");
    const answerButtons = document.getElementById("answer-buttons");

    let questions = []; 

    let currentQuestionIndex = 0;
    let score = 0;
    let startTime;

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
      
        loginForm.style.display = "none";
        quizSection.classList.remove("hidden");
        initializeQuiz();
    });

    function initializeQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        startTime = Date.now();
        scoreSection.classList.add("hidden");
        loadQuestions(); 
        startQuiz();
    }

    function loadQuestions() {
        questions = [{
                question: "Which of the following is NOT a front-end programming language used in web development?",
                answers: [
                    { text: "HTML", correct: false },
                    { text: "PHP", correct: true },
                    { text: "JAVASCRIPT", correct: false },
                    { text: "CSS", correct: false },
                ]
            },
            {
                question: "What does CSS stand for in web development?",
                answers: [
                    { text: "computer style sheet", correct: false },
                    { text: "cascading style sheet", correct: true },
                    { text: "creative style system", correct: false },
                    { text: "content style syntax", correct: false },
                ]
            },
            {
                question: "What does HTML stand for?",
                answers: [
                    { text: "Hyperlinks and Text Markup Language", correct: false },
                    { text: "Home Tool Markup Language", correct: false },
                    { text: "Hyperlinking Textual Markup Language", correct: false },
                    { text: "Hyper Text Markup Language", correct: true },
                ]
            },
            {
                question: "What is the file extension for a JavaScript file?",
                answers: [
                    { text: ".js", correct: true },
                    { text: ".css", correct: false },
                    { text: ".php", correct: false },
                    { text: ".html", correct: false },
                ]
            },
            {
                question: "What is Tailwind CSS?",
                answers: [
                    { text: "A JavaScript framework", correct: false },
                    { text: "A front-end CSS framework", correct: true },
                    { text: "A back-end development tool", correct: false },
                    { text: "A database management system", correct: false },
                ]
            },
        ];
    }

    function startQuiz() {
        showQuestion();
        startTimer();
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        const questionElement = document.getElementById("question");
        questionElement.textContent = currentQuestion.question;

        answerButtons.innerHTML = ''; 

        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.textContent = answer.text;
            button.classList.add("btn", "py-2", "px-4", "bg-white", "hover:bg-gray-100", "cursor-pointer");
            button.dataset.index = index; 
            button.addEventListener("click", selectAnswer);
            answerButtons.appendChild(button);
        });
    }

    function startTimer() {
        const intervalId = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            timerElement.textContent = `Total Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (currentQuestionIndex >= questions.length) {
                clearInterval(intervalId); 
            }
        }, 1000);
    }

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const answerIndex = selectedBtn.dataset.index;
        const isCorrect = questions[currentQuestionIndex].answers[answerIndex].correct;

        if (isCorrect) {
            selectedBtn.classList.add("bg-green-500", "hover:bg-green-700", "text-white");
            score++;
        } else {
            selectedBtn.classList.add("bg-red-500", "hover:bg-red-700", "text-white");
        }
        
        answerButtons.querySelectorAll('.btn').forEach(button => {
            button.removeEventListener('click', selectAnswer);
        });
    }

    function showScore() {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        const totalTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        const scoreElement = document.getElementById("score");
        scoreElement.textContent = `Score: ${score} / ${questions.length}`;

        const timeElement = document.getElementById("total-time");
        timeElement.textContent = `Total Time: ${totalTime}`;

        
        quizSection.classList.add("hidden");
        scoreSection.classList.remove("hidden");
    }

    function restartQuiz() {
        quizSection.classList.add("hidden");
        scoreSection.classList.add("hidden");
        loginForm.style.display = "block"; 
        initializeQuiz();
    }

    const nextButton = document.getElementById("next-btn");
    nextButton.addEventListener("click", handleNextButton); 

    const restartButton = document.getElementById("restart-btn");
    restartButton.addEventListener("click", restartQuiz);

    function handleNextButton() { 
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }
});
