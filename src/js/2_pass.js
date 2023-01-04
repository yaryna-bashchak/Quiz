const fs = require('browserify-fs');
const { elements } = require('../HTMLelements/2_pass_quiz');
const Question = require('./question');

// values
let currentQuestion = 0;
let questions = [];
let score;

// eslint-disable-next-line no-eval
const deserialize = (text) => eval(`(${text})`);

const getQuestionsFromFile = async (fileName) => {
  const array = [];
  await fs.readFile(fileName, 'utf8', (error, data) => {
    const deserializedData = deserialize(data);
    deserializedData.forEach((elem) => {
      const question = new Question(elem.question, elem.options, elem.answers);
      array.push(question);
    });
  });

  return array;
};

(async () => {
  questions = await getQuestionsFromFile('questions.txt');
})();

const updateCounterParagraph = (paragraph, count = 0, current = 0) => {
  if (count === 0 && current === 0) paragraph.textContent = '';
  else paragraph.textContent = `Question ${current + 1} of ${count}`;
};

const printScore = (paragraph, clear = false) => {
  if (clear) paragraph.textContent = '';
  else paragraph.textContent = `Your score: ${score} of ${questions.length}`;
};

// event listeners

const startQuiz = () => {
  updateCounterParagraph(elements.counterParagraph, questions.length, currentQuestion);
  elements.btnStartQuiz.hidden = true;
  elements.btnPrevQuestion.hidden = false;

  if (questions.length > 1) elements.btnNextQuestion.hidden = false;
  else elements.btnFinishQuiz.hidden = false;

  questions[currentQuestion].printQuestion(elements.questionParagraph, elements.optionsList);
};

const nextQuestion = () => {
  questions[currentQuestion].rememberAnswer(elements.optionsList);

  if (currentQuestion + 1 < questions.length) {
    questions[currentQuestion].deleteOptions();
    currentQuestion++;
    updateCounterParagraph(elements.counterParagraph, questions.length, currentQuestion);
    questions[currentQuestion].printQuestion(elements.questionParagraph, elements.optionsList);
  }

  if (currentQuestion + 1 >= questions.length) {
    elements.btnNextQuestion.hidden = true;
    elements.btnFinishQuiz.hidden = false;
  }

  if (currentQuestion + 1 > 1) elements.btnPrevQuestion.disabled = false;
};

const prevQuestion = () => {
  questions[currentQuestion].rememberAnswer(elements.optionsList);

  if (currentQuestion > 0) {
    questions[currentQuestion].deleteOptions();
    currentQuestion--;
    updateCounterParagraph(elements.counterParagraph, questions.length, currentQuestion);
    questions[currentQuestion].printQuestion(elements.questionParagraph, elements.optionsList);
  }

  if (currentQuestion + 1 < questions.length) {
    elements.btnFinishQuiz.hidden = true;
    elements.btnNextQuestion.hidden = false;
  }

  if (currentQuestion + 1 <= 1) elements.btnPrevQuestion.disabled = true;
};

const finishQuiz = () => {
  score = 0;
  questions[currentQuestion].rememberAnswer(elements.optionsList);

  for (let i = 0; i < questions.length; i++) {
    score += questions[i].checkAnswers();
  }

  console.log(score);
};

elements.btnStartQuiz.onclick = startQuiz;
elements.btnNextQuestion.onclick = nextQuestion;
elements.btnPrevQuestion.onclick = prevQuestion;
elements.btnFinishQuiz.onclick = finishQuiz;
