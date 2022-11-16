const optionsList = document.getElementById('options-list');

let optionCounter = 1;

class Question {
  constructor(question, options, answer) {
    this.question = question;
    this.options = options;
    this.answer = answer;
  }
}

const question1 = new Question(
  '2 + 2 * 2 = ?',
  [4, 8, 6, 0, 2],
  6,
);

console.log(question1);

const addOption = () => {
  optionCounter++;
  const item = document.createElement('li');
  item.setAttribute('id', `option-item${optionCounter}`);
  item.innerHTML = `<input type="radio" name="answer"><input type="text" id="input-option${optionCounter}"></il><br>`;
  optionsList.appendChild(item);
};

const deleteOption = () => {
  if (optionCounter > 1) {
    const item = document.getElementById(`option-item${optionCounter}`);
    item.remove();
    optionCounter--;
  }
};
