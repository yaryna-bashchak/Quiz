const serialize = require('serialize-javascript');
const fs = require('browserify-fs');
const { elements } = require('../HTMLelements/1_create_quiz');
const Question = require('./question');

const setQuestionsInFile = (fileName, text) => {
  fs.writeFile(fileName, text, { flag: 'a+' }, (err) => {
    if (err) throw err;
    fs.readFile(fileName, 'utf8', (error, data) => {
      console.log(data);
    });
  });
};

let optionCounter = 1;
const questions = [];
const minCountOfOptions = 1;
const maxCountOfOptions = 5;
const question1 = new Question('2 + 2 * 2 = ?', [4, 8, 6, 0, 2], [6]);
questions.push(question1);

// event listeners

const addOption = () => {
  if (optionCounter < maxCountOfOptions) {
    optionCounter++;
    const item = document.createElement('li');
    item.setAttribute('id', `item${optionCounter}`);
    item.innerHTML = `<input class="radio m-2 form-check-input" type="radio" name="answer" value=${optionCounter}>
      <input class="option form-control" type="text" id="option${optionCounter}" placeholder="choice${optionCounter}"></il><br>`;
    elements.optionsList.appendChild(item);
  }
  if (optionCounter > minCountOfOptions) elements.btnDeleteOption.disabled = false;
  if (optionCounter >= maxCountOfOptions) elements.btnAddOption.disabled = true;
};

const deleteOption = () => {
  if (optionCounter > minCountOfOptions) {
    const item = document.getElementById(`item${optionCounter}`);
    item.remove();
    optionCounter--;
  }
  if (optionCounter < maxCountOfOptions) elements.btnAddOption.disabled = false;
  if (optionCounter <= minCountOfOptions) elements.btnDeleteOption.disabled = true;
};

const deleteAllOptions = () => {
  while (optionCounter > minCountOfOptions) deleteOption();
};

const endQuestion = () => {
  const questionText = document.getElementById('input-question').value;

  const optionElements = document.querySelectorAll('.option');
  const options = [];
  for (let i = 0; i < optionCounter; i++) {
    options.push(optionElements[i].value);
  }

  const radioElements = document.querySelectorAll('.radio');
  const answers = [];
  for (let i = 0; i < optionCounter; i++) {
    if (radioElements[i].checked) answers.push(options[i]);
  }

  const question = new Question(questionText, options, answers);

  questions.push(question);
  const text = serialize(questions);
  setQuestionsInFile('questions.txt', text);

  const form = document.getElementById('question-form');
  form.reset();
  deleteAllOptions();
};

elements.btnDeleteOption.onclick = deleteOption;
elements.btnAddOption.onclick = addOption;
elements.btnReset.onclick = deleteAllOptions;
elements.btnAddQuestion.onclick = endQuestion;
