const serialize = require('serialize-javascript');
const fs = require('browserify-fs');
const { elements } = require('../HTMLelements/1_create_quiz');
const { Quiz } = require('./quiz');

const setQuizesInFile = (fileName, text) => {
  fs.writeFile(fileName, text, { flag: 'a+' }, (err) => {
    if (err) throw err;
  });
};

let optionCounter = 1;
const quiz = new Quiz([]);
const minCountOfOptions = 1;
const maxCountOfOptions = 5;
let questionType = 'radio';

const question1 = {
  questionText: '2 + 2 * 2 = ?',
  options: ['4', '8', '6', '0', '2'],
  answers: '6',
  questionType: 'radio',
};
quiz.questions.push(question1);

// additional functions

const updateCounterParagraph = (paragraph, count, current = count) => {
  paragraph.textContent = `Question ${current + 1} of ${count + 1}`;
};

const getOptions = () => {
  const optionElements = document.querySelectorAll('.option');

  const options = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const option of optionElements) {
    options.push(option.value);
  }

  return options;
};

const getAnswers = (options, type) => {
  if (type === 'radio') {
    const checked = document.querySelector('input[type=radio]:checked');
    if (checked) return options[checked.value - 1];
  }

  if (type === 'checkbox') {
    const checkedList = document.querySelectorAll('input[type=checkbox]:checked');
    const answers = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const checked of checkedList) {
      answers.push(options[checked.value - 1]);
    }
    return answers;
  }

  return 0;
};

const addWarningClass = (elem) => {
  if (elem.classList.contains('is-invalid')) elem.classList.remove('is-invalid');

  if (!elem.value) {
    elem.classList.add('is-invalid');
    return true;
  }

  return false;
};

const validate = (selector) => {
  let isValid = true;

  const elems = document.querySelectorAll(selector);
  // eslint-disable-next-line no-restricted-syntax
  for (const elem of elems) {
    if (addWarningClass(elem)) isValid = false;
  }

  return isValid;
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
  const isQuestionValid = validate('#input-question');
  const isOptionsValid = validate('.option');

  if (isQuestionValid && isOptionsValid) {
    const questionText = elements.inputQuestion.value;
    const options = getOptions();
    const answers = getAnswers(options, questionType);

    const question = {
      questionText,
      options,
      answers,
      questionType,
    };

    quiz.questions.push(question);

    const text = serialize(quiz);
    setQuizesInFile('quizes.txt', text);

    updateCounterParagraph(elements.counterParagraph, quiz.questions.length);

    elements.form.reset();
    elements.typeOfQuestion.value = questionType;
    deleteAllOptions();
  }
};

elements.btnDeleteOption.onclick = deleteOption;
elements.btnAddOption.onclick = addOption;
elements.btnReset.onclick = deleteAllOptions;
elements.btnAddQuestion.onclick = endQuestion;
elements.typeOfQuestion.onchange = changeTypeOfQuestion;
