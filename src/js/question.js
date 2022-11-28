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
      item.innerHTML = `<input type="radio" name="answer" class="radio" value=${this.options[i]}><span>${this.options[i]}</span></il><br>`;
      list.appendChild(item);
    }
  }

  checkAnswer() {}

  deleteOptions() {}
};
