const { Question } = require('./question');

class CheckboxQuestion extends Question {
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

module.exports = { CheckboxQuestion };
