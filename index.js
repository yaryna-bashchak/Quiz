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
  const item = document.createElement('li');
  optionCounter++;
  item.innerHTML = `<input type="radio" name="answer"><input type="text" id="input-option${optionCounter}"></il><br>`;
  optionsList.appendChild(item);
  console.log('add choice');
};
