class Question {
  _questionText;
  _options;
  _answers;
  _type;
  _selected;

  constructor(questionText, options, answers, type) {
    this._questionText = questionText;
    this._options = options;
    this._answers = answers;
    this._type = type;
    this._selected = [];
  }

  printQuestion(paragraph, list) {
    paragraph.textContent = `Task: ${this._questionText}`;
    this.printOptions(list);
  }

  checkAnswers() {
    let rightAnswers = 0;
    let wrongAnswers = 0;
    for (let i = 0; i < this._selected.length; i++) {
      if (this._answers.includes(this._selected[i])) rightAnswers++;
      else wrongAnswers++;
    }
    const score = rightAnswers / (this._answers.length + wrongAnswers);
    return score;
  }

  deleteQuestion(paragraph) {
    paragraph.textContent = '';
    this.deleteOptions();
  }

  deleteOptions() {
    let countOfOptions = this._options.length;
    while (countOfOptions > 0) {
      const item = document.getElementById(`item${countOfOptions}`);
      item.remove();
      countOfOptions--;
    }
  }

  clearSelected() {
    this._selected = [];
  }
}

class RadioQuestion extends Question {
  rememberAnswer() {
    const checked = document.querySelector('input[type=radio]:checked');
    this._selected = [];
    if (checked) this._selected = checked.value;
  }

  printOptions(list) {
    for (let i = 0; i < this._options.length; i++) {
      const item = document.createElement('li');
      item.setAttribute('id', `item${i + 1}`);
      const isSelected = this._selected.some((x) => x === this._options[i]);
      item.innerHTML = `
      <label class="form-check-label">
      <input class="m-2 form-check-input" type="radio" name="answer" value=${this._options[i]} ${isSelected ? 'checked' : ''}>
        ${this._options[i]}
      </label></il><br>`;
      list.appendChild(item);
    }
  }
}

class CheckboxQuestion extends Question {
  rememberAnswer() {
    const checkedList = document.querySelectorAll('input[type=checkbox]:checked');
    this._selected = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const checked of checkedList) {
      this._selected.push(checked.value);
    }
  }

  printOptions(list) {
    for (let i = 0; i < this._options.length; i++) {
      const item = document.createElement('li');
      item.setAttribute('id', `item${i + 1}`);
      const isSelected = this._selected.some((x) => x === this._options[i]);
      item.innerHTML = `
      <label class="form-check-label">
      <input class="m-2 form-check-input" type="checkbox" name="answer" value=${this._options[i]} ${isSelected ? 'checked' : ''}>
        ${this._options[i]}
      </label></il><br>`;
      list.appendChild(item);
    }
  }
}

module.exports = { RadioQuestion, CheckboxQuestion };
