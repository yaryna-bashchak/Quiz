const optionsList = document.getElementById('options-list');
const bDeleteOption = document.getElementById('delete-option');
const bAddOption = document.getElementById('add-option');
const bStartQuiz = document.getElementById('start-quiz');
const questionParagraph = document.getElementById('question-text');

let optionCounter = 1;
const questions = [];
const minCountOfOptions = 1;
const maxCountOfOptions = 5;

class Question {
  constructor(question, options, answers) {
    this.question = question;
    this.options = options;
    this.answers = answers;
  }

  printQuestion() {
    questionParagraph.textContent = `Task: ${this.question}`;
    this.printOptions();
  }

  printOptions() {
    for (let i = 0; i < this.options.length; i++) {
      const item = document.createElement('li');
      item.setAttribute('id', `item${i + 1}`);
      item.innerHTML = `<input type="radio" name="answer" class="radio" value=${this.options[i]}><span>${this.options[i]}</span></il><br>`;
      optionsList.appendChild(item);
    }
  }

  
  checkAnswer() {

  }

  deleteOptions() {
    
  }
}

const question1 = new Question('2 + 2 * 2 = ?', [4, 8, 6, 0, 2], [6]);
questions.push(question1);

const addOption = () => {
  if (optionCounter < maxCountOfOptions) {
    optionCounter++;
    const item = document.createElement('li');
    item.setAttribute('id', `item${optionCounter}`);
    item.innerHTML = `<input class="m-2 form-check-input" type="radio" name="answer" class="radio" value=${optionCounter}>
      <input class="form-control" type="text" class="option" id="option${optionCounter}" placeholder="choice${optionCounter}"></il><br>`;
    optionsList.appendChild(item);
  }
  if (optionCounter > minCountOfOptions) bDeleteOption.disabled = false;
  if (optionCounter >= maxCountOfOptions) bAddOption.disabled = true;
};

const deleteOption = () => {
  if (optionCounter > minCountOfOptions) {
    const item = document.getElementById(`item${optionCounter}`);
    item.remove();
    optionCounter--;
  }
  if (optionCounter < maxCountOfOptions) bAddOption.disabled = false;
  if (optionCounter <= minCountOfOptions) bDeleteOption.disabled = true;
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

  const form = document.getElementById('question-form');
  form.reset();
  deleteAllOptions();
};

const startQuiz = () => {
  bStartQuiz.hidden = true;
  questions[0].printQuestion();
};
