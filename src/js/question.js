class Question {
  constructor(questionText, options, answers, type) {
    this.questionText = questionText;
    this.options = options;
    this.answers = answers;
    this.type = type;
    this.selected = [];
  }

  printQuestion(paragraph, list) {
    paragraph.textContent = `Task: ${this.questionText}`;
    this.printOptions(list);
  }

  checkAnswers() {
    let rightAnswers = 0;
    let wrongAnswers = 0;
    for (let i = 0; i < this.selected.length; i++) {
      if (this.answers.includes(this.selected[i])) rightAnswers++;
      else wrongAnswers++;
    }
    const score = rightAnswers / (this.answers.length + wrongAnswers);
    return score;
  }

  deleteQuestion(paragraph) {
    paragraph.textContent = '';
    this.deleteOptions();
  }

  deleteOptions() {
    let countOfOptions = this.options.length;
    while (countOfOptions > 0) {
      const item = document.getElementById(`item${countOfOptions}`);
      item.remove();
      countOfOptions--;
    }
  }

  clearSelected() {
    this.selected = [];
  }
}

class RadioQuestion extends Question {
  rememberAnswer() {
    const checked = document.querySelector('input[type=radio]:checked');
    this.selected = [];
    if (checked) this.selected = checked.value;
  }

  printOptions(list) {
    for (let i = 0; i < this.options.length; i++) {
      const item = document.createElement('li');
      item.setAttribute('id', `item${i + 1}`);
      const isSelected = this.selected.some((x) => x === this.options[i]);
      item.innerHTML = `
      <label class="form-check-label">
      <input class="m-2 form-check-input" type="radio" name="answer" value=${this.options[i]} ${isSelected ? 'checked' : ''}>
        ${this.options[i]}
      </label></il><br>`;
      list.appendChild(item);
    }
  }
}

class CheckboxQuestion extends Question {
  rememberAnswer() {
    const checkedList = document.querySelectorAll('input[type=checkbox]:checked');
    this.selected = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const checked of checkedList) {
      this.selected.push(checked.value);
    }
  }

  printOptions(list) {
    for (let i = 0; i < this.options.length; i++) {
      const item = document.createElement('li');
      item.setAttribute('id', `item${i + 1}`);
      const isSelected = this.selected.some((x) => x === this.options[i]);
      item.innerHTML = `
      <label class="form-check-label">
      <input class="m-2 form-check-input" type="checkbox" name="answer" value=${this.options[i]} ${isSelected ? 'checked' : ''}>
        ${this.options[i]}
      </label></il><br>`;
      list.appendChild(item);
    }
  }
}

module.exports = { RadioQuestion, CheckboxQuestion };
