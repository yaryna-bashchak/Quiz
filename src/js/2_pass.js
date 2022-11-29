const serialize = require('serialize-javascript');
const fs = require('browserify-fs');
const { elements } = require('../HTMLelements/2_pass_quiz');
const Question = require('./question');

let currentQuestion = 0;

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

let questions = [];
(async () => {
  questions = await getQuestionsFromFile('questions.txt');
})();

// event listeners

const startQuiz = () => {
  elements.btnStartQuiz.hidden = true;
  elements.btnPrevQuestion.hidden = false;
  elements.btnNextQuestion.hidden = false;
  questions[currentQuestion].printQuestion(elements.questionParagraph, elements.optionsList);
};

const nextQuestion = () => {
  if (currentQuestion + 1 < questions.length) {
    questions[currentQuestion].deleteOptions();
    currentQuestion++;
    questions[currentQuestion].printQuestion(elements.questionParagraph, elements.optionsList);
  }
};

const prevQuestion = () => {
  
}

elements.btnStartQuiz.onclick = startQuiz;
elements.btnNextQuestion.onclick = nextQuestion;
elements.btnPrevQuestion.onclick = prevQuestion;
