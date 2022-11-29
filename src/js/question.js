module.exports = class {
  constructor(question, options, answers) {
    this.question = question;
    this.options = options;
    this.answers = answers;
  }

  printQuestion(paragraph, list) {
    paragraph.textContent = `Task: ${this.question}`;
    this.printOptions(list);
  }

  printOptions(list) {
    for (let i = 0; i < this.options.length; i++) {
      const item = document.createElement('li');
      item.setAttribute('id', `item${i + 1}`);
      item.innerHTML = `
        <input class="radio m-2 form-check-input" type="radio" name="answer" value=${this.options[i]}>
        <label class="form-check-label">${this.options[i]}</label></il><br>`;
      list.appendChild(item);
    }
  }

  checkAnswer() {}

  deleteOptions() {}
};
