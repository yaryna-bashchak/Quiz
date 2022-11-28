const serialize = require('serialize-javascript');
const fs = require('browserify-fs');
const { elements } = require('../HTMLelements/2_pass_quiz');
const Question = require('./question');

const questions = [];

// eslint-disable-next-line no-eval
const deserialize = (text) => eval(`(${text})`);

const getQuestionsFromFile = (fileName, array) => {
  fs.readFile(fileName, 'utf8', (error, data) => {
    const deserializedData = deserialize(data);
    deserializedData.forEach(elem => {
      const question = new Question(elem.question, elem.options, elem.answers);
      array.push(question);
    });
  });
};

getQuestionsFromFile('questions.txt', questions);
console.log(questions);

const startQuiz = () => {
  elements.btnStartQuiz.hidden = true;
  questions[0].printQuestion();
};

elements.btnStartQuiz.onclick = startQuiz;
