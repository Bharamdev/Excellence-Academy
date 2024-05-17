const quizContainer = document.getElementById("question-container");
const submitButton = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result-container");
const timerContainer = document.getElementById("timer-container");
const progressBar = document.getElementById("progress-bar");

let questions = [
  {
    question: "What does HTML stand for?",
    answers: {
      a: "Hyper Text Markup Language",
      b: "Highly Typed Markup Language",
      c: "Hyperlink and Text Markup Language",
    },
    correctAnswer: "a",
  },

  {
    question: "What is the purpose of CSS?",
    answers: {
      a: "To define the structure of a webpage",
      b: "To provide a programming language for web development",
      c: "To style the visual presentation of a webpage",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Which CSS property is used to change the text color of an element?",
    answers: {
      a: "text-color",
      b: "color",
      c: "font-color",
    },
    correctAnswer: "b",
  },
  {
    question: 'What does the acronym "DOM" stand for?',
    answers: {
      a: "Document Object Model",
      b: "Data Object Model",
      c: "Digital Object Model",
    },
    correctAnswer: "a",
  },
  {
    question: "Which JavaScript keyword is used to declare a variable?",
    answers: {
      a: "var",
      b: "variable",
      c: "declare",
    },
    correctAnswer: "a",
  },
  {
    question: 'What does the "this" keyword refer to in JavaScript?',
    answers: {
      a: "The current function",
      b: "The global object",
      c: "The current object",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Which JavaScript method is used to add an element to the end of an array?",
    answers: {
      a: "append()",
      b: "push()",
      c: "addToEnd()",
    },
    correctAnswer: "b",
  },
  {
    question: "What is the purpose of the Bootstrap framework?",
    answers: {
      a: "To write server-side code",
      b: "To style web pages using pre-built components",
      c: "To create database schemas",
    },
    correctAnswer: "b",
  },
  {
    question:
      "In Bootstrap, which class is used to create a responsive, fixed-width container?",
    answers: {
      a: ".container-fluid",
      b: ".container-fixed",
      c: ".container",
    },
    correctAnswer: "c",
  },

  {
    question:
      'What is the purpose of the CSS property "box-sizing: border-box;"?',
    answers: {
      a: "It adds a border to every box element",
      b: "It includes padding and border in the element's total width and height",
      c: "It removes the border from box elements",
    },
    correctAnswer: "b",
  },

  {
    question: 'What is the purpose of the CSS property "position: relative;"?',
    answers: {
      a: "It positions the element relative to its normal position",
      b: "It positions the element relative to the viewport",
      c: "It makes the element invisible",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Which JavaScript method is used to parse a string and return it as a number?",
    answers: {
      a: "parseInt()",
      b: "parseNumber()",
      c: "toNumber()",
    },
    correctAnswer: "a",
  },
  {
    question: "In Bootstrap, which class is used to create a navigation bar?",
    answers: {
      a: ".nav",
      b: ".navbar",
      c: ".navigation",
    },
    correctAnswer: "b",
  },
  {
    question:
      'What is the purpose of the HTML attribute "alt" in the <img> tag?',
    answers: {
      a: "It specifies the image source",
      b: "It provides alternative text for the image",
      c: "It sets the image width and height",
    },
    correctAnswer: "b",
  },
  {
    question:
      "Which CSS property is used to change the background color of an element?",
    answers: {
      a: "background-color",
      b: "color-background",
      c: "bgcolor",
    },
    correctAnswer: "a",
  },
  {
    question:
      'What is the purpose of the JavaScript function "addEventListener()"?',
    answers: {
      a: "It adds a new element to the document",
      b: "It listens for a specific event on an element and executes a function",
      c: "It defines a new event in the document",
    },
    correctAnswer: "b",
  },
];

questions = shuffleArray(questions);

const quizDuration = 300; // 5 minutes in seconds
let currentQuestionIndex = 0;
let timer;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildQuiz() {
  clearInterval(timer);
  const currentQuestion = questions[currentQuestionIndex];
  const questionElement = document.createElement("div");
  questionElement.classList.add("question");
  questionElement.innerHTML = `
    <p>${currentQuestionIndex + 1}. ${currentQuestion.question}</p>
    <label>
      <input type="radio" name="question${currentQuestionIndex}" value="a">
      ${currentQuestion.answers.a}
    </label>
    <label>
      <input type="radio" name="question${currentQuestionIndex}" value="b">
      ${currentQuestion.answers.b}
    </label>
    <label>
      <input type="radio" name="question${currentQuestionIndex}" value="c">
      ${currentQuestion.answers.c}
    </label>
  `;
  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  startTimer();
}

function showResults() {
  console.log("showResults function called");

  const answerContainer = quizContainer.querySelector("input:checked");
  const userAnswer = answerContainer ? answerContainer.value : null;

  if (!answerContainer) {
    console.error("No answer selected");
    return;
  }

  const labels = Array.from(
    document.querySelectorAll(`[name="question${currentQuestionIndex}"]`)
  );

  console.log("User Answer:", userAnswer);
  console.log("Correct Answer:", questions[currentQuestionIndex].correctAnswer);

  labels.forEach((label) => {
    const input = label.querySelector("input");
    console.log("Label Input:", input ? input.value : "No input element found");
    if (
      input &&
      input.value === questions[currentQuestionIndex].correctAnswer
    ) {
      label.classList.add("correct");
    } else if (input && input.value === userAnswer) {
      label.classList.add("incorrect");
    }
  });

  // Move this line to ensure it's only updated after checking answers
  const nextQuestionIndex = currentQuestionIndex + 1;

  if (nextQuestionIndex < questions.length) {
    currentQuestionIndex = nextQuestionIndex;
    updateProgressBar();
    buildQuiz();
  } else {
    clearInterval(timer);
    displayFinalResults();
  }
}

submitButton.addEventListener("click", () => {
  console.log("Next button clicked");
  showResults();
});

function startTimer() {
  let timeRemaining = quizDuration;
  timer = setInterval(() => {
    if (timeRemaining <= 0) {
      clearInterval(timer);
      displayFinalResults();
    } else {
      timeRemaining--;
      updateTimerDisplay(timeRemaining);
      updateProgressBar();
    }
  }, 1000);
}

function updateTimerDisplay(timeRemaining) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerContainer.textContent = `${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressBar.setAttribute("aria-valuenow", progress);
}

function displayFinalResults() {
  resultContainer.innerHTML = `You completed the quiz!`;
  const correctAnswers = quizContainer.querySelectorAll(".correct").length;
  resultContainer.innerHTML += `<p>You scored ${correctAnswers} out of ${questions.length}.</p>`;

  if (correctAnswers === questions.length) {
    resultContainer.innerHTML +=
      "<p>Congratulations! You got all the questions right!</p>";
  } else if (correctAnswers === 0) {
    resultContainer.innerHTML += "<p>Oops! Better luck next time.</p>";
  }
  submitButton.disabled = true;
}

buildQuiz();

submitButton.addEventListener("click", showResults);
