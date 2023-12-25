import { hipHopQuestions } from "./hiphopQuestions.js";
import { popQuestions } from "./popQuestions.js";
import { countryQuestions } from "./countryQuestions.js";

let questions = [];
let questionIndex = 0;
let score = 0;

// DOM elements
const nextButton = document.querySelector(".next");
const checkButton = document.querySelector(".check");
const restartButton = document.querySelector(".restart");
const hhButton = document.querySelector(".hh1");
const popButton = document.querySelector(".pop");
const countryButton = document.querySelector(".country");
const scoreBox = document.querySelector(".score");
const title = document.querySelector(".frontText");

function startGame(e) {
  const selection = e.target.innerText;
  title.classList.add("hide");

  // Set questions based on user selection
  questions = selection === "Hip-Hop" ? hipHopQuestions :
              selection === "Pop" ? popQuestions :
              selection === "Country" ? countryQuestions :
              hipHopQuestions;

  shuffleQuestions();
  displayQuestion();
  questionIndex = 0;
  restartButton.classList.remove("hide");
  nextButton.classList.remove("hide");
  checkButton.classList.remove("hide");
  [hhButton, popButton, countryButton].forEach(button => button.classList.toggle("hide"));
}

function shuffleQuestions() {
  questions = questions.sort(() => 0.5 - Math.random());
}

function handleNextQuestion() {
  questionIndex++;
  displayQuestion();
  clearAnswer();
  checkWinner();
}

function displayQuestion() {
  const questionDiv = document.querySelector(".question");
  questionDiv.innerHTML = "";

  const { question, answers: { choices } } = questions[questionIndex];

  const questionText = `
    <div class="content">
      <h1>${question}</h1>
      <h3>Click One</h3>
      <ul>
        ${choices.map(choice => `<input type="radio" name="choice" value="${choice}"> ${choice} <br>`).join('')}
      </ul>
    </div>
   `;

  questionDiv.insertAdjacentHTML("beforeend", questionText);
}

function checkAnswer() {
  const userChoice = document.querySelector("input[name=choice]:checked").value;
  const correctAnswer = questions[questionIndex].answers.correct;

  const feedbackDiv = document.querySelector(".check");
  feedbackDiv.innerHTML = userChoice === correctAnswer ? "You got it right!" : "My Guy. Seriously!";

  score += userChoice === correctAnswer ? 5 : 0;
  scoreBox.innerText = score;
}

function clearAnswer() {
  const feedbackDiv = document.querySelector(".check");
  feedbackDiv.innerHTML = "Check Answer";
}

function checkWinner() {
  const winningDiv = document.querySelector(".winner");
  winningDiv.innerHTML = "";

  if (score === 100) {
    const winningText = "You've Won!";
    winningDiv.insertAdjacentHTML("beforeend", winningText);
    winningDiv.classList.remove("hide");
  } else if (questions.length === 0) {
    const winningText = "Try Again!";
    winningDiv.insertAdjacentHTML("beforeend", winningText);
    winningDiv.classList.remove("hide");
  } else {
    startGame();
  }
}

// Event listeners
nextButton.addEventListener("click", handleNextQuestion);
checkButton.addEventListener("click", checkAnswer);
[hhButton, popButton, countryButton].forEach(button => button.addEventListener("click", startGame));
