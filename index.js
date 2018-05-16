const questions = [ {
  question: "What year did the first episode air?",
  option1: "2012",
  option2: "2010",
  option3: "2009",
  option4: "2015",
  correctAnswer: "2010"
},
  {
    question: "Who's the main character?",
    option1: "Shane",
    option2: "Michonne",
    option3: "Carl",
    option4: "Rick",
    correctAnswer: "Rick",
  },
  {
    question: "What is Negan’s bat name?",
    option1: "Lucille",
    option2: "Megan",
    option3: "Lucy",
    option4: "Amy",
    correctAnswer: "Lucille"
  },
  {
    question: "What city does the show first take place?",
    option1: "Atlanta",
    option2: "New York City",
    option3: "Los Angeles",
    option4: "Chicago",
    correctAnswer: "Atlanta"
  },
  {
    question: "What season are they on so far?",
    option1: "5th",
    option2: "8th",
    option3: "9th",
    option4: "3rd",
    correctAnswer: "8th"
  },
  {
    question: 'Who says this line, “Just look at the flowers”?',
    option1: "Glen",
    option2: "Maggie",
    option3: "Carol",
    option4: "Daryl",
    correctAnswer: "Carol"
  },
  {
    question: "What was Rick’s profession before the zombie apocalypse?",
    option1: "Teacher",
    option2: "Government Official",
    option3: "Artist",
    option4: "A cop",
    correctAnswer: "A cop"
  },
  {
    question: "In what season did the group arrive at Alexandria?",
    option1: "5th",
    option2: "7th",
    option3: "2nd",
    option4: "8th",
    correctAnswer: "5th"
  },
  {
    question: "How does Shane turn?",
    option1: "He gets bitten by one of the walkers",
    option2: "He’s scratched by one of the walkers",
    option3: "Drinks contaminated water",
    option4: "Gets shot by Rick",
    correctAnswer: "Gets shot by Rick"
  },
  {
    question: "What is Daryl’s preferred type of transportation?",
    option1: "A car",
    option2: "An RV",
    option3: "A school bus",
    option4: "A motorcycle",
    correctAnswer: "A motorcycle"
  }
];

let questionNumber = 0;
let score = 0;

//function to iterate questions and change question number
function iterateQuestion() {
  questionNumber++;
  $(".questionNumber").text(questionNumber+1);
}

//function to update score and show current score
function updateScore() {
  score++;
  $(".showScore").text(score);
}

//generate html for questions & answers
function renderQuestions(questionNumber) {
  $(".quizQuestion").html(`${questions[questionNumber].question}`);
  $("#js-quiz-form").html(`<fieldset><label for="answerChoice" class="filledBackground"><input class="option" type="radio" name="answerChoice" value="${questions[questionNumber].option1}" required>${questions[questionNumber].option1}</label>
  <label for="answerChoice"><input class="option" type="radio" name="answerChoice" value="${questions[questionNumber].option2}" required>${questions[questionNumber].option2}</label>
  <label for="answerChoice" class="filledBackground"><input class="option" type="radio" name="answerChoice" value="${questions[questionNumber].option3}" required>${questions[questionNumber].option3}</label>
  <label for="answerChoice"><input class="option" type="radio" name="answerChoice" value="${questions[questionNumber].option4}" required>${questions[questionNumber].option4}</label>
  <button class="js-submit submitButton" type="submit">Submit</button></fieldset>`);
}


//start quiz function
function handleStartButton() {
$(".startButton").on("click", function(event) {
  renderQuestions(questionNumber);
  handleSubmitButton();
  $(this).addClass("hideStartButton");
  $(".startContainer").remove();
  $(".quizInfoDisplay").toggle();
  $("section").toggle();
  $(".questionNumber").text(1);
});
}

//submit button form
function handleSubmitButton() {
  $("#js-quiz-form").on("submit", function(event) {
    event.preventDefault();
    
    let answerSelected = $("input:checked").val();
    let correctAnswer = `${questions[questionNumber].correctAnswer}`;
    if (answerSelected === correctAnswer) {
      correctFeedbackPage(); 
      updateScore();
    } else {
      incorrectFeedbackPage();
    }
    $(".questionsContainer").hide();
    $(".feedbackPage").toggle();
  });
}

//correct feedback page
function correctFeedbackPage() {
  $(".feedbackPage").html(`<h2>Correct!</h2><i class="far fa-check-circle fa-3x"></i><br>
  <button class="nextButton">Next</button>`);
}

//function for incorrect feedback page
function incorrectFeedbackPage() {
  $(".feedbackPage").html(`<h2>Oops, wrong answer.</h2> <h3>The correct answer is: <span class="feedbackCorrectAnswer">${questions[questionNumber].correctAnswer}</span></h3>
  <i class="far fa-times-circle fa-3x"></i><br><button class="nextButton">Next</button>`);
}

//function for next button
function handleNextButton() {
  $(".feedbackPage").on("click", ".nextButton", function(event) {
    if (questionNumber < questions.length - 1) {
    iterateQuestion();
    nextQuestion();
    } else {
      resultsPage();
    }
   });
}

//function to show next question
function nextQuestion() {
  renderQuestions(questionNumber);
  $(".questionsContainer").show();
  $(".feedbackPage").hide();
  
}

//function to show score results at end of quiz
function resultsPage() {
  $(".feedbackPage").html(`<h2 class="scoreResults">Your final score is: ${score}</h2>`);
  if (score >= 7) {
    $(".feedbackPage").append(`<img src="https://media.giphy.com/media/Aa9zP9nyaHeuY/giphy.gif" alt="Andrew Lincoln, who plays 'Rick' on the walking dead, raising his arms and celebrating">
    <p class="resultsComments">I'd say you're a big fan!</p>
    <button class="restartButton">Restart Quiz</button>`);
  } else if (score >= 0) {
    $(".feedbackPage").append(`<p class="resultsComments">Hm, you should probably watch it more.</p>
    <img src="https://media.giphy.com/media/l4FGKxAAwwW2Z8axa/source.gif" alt="Tom Payne, who plays 'Jesus' on the walking dead, waving his hand">
    <button class="restartButton">Restart Quiz</button>`);
  }
}

//function to restart quiz
function restartQuizButton() {
  $(".feedbackPage").on("click", ".restartButton", function (event) {
    location.reload();
  });
}


function handleQuizCreation() {
  handleStartButton();
  handleNextButton();
  restartQuizButton();
}

$(handleQuizCreation);








