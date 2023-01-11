Web App to create and pass **quizes**

---

### How to run?

The project is written on JavaScript. So, in order to be able to use <code>require(...)</code>, it is used <code>browserify</code> to write and use Node.js-style modules that compile for use in the browser.

The project is simply run by opening html-file in your browser. Or by opening with Live Server in VS Code which is much better.

**How to apply changes made in js-files?**

Since pages includes bundled js-file as a script source, you must rebundle it to apply the changes.
Here is the example command:

<code>$ browserify 1_create.js -o bundled/1_bundle.js</code>

---

### Testing

As **CREATOR** of quiz you could...

- create your questions in the format of tests

![image](https://user-images.githubusercontent.com/90560209/211778657-ff49957f-7abc-4e6d-b271-dda70a78c744.png)

- use buttons below to 
  - **add new** option (max number: 5)
  - **delete last** option (min number: 1)
  - **reset** all input
  - **add question** to the current quiz

![image](https://user-images.githubusercontent.com/90560209/211778925-09260be8-0293-4bd8-9b0c-db9d1623f6e0.png)

- switch between different **types of question** (now only radiobutton and checkbox are available)

![image](https://user-images.githubusercontent.com/90560209/211781938-0115f589-2b0b-474d-890d-3e77cf6bafc8.png)
![image](https://user-images.githubusercontent.com/90560209/211781960-87a7e9ff-bfe9-4a4a-9ecd-c346d46974ba.png)


As **STUDENT** (or someone else who want to pass the quiz) you could...

- start the quiz
