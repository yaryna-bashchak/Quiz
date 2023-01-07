class Question {
  constructor(question, options, answers) {
    this.question = question;
    this.options = options;
    this.answers = answers;
    this.selected = [];
  }

  printQuestion(paragraph, list) {
    paragraph.textContent = `Task: ${this.question}`;
    this.printOptions(list);
  }

  printOptions(list) {
    this.list = list;
    console.log('It\'s parrent method "printOptions"');
  }

  rememberAnswer(list) {
    const radioElements = list.querySelectorAll('.radio');
    this.selected = [];
    for (let i = 0; i < this.options.length; i++) {
      if (radioElements[i].checked) this.selected.push(this.options[i]);
    }
    console.log(this);
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

module.exports = { Question };
