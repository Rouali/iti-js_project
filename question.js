export default class Question {
    constructor(question) {
        this.question = question;
        this.answeredCorrectly = false;
        this.isAnswered = false;
    }

    renderQuestion() {
        let container = document.createElement("div");
        container.classList.add("question-container");

        let title = document.createElement("p");
        title.classList.add("question-title");
        title.textContent = this.question.title;

        let img = document.createElement("img");
        img.classList.add("question-image");
        img.src = this.question.image;

        let answersContainer = document.createElement("div");
        answersContainer.classList.add("answers-container");
        for (let i = 0; i < this.question.answers.length; i++) {
            let answerBtn = document.createElement("button");
            answerBtn.classList.add("answer-btn");
            answerBtn.textContent = this.question.answers[i].title;
            answersContainer.appendChild(answerBtn);

            answerBtn.addEventListener('click', () => {
                this.isAnswered = true;
                document.querySelector('.nextBtn').classList.remove('disabled');
                this.question.answers.forEach(answer => answer.isSelected = false);

                this.question.answers[i].isSelected = true;

                if (this.question.answers[i].isCorrect && this.question.answers[i].isSelected) {
                    this.answeredCorrectly = true;
                } else {
                    this.answeredCorrectly = false;
                }
            });
        }

        container.appendChild(title);
        container.appendChild(img);
        container.appendChild(answersContainer);
        let examSection = document.querySelector("#exam-main");
        examSection.appendChild(container);

        const answerBtns = document.querySelectorAll('.answer-btn');
        answerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                answerBtns.forEach(btn => {
                    btn.classList.remove('active');
                });
                btn.classList.add('active');
            });
        });
    }


} 
