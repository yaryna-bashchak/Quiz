class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.current = 0;
  }

  countScore() {
    this.score = 0;

    for (let i = 0; i < this.questions.length; i++) {
      this.score += this.questions[i].checkAnswers();
    }

    return this.score.toFixed(2);
  }
}

module.exports = { Quiz };
