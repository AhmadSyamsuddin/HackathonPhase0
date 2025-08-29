const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const scoreEl = document.getElementById("score");
const submitBtn = document.getElementById("submitBtn");
const historyEl = document.getElementById("history");
const feedbackEl = document.getElementById("feedback");
const timerEl = document.getElementById("timer");
const startBtnEl = document.getElementById("startBtn");
const noSoal = document.getElementById("noSoal");
const highScoreEl = document.getElementById("highScore")
const levelEL = document.getElementById("level")

let score = 0;
let currentQuestion = "";
let currentAnswer = 0;
let timer;
let timerLeft = 40;
let currentQuestionNumber = 0;
let totalQuestions = 10;
let highScore = {
  mudah : 0,
  sedang : 0,
  sulit : 0
}
// Fungsi update highscore sesuai level
function updateHighScoreDisplay(level){
  highScoreEl.textContent = `High Score (${level}) : ${highScore[level]}`
}

// Fungsi generate soal random
function generateQuestion() {
  currentQuestionNumber++;

  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;
  const operators = ["+", "-", "*","/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  currentQuestion = `${num1} ${operator} ${num2}`;
  currentAnswer = eval(currentQuestion);

  questionEl.textContent = `Berapa hasil dari: ${currentQuestion}?`;
  answerEl.value = "";
  noSoal.textContent = `${currentQuestionNumber}/${totalQuestions}`;
}

// Fungsi update riwayat jawaban
function updateHistory(question, userAnswer, correctAnswer) {
  const li = document.createElement("li");
  if (userAnswer === correctAnswer) {
    feedbackEl.textContent = `BENAR ✅`;
    feedbackEl.style.color = "green";
    li.textContent = `Anda Benar ! ${question} = ${userAnswer} `;
    li.style.color = "green";
    li.style.backgroundColor = "rgba(110, 255, 110, 0.5)";
  } else {
    feedbackEl.textContent = `SALAH ❌`;
    feedbackEl.style.color = "red";
    li.textContent = `Anda Salah, jawaban yang benar: ${question} = ${userAnswer}  (Jawaban benar: ${correctAnswer})`;
    li.style.color = "red";
    li.style.backgroundColor = "rgba(242, 113, 113, 0.5)";
  }
  historyEl.prepend(li);
}

// Event tombol cek jawaban
submitBtn.addEventListener("click", () => {
  const userAnswer = Number(answerEl.value);

  if (userAnswer === currentAnswer) {
    score += 1;
  } else {
    score = Math.max(0, score - 1);
  }

  scoreEl.textContent = `Skor: ${score}`;
  updateHistory(currentQuestion, userAnswer, currentAnswer);

  if (currentQuestionNumber >= totalQuestions) {
    endGame("selesai");
  } else {
    generateQuestion();
  }
});

// Permainan Berakhir
function endGame(reason = "Time Up") {
  clearInterval(timer);
  questionEl.textContent = `⏰ Waktu habis!`;
  submitBtn.disabled = true;
  answerEl.disabled = true;

  let predikat = "";

  if (score >= 10) {
    predikat = "Sangat Hebat 👑";
  } else if (score >= 8) {
    predikat = "Bagus 🏅";
  } else if (score >= 5) {
    predikat = "Semangat!! Terus Berlatih! 🦾";
  } else {
    predikat = "Yuk Latihan lagi 👍";
  }

  if (reason === "timeup") {
    questionEl.textContent = `⏰ Waktu habis!`;
  } else if (reason === "selesai") {
    questionEl.textContent = `✅ Selesai!`;
  }

  const selectedLevel = levelEL.value

  if( score > highScore[selectedLevel]){
    highScore[selectedLevel] = score
    updateHighScoreDisplay(selectedLevel)
    feedbackEl.textContent = `Score Akhir: ${score} | ${predikat}  --- 🎉 NEW HIGHSCORE !!! 🎉 ---`
  }else{
    feedbackEl.textContent = `Score Akhir: ${score} | ${predikat}`;
  }

  
}

// Timer
function setTimer() {
  timer = setInterval(() => {
    timerLeft--;
    timerEl.textContent = `Sisa Waktu : ${timerLeft} detik`;

    if (timerLeft <= 0) {
      endGame("timeup");
    }
  }, 1000);
}


// Event tombol Start
startBtnEl.addEventListener("click", () => {

  score = 0;
  currentQuestionNumber = 0;
  const selectedLevel = levelEL.value
  updateHighScoreDisplay(selectedLevel)
  if( selectedLevel === "mudah"){
    totalQuestions = 10
    timerLeft = 90;
  }else if( selectedLevel === "sedang"){
    totalQuestions = 10
    timerLeft = 60
  }else if ( selectedLevel === "sulit"){
    totalQuestions = 10
    timerLeft = 30
  }

  scoreEl.textContent = `Skor : 0`;
  noSoal.textContent = `0/${totalQuestions}`;
  feedbackEl.textContent = "";
  submitBtn.disabled = false;
  answerEl.disabled = false;

  generateQuestion();
  setTimer();
});
