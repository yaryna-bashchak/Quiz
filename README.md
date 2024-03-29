# Web App to create and pass *QUIZZES*

### Project structure

```
quiz   
│
└───pages
│   │   1_create_quiz.html
│   │   2_pass_quiz.html
│
└───src
    │ 
    └───js
    │   │   1_create.js        - functions for 1st page
    │   │   2_pass.js          - functions for 2nd page
    │   │   quiz.js            - class Quiz
    │   │   question.js        - class Question and its child classes
    │   │   
    │   └───bundled            - here is bundled files created by browserify
    │   │   ...
    │
    └───HTMLelements           - here is elements from pages getted by id
    │   │   1_create_quiz.js
    │   │   2_pass_quiz.js
    │ 
    └───styles
    │   │   bootstrap.min.css
    │   │   style.css
 
```
 
---

### About project

When the user creates a new quiz, program creates new instance of the <code>class **Quiz**</code>, which will store array of questions.

Each question is also object that stores information about itself and have methods to check answer, display itself, etc. At the moment, here is two child classes (<code>class **RadioQuestion**</code> and <code>class **CheckboxQuestion**</code>) inherits from <code>class **Question**</code>. The child classes were created to use **polymorphism**.

When user finishes creating quiz, **serialized data** is written to a **file**. And when user want to pass it (go to 2nd page), data is read from the file and **deserialized**. In the future, it is planned to use a database instead.

Also to make app more visually appealing I use [bootstrap styles](https://getbootstrap.com/docs/4.0/getting-started/introduction/).


---

### How to run?

The project is written on JavaScript. So, in order to be able to use <code>require(...)</code>, it is used <code>**browserify**</code> to write and use Node.js-style modules that compile for use in the browser.

The project is simply run by opening html-file in your browser. Or by opening with Live Server in VS Code which is much better.

**How to apply changes made in js-files?**

Since pages includes bundled js-file as a script source, you must rebundle it to apply the changes.
Here is the example command:

<code>$ browserify 1_create.js -o bundled/1_bundle.js</code>

---

### Testing

As **CREATOR** of quiz you could...

- **create new quiz** and the **questions** in the format of tests

<img src="https://user-images.githubusercontent.com/90560209/211863610-506e3a1d-6d13-4409-9285-8de98f408b55.png" alt="image" height="450"/><img src="https://user-images.githubusercontent.com/90560209/211778657-ff49957f-7abc-4e6d-b271-dda70a78c744.png" alt="image" height="450"/>

- use buttons below to 
  - **add new** option (max number: 5)
  - **delete last** option (min number: 1)
  - **reset** all input
  - **add question** to the current quiz

<img src="https://user-images.githubusercontent.com/90560209/211778925-09260be8-0293-4bd8-9b0c-db9d1623f6e0.png" alt="image" height="450"/>

- switch between different **types of question** (now only radiobutton and checkbox are available)

<img src="https://user-images.githubusercontent.com/90560209/211781938-0115f589-2b0b-474d-890d-3e77cf6bafc8.png" alt="image" height="450"/> <img src="https://user-images.githubusercontent.com/90560209/211781960-87a7e9ff-bfe9-4a4a-9ecd-c346d46974ba.png" alt="image" height="450"/>

----

As **STUDENT** (or someone else who want to pass the quiz) you could...

- choose the answer/answers you think are **correct**

<img src="https://user-images.githubusercontent.com/90560209/211798996-3d2b7c80-3075-461a-a78b-6201f1d6d60e.png" alt="image" height="350"/><img src="https://user-images.githubusercontent.com/90560209/211799021-1acb62ac-0d7a-46ba-a8f2-eb0e800f712c.png" alt="image" height="350"/>

- switch between the questions by using **buttons** below and change your decision

<img src="https://user-images.githubusercontent.com/90560209/211856151-fd0a00a4-f4a9-45c6-82d3-9cd5a6df7f5b.png" alt="image" height="350"/>

- **finish** the quiz if you are on the last question

<img src="https://user-images.githubusercontent.com/90560209/211856657-cc048926-9dfc-4939-b4f6-9e022ad28455.png" alt="image" height="300"/>

- see your **score** and **try again**

<img src="https://user-images.githubusercontent.com/90560209/211801256-fc956e24-55ea-4d7d-97a6-79a4b66e4088.png" alt="image" height="200"/>

----

### Validation

You **must**...
- choose **at least one answer** (otherwise a *warning* will appear)

<img src="https://user-images.githubusercontent.com/90560209/211859648-fea33583-04e4-4a10-b4ef-61dfe1852363.png" alt="image" height="450"/>

- **fill every existing field** (otherwise a *warning* will appear)

<img src="https://user-images.githubusercontent.com/90560209/211859810-21de4f0d-bedd-4d32-a7c3-69651a0fc8f6.png" height="450"/>

You **can not**...
- move to the **previous question** when you are on the **1st** (button is *disabled*)

<img src="https://user-images.githubusercontent.com/90560209/211859968-22151a7c-bb9a-41cf-960d-7013a2311714.png" alt="image" height="350"/>

- **add next option** if the max number already exist (button is *disabled*)

<img src="https://user-images.githubusercontent.com/90560209/211862216-c7808316-9639-4046-b252-451e9b510c61.png" alt="image" height="450"/><img src="https://user-images.githubusercontent.com/90560209/211862230-b0a30e5b-a6bd-4996-a709-daf36f30b791.png" alt="image" height="450"/>

- **delete last** option if the only **one exists** (button is *disabled*)

<img src="https://user-images.githubusercontent.com/90560209/211861263-1c37a6ee-38d0-40a8-af1a-74ddb2b0ab90.png" alt="image" height="400"/><img src="https://user-images.githubusercontent.com/90560209/211861245-e6843319-11c4-4d90-a56b-c2ae6a52023e.png" alt="image" height="400"/>
