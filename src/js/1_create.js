const serialize = require('serialize-javascript');
const fs = require('browserify-fs');
const { elements } = require('../HTMLelements/1_create_quiz');
const Question = require('./question');
const Quiz = require('./quiz');

const setQuizesInFile = (fileName, text) => {
  fs.writeFile(fileName, text, { flag: 'a+' }, (err) => {
    if (err) throw err;
    fs.readFile(fileName, 'utf8', (error, data) => {
      console.log(data);
    });
  });
};

let optionCounter = 1;
const quiz = new Quiz([]);
const minCountOfOptions = 1;
const maxCountOfOptions = 5;
let questionType = 'radio';
const question1 = new Question('2 + 2 * 2 = ?', [4, 8, 6, 0, 2], ['6']);
quiz.questions.push(question1);

const updateCounterParagraph = (paragraph, count, current = count) => {
  paragraph.textContent = `Question ${current + 1} of ${count + 1}`;
};

// event listeners

const changeTypeOfQuestion = () => {
  const index = elements.typeOfQuestion.selectedIndex;
  questionType = elements.typeOfQuestion.options[index].value;

  const items = elements.optionsList.children;
  // eslint-disable-next-line no-restricted-syntax
  for (const item of items) {
    item.firstElementChild.type = questionType;
  }
};

const addOption = () => {
  if (optionCounter < maxCountOfOptions) {
    optionCounter++;
    const item = document.createElement('li');
    item.setAttribute('id', `item${optionCounter}`);
    item.innerHTML = `<input class="${questionType} m-2 form-check-input" type="${questionType}" name="answer" value=${optionCounter}>
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

  const checkedList = document.querySelectorAll(`input[type=${questionType}]:checked`);
  const answers = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const checked of checkedList) {
    answers.push(options[checked.value - 1]);
  }

  const question = new Question(questionText, options, answers);

  quiz.questions.push(question);
  const text = serialize(quiz);
  setQuizesInFile('quizes.txt', text);

  updateCounterParagraph(elements.counterParagraph, quiz.questions.length);

  const form = document.getElementById('question-form');
  form.reset();
  deleteAllOptions();
};

elements.btnDeleteOption.onclick = deleteOption;
elements.btnAddOption.onclick = addOption;
elements.btnReset.onclick = deleteAllOptions;
elements.btnAddQuestion.onclick = endQuestion;
elements.typeOfQuestion.onchange = changeTypeOfQuestion;
