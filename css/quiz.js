fetch("quizzes.json")
  .then((response) => response.json())
  .then((data) => initializeQuiz(data))
  .catch((error) => console.error("Error loading quiz:", error));

const sidebar = document.getElementById("ul-sidebar");
const title = document.getElementById("title");
const beginnerQuizzes = [0, 1, 2, 3];
const beginnerArticles = [
  "css-intro",
  "adding-css",
  "0",
  "css-colors",
  "css-background",
  "css-borders",
  "1",
  "css-width",
  "css-padding",
  "css-box",
  "2",
  "css-font",
  "css-text",
  "css-align",
  "3",
];
const advancedArticles = [
  "css-display",
  "css-flexbox",
  "css-position",
  "4",
  "css-math",
  "css-important",
  "css-pseudo",
  "5",
  "css-transition",
  "css-animation",
  "css-transform",
  "6",
  "css-media",
  "css-viewport",
  "7",
];

const wrapper = document.querySelector(".wrap");
const observer = new MutationObserver(() => {
  wrapper.style.height = "calc(100vh - 50px)";
  wrapper.style.minHeight = "calc(100vh - 50px)";
});
observer.observe(wrapper, {
  attributes: true,
  attributeFilter: ["style"],
});
//Above is code for getting rid of AdSense's height:auto rule on the wrapper

function initializeQuiz(data) {
  const params = new URLSearchParams(window.location.search);
  const quizID = params.get("id");
  let quiz = data[quizID];
  let beginnerFlag = beginnerQuizzes.includes(Number(quizID));
  sidebar.innerHTML = `
      ${
        beginnerFlag
          ? `<h2 class="sidebar-title">CSS Intro</h2>
        <a href="article.html?page=css-intro">
          <li>CSS Intro</li>
        </a>
        <a href="article.html?page=adding-css">
          <li>Adding CSS</li>
        </a>
        <a href="quiz.html?id=0">
        Unit Quiz
        </a>
        <h2 class="sidebar-title">Colors & Borders</h2>
        <a href="article.html?page=css-colors">
          <li>CSS Colors</li>
        </a>
        <a href="article.html?page=css-background">
          <li>CSS Background</li>
        </a>
        <a href="article.html?page=css-borders">
          <li>CSS Borders</li>
        </a>
        <a href="quiz.html?id=1">
          <li>Unit Quiz</li>
        </a>
        <h2 class="sidebar-title">Adding Space</h2>
        <a href="article.html?page=css-width">
          <li>CSS Width & Height</li>
        </a>
        <a href="article.html?page=css-padding">
          <li>CSS Padding & Margin</li>
        </a>
        <a href="article.html?page=css-box">
          <li>CSS Box Model</li>
        </a>
        <a href="quiz.html?id=2">
          <li>Unit Quiz</li>
        </a>
        <h2 class="sidebar-title">Text & Content</h2>
        <a href="article.html?page=css-font">
          <li>CSS Font</li>
        </a>
        <a href="article.html?page=css-text">
          <li>CSS Text</li>
        </a>
        <a href="article.html?page=css-align">
          <li>CSS Align</li>
        </a>
        <a href="quiz.html?id=3">
          <li>Unit Quiz</li>
        </a>
        <div class="sidebtns">
          <a href="/maclearn/" class="sidebtn">Back</a>
          <a href="article.html?page=css-display" class="sidebtn">Next</a>
        </div>`
          : `<h2 class="sidebar-title">Laying Out Stuff</h2>
        <a href="article.html?page=css-display">
          <li>CSS Display</li>
        </a>
        <a href="article.html?page=css-flexbox">
          <li>CSS Flexbox</li>
        </a>
        <a href="article.html?page=css-position">
          <li>CSS Position</li>
        </a>
        <a href="quiz.html?id=4">
          <li>Unit Quiz</li>
        </a>
        <h2 class="sidebar-title">Useful CSS Tips</h2>
        <a href="article.html?page=css-math">
          <li>CSS Math</li>
        </a>
        <a href="article.html?page=css-important">
          <li>CSS !important</li>
        </a>
        <a href="article.html?page=css-pseudo">
          <li>CSS Pseudo</li>
        </a>
        <a href="quiz.html?id=5">
          <li>Unit Quiz</li>
        </a>
        <h2 class="sidebar-title">Creating Animations</h2>
        <a href="article.html?page=css-transition">
          <li>CSS Transition</li>
        </a>
        <a href="article.html?page=css-animation">
          <li>CSS Animation</li>
        </a>
        <a href="article.html?page=css-transform">
          <li>CSS Transform</li>
        </a>
        <a href="quiz.html?id=6">
          <li>Unit Quiz</li>
        </a>
        <h2 class="sidebar-title">Responsive Design</h2>
        <a href="article.html?page=css-media">
          <li>CSS Media Queries</li>
        </a>
        <a href="article.html?page=css-viewport">
          <li>CSS Viewport</li>
        </a>
        <a href="quiz.html?id=7">
          <li>Unit Quiz</li>
        </a>
        <div class="sidebtns">
          <a href="article.html?page=css-intro" class="sidebtn">Back</a>
          <a href="finish.html" class="sidebtn">Next</a>
        </div>`
      }`;
  let quizURL = window.location.href.split("/").pop();
  let item = document.querySelector(`[href="${quizURL}"]`);
  item.style.color = "rgb(89, 137, 227)";
  item.style.fontWeight = "bold";
  const questions = quiz.questions;
  title.innerHTML = quiz.name + " Quiz | MacLearn";
  const message = document.getElementById("message");
  document.getElementById("message2").innerHTML = quiz.description;
  let completedQuizzes = localStorage.getItem("completequizcss") ? JSON.parse(localStorage.getItem("completequizcss")) : [];

  if (completedQuizzes.includes(quizID)) {
    const warning = document.createElement("div");
    warning.classList.add("warning");
    warning.innerHTML =
      '<img src="/maclearn/media/icons/warning.svg" /> You have already completed and gotten 100% on this quiz before, so no additional XP will be gained from completing the quiz again.';
    message.appendChild(warning);
  }
  let index,
    last = false;
  if (beginnerFlag) {
    index = beginnerArticles.indexOf(quizID);
    if (index == beginnerArticles.length - 1) {
      beginnerFlag = false;
      index = -1;
    }
  } else {
    index = advancedArticles.indexOf(quizID);
    if (index == advancedArticles.length - 1) {
      last = true;
    }
  }
  let prevNextLinks = beginnerFlag
    ? ["article.html?page=" + beginnerArticles[index + 1], "article.html?page=" + beginnerArticles[index - 1]]
    : [
        "article.html?page=" + advancedArticles[index + 1],
        "article.html?page=" + (index == -1 ? beginnerArticles[beginnerArticles.length - 2] : advancedArticles[index - 1]),
      ];
  if (last) {
    prevNextLinks[0] = "finish.html";
  }
  setupQuiz(questions, prevNextLinks, quiz.end);
  console.log(prevNextLinks);
}

function setupQuiz(questions, links, end) {
  let currentQuestionIndex = 0;
  let correctArray = [],
    answerArray = [];

  const start = document.getElementById("start");
  const quiz = document.getElementById("question-container");
  const question = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const back = document.getElementById("back");
  const controls = document.getElementById("controls");
  const results = document.getElementById("results");
  back.classList.add("hide");

  function startQuiz() {
    start.innerHTML = "Next";
    quiz.classList.remove("hide");
    back.classList.remove("hide");
    results.classList.add("hide");
    setNextQuestion();
  }

  function setNextQuestion() {
    answerButtonsElement.innerHTML = "";
    showQuestion(questions[currentQuestionIndex]);
    start.innerHTML = currentQuestionIndex === questions.length - 1 ? "Finish" : "Next";
  }

  function showQuestion(q) {
    question.innerText = q.question;
    q.answers.forEach((answer, index) => {
      const button = document.createElement("div");
      const label = document.createElement("label");
      const radioButton = document.createElement("input");

      radioButton.setAttribute("type", "radio");
      label.setAttribute("for", index);
      radioButton.setAttribute("id", index);
      radioButton.setAttribute("name", "radio");
      label.innerText = answer.text;
      button.classList.add("btn");

      if (answer.correct) {
        button.dataset.correct = true;
      }

      if (answerArray[currentQuestionIndex] === index) {
        radioButton.checked = true;
      }

      button.appendChild(radioButton);
      button.appendChild(label);
      button.addEventListener("click", () => {
        const correct = button.dataset.correct;
        if (correct) {
          correctArray[currentQuestionIndex] = true;
        } else {
          correctArray[currentQuestionIndex] = false;
        }
        answerArray[currentQuestionIndex] = index;
      });
      answerButtonsElement.appendChild(button);
    });
  }

  start.addEventListener("click", () => {
    if (start.innerHTML === "Start") {
      startQuiz();
      controls.style.display = "none";
    } else if (start.innerHTML === "Next") {
      currentQuestionIndex++;
      lastPage = false;
      setNextQuestion();
    } else if (start.innerHTML === "Finish") {
      currentQuestionIndex++;
      showResults();
    }
  });
  let lastPage = false;
  function showResults() {
    lastPage = true;
    question.classList.add("hide");
    results.classList.remove("hide");
    back.classList.add("hide");
    answerButtonsElement.classList.add("hide");

    let correctCount = correctArray.filter(Boolean).length;
    let percentage = Math.round((correctCount / questions.length) * 100);

    results.innerHTML = `Your quiz score is ${percentage}% correct.<br>Go back, review, and improve your score!`;

    if (percentage > 99) {
      const params = new URLSearchParams(window.location.search);
      const quizID = params.get("id");
      results.innerHTML = `Your quiz score is ${percentage}% correct!<br>${end}`;
      let completedQuizzes = localStorage.getItem("completequizcss") ? JSON.parse(localStorage.getItem("completequizcss")) : [];
      if (completedQuizzes.includes(quizID)) {
        createNotification("Quiz completed before, no XP earned.");
      } else {
        createNotification(`Quiz completed! +${percentage} XP!`);
        let totalXP = localStorage.getItem("cssxp") ? Number(localStorage.getItem("cssxp")) : 0;
        totalXP += percentage;
        localStorage.setItem("cssxp", totalXP);
        completedQuizzes.push(quizID);
        localStorage.setItem("completequizcss", JSON.stringify(completedQuizzes));
        let achievements = localStorage.getItem("achievements") ? JSON.parse(localStorage.getItem("achievements")) : [];
        console.log(totalXP, localStorage.getItem("htmlxp"))
        if (
          totalXP == 800 &&
          localStorage.getItem("htmlxp") == "600" &&
          !achievements.includes("Web Development Master: Finish both HTML and CSS courses")
        ) {
          achievements.push("Web Development Master: Finish both HTML and CSS courses");
          localStorage.setItem("achievements", JSON.stringify(achievements));
          createNotification(
            "Quiz complete, Achievement earned: Web Development Master! Go to your learner profile on the top right to learn more."
          );
        }
      }
      start.innerHTML = "Go!";
      start.addEventListener("click", () => {
        if (currentQuestionIndex == questions.length && lastPage) {
          window.location.href = links[0];
        }
      });
    } else {
      start.innerHTML = "Review!";
      start.addEventListener("click", () => {
        if (currentQuestionIndex == questions.length && lastPage) {
          window.location.href = links[1];
        }
      });
    }
    showAnalysis(answerArray, questions);
  }

  back.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      setNextQuestion();
      question.classList.remove("hide");
      results.classList.add("hide");
      answerButtonsElement.classList.remove("hide");
    } else {
      controls.style.display = "flex";
      start.innerHTML = "Start";
      quiz.classList.add("hide");
      back.classList.add("hide");
    }
  });
}

function showAnalysis(answers, questions) {
  const results = document.getElementById("results");
  questions.forEach((question, questionindex) => {
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question-container");
    questionContainer.innerHTML = `
    <h3>${question.question}</h3>
    `;
    let correctIndex = question.answers.findIndex((answer) => answer.correct);
    question.answers.forEach((answer, index) => {
      const answerContainer = document.createElement("div");
      answerContainer.classList.add("answer");
      answerContainer.textContent = answer.text;
      questionContainer.appendChild(answerContainer);
      if ((answers[questionindex] !== correctIndex && answers[questionindex] === index) || !answers[questionindex]) {
        answerContainer.classList.add("wrong");
      }
      if (index === correctIndex) {
        answerContainer.classList.add("correct");
      }
      if (answers[questionindex] === index) {
        const userAnswer = document.createElement("div");
        const userAnsweri = document.createElement("img");
        userAnsweri.src = "/maclearn/media/icons/user-answer.svg";
        userAnswer.appendChild(userAnsweri);
        userAnswer.classList.add("user-answer");
        answerContainer.appendChild(userAnswer);
      }
    });
    results.appendChild(questionContainer);
  });
}

function createNotification(message) {
  if (document.querySelector(".notification")) {
    document.body.removeChild(document.querySelector(".notification"));
  }
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerHTML = "<img src='/maclearn/media/icons/notification.svg'>" + message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}
