const fs = require('browserify-fs');
const { elements } = require('../HTMLelements/2_pass_quiz');
const { RadioQuestion, CheckboxQuestion } = require('./question');
const { Quiz } = require('./quiz');

// values
let quiz;
let score;

const deserialize = (text) => {
  const array = [];
  // eslint-disable-next-line no-eval
  const deserializedData = eval(`(${text})`);

  deserializedData.questions.forEach((elem) => {
    let question;
    const args = [elem.questionText, elem.options, elem.answers, elem.questionType];
    if (elem.questionType === 'radio') question = new RadioQuestion(...args);
    else if (elem.questionType === 'checkbox') question = new CheckboxQuestion(...args);
    console.log(question);
    array.push(question);
  });

  return array;
};

fs.readFile('quizes.txt', 'utf8', (error, data) => {
  const array = deserialize(data);
  quiz = new Quiz(array);
});

const updateCounterParagraph = (paragraph, count = 0, current = 0) => {
  if (count === 0 && current === 0) paragraph.textContent = '';
  else paragraph.textContent = `Question ${current + 1} of ${count}`;
};

const printScore = (paragraph, clear = false) => {
  if (clear) paragraph.textContent = '';
  else paragraph.textContent = `Your score: ${score} of ${quiz.questions.length}`;
};

// event listeners

const startQuiz = () => {
  quiz.current = 0;
  quiz.score = 0;
  for (let i = 0; i < quiz.questions.length; i++) {
    quiz.questions[i].clearSelected();
  }

  updateCounterParagraph(elements.counterParagraph, quiz.questions.length, quiz.current);
  elements.btnStartQuiz.hidden = true;
  elements.btnPrevQuestion.disabled = true;
  elements.btnPrevQuestion.hidden = false;

  if (quiz.questions.length > 1) elements.btnNextQuestion.hidden = false;
  else elements.btnFinishQuiz.hidden = false;

  quiz.questions[quiz.current].printQuestion(elements.questionParagraph, elements.optionsList);
};

const nextQuestion = () => {
  quiz.questions[quiz.current].rememberAnswer();

  if (quiz.current + 1 < quiz.questions.length) {
    quiz.questions[quiz.current].deleteOptions();
    quiz.current++;
    updateCounterParagraph(elements.counterParagraph, quiz.questions.length, quiz.current);
    quiz.questions[quiz.current].printQuestion(elements.questionParagraph, elements.optionsList);
  }

  if (quiz.current + 1 >= quiz.questions.length) {
    elements.btnNextQuestion.hidden = true;
    elements.btnFinishQuiz.hidden = false;
  }

  if (quiz.current + 1 > 1) elements.btnPrevQuestion.disabled = false;
};

const prevQuestion = () => {
  quiz.questions[quiz.current].rememberAnswer();

  if (quiz.current > 0) {
    quiz.questions[quiz.current].deleteOptions();
    quiz.current--;
    updateCounterParagraph(elements.counterParagraph, quiz.questions.length, quiz.current);
    quiz.questions[quiz.current].printQuestion(elements.questionParagraph, elements.optionsList);
  }

  if (quiz.current + 1 < quiz.questions.length) {
    elements.btnFinishQuiz.hidden = true;
    elements.btnNextQuestion.hidden = false;
  }

  if (quiz.current + 1 <= 1) elements.btnPrevQuestion.disabled = true;
};

const finishQuiz = () => {
  quiz.questions[quiz.current].rememberAnswer();

  score = quiz.countScore();

  quiz.questions[quiz.current].deleteQuestion(elements.questionParagraph);
  updateCounterParagraph(elements.counterParagraph);
  printScore(elements.scoreParagraph);

  elements.btnPrevQuestion.hidden = true;
  elements.btnFinishQuiz.hidden = true;
  elements.btnTryAgain.hidden = false;

  console.log(score);
};

const tryAgain = () => {
  printScore(elements.scoreParagraph, true);
  elements.btnTryAgain.hidden = true;
  startQuiz();
};

elements.btnStartQuiz.onclick = startQuiz;
elements.btnNextQuestion.onclick = nextQuestion;
elements.btnPrevQuestion.onclick = prevQuestion;
elements.btnFinishQuiz.onclick = finishQuiz;
elements.btnTryAgain.onclick = tryAgain;
