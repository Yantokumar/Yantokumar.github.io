const questions = [
  { question: "Apa nama ilmiah dari nyamuk?", options: ["Culicidae", "Berlin", "sativa", "broncos"], answer: "Culicidae" },
  { question: "Apa ibu kota Indonesia?", options: ["Jakarta", "Jawa", "Medan", "palembang"], answer: "Jakarta" },
  { question: "Berapakah jumlah bulan di planet Mars?", options: ["3", "5", "2", "6"], answer: "2" },
  { question: "Siapa penemu lampu pijar?", options: ["Albert Einstein", "Alexander Graham Bell", "Thomas Edison", "Nikola Tesla"], answer: "Thomas Edison" },
  { question: "Negara manakah yang dikenal sebagai Negeri Matahari Terbit?", options: ["Korea Selatan", "Tiongkok", "Jepang", "India"], answer: "Jepang" },
  { question: "Apakah bahasa utama yang digunakan di Brasil?", options: ["Spanyol", "Portugis", "Prancis", "Inggris"], answer: "Portugis" },
  { question: "Apakah simbol kimia dari oksigen?", options: ["O", "O2", "H", "C"], answer: "O" },
  { question: "Di manakah lokasi terluar dari negara Australia?", options: ["Sydney", "Melbourne", "Darwin", "Perth"], answer: "Perth" },
  { question: "Apakah benda langit yang paling dekat dengan bumi?", options: ["Matahari", "Bulan", "Venus", "Mars"], answer: "Bulan" },
  { question: "Ikan apa yang menjadi icon Batanghari?", options: ["Ikan es", "Ikan betok", "Ikan tapa malenggang", "Ikan gabus"], answer: "Ikan tapa malenggang" },
  { question: "pada 2024 batanghari ulangtahun ke?", options: ["77", "79", "80", "76"], answer: "76" },
  
];

let playerName = "";
let currentQuestionIndex = 0;
let score = 0;
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

const startGameEl = document.getElementById("start-game");
const playerNameInput = document.getElementById("player-name");
const startBtn = document.getElementById("start-btn");
const quizContainerEl = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreContainerEl = document.getElementById("score-container");
const leaderboardEl = document.querySelector("#leaderboard ol");
const endGameEl = document.getElementById("end-game");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

startBtn.addEventListener("click", () => {
  playerName = playerNameInput.value.trim();
  if (playerName === "") {
    alert("Please enter your name!");
    return;
  }
  startGameEl.style.display = "none";
  quizContainerEl.style.display = "block";
  showIntroAnimation();
  setTimeout(showQuestion, 1000);
});

function showIntroAnimation() {
  const introAnimation = document.getElementById("intro-animation");
  introAnimation.style.display = "flex";
  introAnimation.querySelectorAll(".moving-object").forEach((object) => {
    object.classList.add("move-bounce");
  });
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  currentQuestion.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => checkAnswer(option, btn));
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selectedOption, button) {
  const currentQuestion = questions[currentQuestionIndex];
  const allButtons = document.querySelectorAll("#options button");

  allButtons.forEach((btn) => (btn.disabled = true));

  if (selectedOption === currentQuestion.answer) {
    score += 10;
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    button.style.backgroundColor = "#4caf50";
  } else {
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    button.style.backgroundColor = "#e53935";
  }
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    nextBtn.style.display = "none";
    showQuestion();
  } else {
    endGame();
  }
});

function endGame() {
  quizContainerEl.style.display = "none";
  scoreContainerEl.style.display = "block";
  endGameEl.style.display = "block";
  finalScoreEl.textContent = score;
  updateLeaderboard();
}

function updateLeaderboard() {
  leaderboard.push({ name: playerName, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  displayLeaderboard();
}

function displayLeaderboard() {
  leaderboardEl.innerHTML = "";
  leaderboard.slice(0, 5).forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.score}`;
    leaderboardEl.appendChild(li);
  });
}

// Tombol restart untuk mengulang