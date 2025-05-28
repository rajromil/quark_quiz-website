const welcomeScreen = document.getElementById('welcome-screen');
const quizContainer = document.getElementById('quiz-container');
const resultsScreen = document.getElementById('results-screen');
const questionElement = document.getElementById('question');
const questionNumberElement = document.getElementById('question-number');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const resultsMessage = document.getElementById('results-message');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const feedbackElement = document.getElementById('feedback');
const feedbackTextElement = document.getElementById('feedback-text');
const correctAnswerElement = document.getElementById('correct-answer');

const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');

let currentQuestionIndex = 0;
let score = 0;
let quizStarted = false;


const questions = [
  {
    question: "What is the most powerful Wi-Fi signal in India?",
    answers: [
      { text: "Jio Tower", correct: false },
      { text: "Parliament Wi-Fi", correct: false },
      { text: "Your neighbor’s Wi-Fi with no password", correct: false },
      { text: "AuntyNet_5G – free with chai and gossip", correct: true }
    ]
  },
  {
    question: "What is the national sign of Indian frustration?",
    answers: [
      { text: "Traffic jam", correct: false },
      { text: "Slow internet", correct: false },
      { text: "Buffering during IPL", correct: false },
      { text: "Arey bhai, line mein lag jao!", correct: true }
    ]
  },
  {
    question: "If chai runs rally for Prime Minister, what would its slogan be?",
    answers: [
      { text: "Sabka Saath, Sabka Sip", correct: false },
      { text: "Ek Garam Chai Ki Pyaali Ho", correct: false },
      { text: "Chai Pe Charcha 24x7", correct: true },
      { text: "Make India Brew Again", correct: false }
    ]
  },
  {
    question: "Which Indian superpower do moms have?",
    answers: [
      { text: "Wi-Fi speed booster", correct: false },
      { text: "Can find lost remotes without moving", correct: false },
      { text: "Detect lies through phone tone", correct: false },
      { text: "All of the above + telepathy", correct: true }
    ]
  },
  {
    question: "What is the true Indian Olympic sport?",
    answers: [
      { text: "Javelin throw", correct: false },
      { text: "Cricket", correct: false },
      { text: "Bargaining with sabziwala", correct: true },
      { text: "Running to catch a moving train", correct: false }
    ]
  },
  {
    question: "What is the most dangerous statement in an Indian wedding?",
    answers: [
      { text: "Food is ready.", correct: false },
      { text: "Aap next ho beta.", correct: true },
      { text: "Yeh rishta pakka samjhein?", correct: false },
      { text: "Selfies with the bride only.", correct: false }
    ]
  },
  {
    question: "What does 5 minutes actually mean in Indian Standard Time?",
    answers: [
      { text: "5 minutes", correct: false },
      { text: "15 minutes", correct: false },
      { text: "30 minutes", correct: false },
      { text: "The event is tomorrow", correct: true }
    ]
  },
  {
    question: "Why do Indians really go to the gym?",
    answers: [
      { text: "Fitness", correct: false },
      { text: "Instagram Stories", correct: true },
      { text: "To avoid relatives at home", correct: false },
      { text: "Free AC", correct: false }
    ]
  },
  {
    question: "What is the most effective Indian alarm clock?",
    answers: [
      { text: "Dadi's Uth jao beta!", correct: false },
      { text: "Pressure cooker whistle", correct: true },
      { text: "Loudspeaker from nearby temple/masjid", correct: false },
      { text: "Horn of school bus when you are still brushing", correct: false }
    ]
  },
  {
    question: "DO YOU REGRET DOING ENGINEERING?",
    answers: [
      { text: "Of course", correct: true },
      { text: "No", correct: false },
      { text: "Maybe", correct: false },
      { text: "Only if I didn't get a job", correct: false }
    ]
  }
];



startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});
restartButton.addEventListener('click', startQuiz);


function startQuiz() {

  quizStarted = true;
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add('hidden');
  

  welcomeScreen.classList.add('hidden');
  resultsScreen.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  scoreElement.textContent = score;
  
  
  setNextQuestion();
}


function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
  questionNumberElement.textContent = `Question ${currentQuestionIndex + 1}/10`;
}


function showQuestion(question) {
  questionElement.textContent = question.question;
  
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}


function resetState() {
  feedbackElement.classList.add('hidden');
  nextButton.classList.add('hidden');
  correctAnswerElement.textContent = "";
  feedbackTextElement.textContent = "";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}


function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  
 
  Array.from(answerButtonsElement.children).forEach(button => {
    button.disabled = true;
    button.classList.add('selected');
    if (button.dataset.correct) {
      button.classList.add('correct');
    }
  });
  
  
  feedbackElement.classList.remove('hidden');
  
  if (correct) {
    
    score++;
    scoreElement.textContent = score;
    feedbackElement.classList.add('correct');
    feedbackElement.classList.remove('wrong');
    feedbackTextElement.textContent = "Correct!";
    correctSound.play();
  } else {
    
    feedbackElement.classList.remove('correct');
    feedbackElement.classList.add('wrong');
    feedbackTextElement.textContent = "Incorrect!";
    
 
    const correctAnswer = questions[currentQuestionIndex].answers.find(answer => answer.correct).text;
    correctAnswerElement.textContent = `The correct answer is: ${correctAnswer}`;
    wrongSound.play();
  }
  
  if (currentQuestionIndex < questions.length - 1) {
    nextButton.classList.remove('hidden');
  } else {
    showResults();
  }
}


function showResults() {
  nextButton.textContent = "See Results";
  nextButton.classList.remove('hidden');
  nextButton.removeEventListener('click', setNextQuestion);
  
  nextButton.addEventListener('click', () => {
   
    quizContainer.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    finalScoreElement.textContent = score;
    
 
    let message = "";
    if (score === 10) {
      message = "Perfect! You're a quiz master! 🏆";
    } else if (score >= 7) {
      message = "Great job! You really know your stuff! 🎉";
    } else if (score >= 5) {
      message = "Not bad! You've got a good foundation of knowledge. 👍";
    } else {
      message = "Keep learning! You'll do better next time. 📚";
    }
    
    resultsMessage.textContent = message;
  }, { once: true });
}