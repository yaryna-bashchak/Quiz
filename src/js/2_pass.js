const serialize = require('serialize-javascript');
const fs = require('browserify-fs');
const { elements } = require('../HTMLelements/2_pass_quiz');
const Question = require('./question');

// values
let currentQuestion = 0;
let questions = [];

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

const updateCounterParagraph = (paragraph, count, current) => {
  paragraph.textContent = `Question ${current + 1} of ${count}`;
};

(async () => {
  questions = await getQuestionsFromFile('questions.txt');
})();

// event listeners

const startQuiz = () => {
  updateCounterParagraph(elements.counterParagraph, questions.length, currentQuestion);
  elements.btnStartQuiz.hidden = true;
  elements.btnPrevQuestion.hidden = false;
  elements.btnNextQuestion.hidden = false;
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
  if (currentQuestion + 1 >= questions.length) elements.btnNextQuestion.disabled = true;
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
  if (currentQuestion + 1 < questions.length) elements.btnNextQuestion.disabled = false;
  if (currentQuestion + 1 <= 1) elements.btnPrevQuestion.disabled = true;
};

elements.btnStartQuiz.onclick = startQuiz;
elements.btnNextQuestion.onclick = nextQuestion;
elements.btnPrevQuestion.onclick = prevQuestion;
