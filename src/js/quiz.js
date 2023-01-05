module.exports = class {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
  }

  countScore() {
    for (let i = 0; i < this.questions.length; i++) {
      this.score += this.questions[i].checkAnswers();
    }
    return this.score;
  }
};
