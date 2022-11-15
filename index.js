class Question {
  constructor(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
  }
}

const question1 = new Question(
  '2 + 2 * 2 = ?',
  [4, 8, 6, 0, 2],
  6,
);

console.log({ ...question1 });
