document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const quizSection = document.querySelector(".quiz");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Hide login section and show quiz section
        loginForm.style.display = "none";
        quizSection.classList.remove("hidden");
        startQuiz();
    });
});