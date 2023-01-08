class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.current = 0;
  }

  restart() {
    this.score = 0;
    this.current = 0;

    for (let i = 0; i < this.questions.length; i++) {
      this.questions[i].clearSelected();
    }
  }

  countScore() {
    this.score = 0;

    for (let i = 0; i < this.questions.length; i++) {
      this.score += this.questions[i].checkAnswers();
    }

    this.score = this.score.toFixed(2);
  }
}

module.exports = { Quiz };
