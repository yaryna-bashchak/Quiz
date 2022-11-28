const serialize = require('serialize-javascript');
const fs = require('browserify-fs');
const { elements } = require('../HTMLelements/2_pass_quiz');
const Question = require('./question');

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
  questions[0].printQuestion(elements.questionParagraph, elements.optionsList);
};

elements.btnStartQuiz.onclick = startQuiz;
