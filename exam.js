import Timer from './timer.js';
import Question from './question.js';

export default class Exam {

    constructor(examQuestions) {
        this.studentName = '';
        this.questions = this.randomizedQuestions(examQuestions);
        this.timer = new Timer();
        this.currentQuestion = 0;
        this.score = 0;
    }

    start() {
        document.addEventListener("DOMContentLoaded", () => {
            const myModal = new bootstrap.Modal(document.getElementById('myModal'));
            myModal.show();

            const nameInput = document.getElementById('nameInput');
            const submitButton = document.getElementById('submitButton');
            nameInput.addEventListener('input', () => {
                submitButton.disabled = nameInput.value.trim() === '';
            });

            submitButton.addEventListener('click', () => {
                this.studentName = nameInput.value.trim();
                this.timer.start();
                this.showNameTime(this.studentName);
                this.showQuestion();
                const id = setInterval(() => {
                    if (this.currentTime <= 0) {
                        this.showResults();
                        clearInterval(id);
                    }
                }, 100);

            });

            window.submitForm = () => {
                const myModalEl = document.getElementById('myModal');
                const myModal = bootstrap.Modal.getInstance(myModalEl);
                myModal.hide();
            };
        });
    }

    randomizedQuestions(questions) {
        const array = Array.from(questions);
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j] ,array[i]];
            for (let x = array[i].answers.length - 1; x > 0; x--) {
                const y = Math.floor(Math.random() * (x + 1));
                [array[i].answers[x] , array[i].answers[y]] = [array[i].answers[y] , array[i].answers[x]];
            }
        }
        return array;
    }

    showQuestion() {
        if (this.currentQuestion > 0 && this.currentQuestion < this.questions.length) {
            document.querySelector('.question-container').remove();
        }

        const question = new Question(this.questions[this.currentQuestion]);

        question.renderQuestion();

        const container = document.querySelector('.question-container');
        const nextBtn = document.createElement("button");

        nextBtn.classList.add("nextBtn", "disabled");
        nextBtn.textContent = "Next";


        container.appendChild(nextBtn);

        const examSection = document.querySelector("#exam-main");
        examSection.appendChild(container);

        nextBtn.addEventListener('click', () => {
            if (!question.isAnswered) {
                return;
            }
            if (question.answeredCorrectly) {
                this.score++;
            }
            if (this.currentQuestion == this.questions.length - 1) {
                this.showResults();
            }
            this.currentQuestion++;
            if (this.currentQuestion >= this.questions.length) {
                return;
            }
            this.showQuestion();
        });
    }

    createNameElement(studentName) {
        const name = document.createElement("p");
        name.classList.add("name");
        name.textContent = `Name : ${studentName}`;
        return name;
    }

    showNameTime(studentName) {
        const containerNameTime = document.createElement("div");
        containerNameTime.classList.add("top-bar");

        const nameElement = this.createNameElement(studentName);
        containerNameTime.appendChild(nameElement);

        const timerElement = this.timer.createTimerElement();
        containerNameTime.appendChild(timerElement);

        const examElement = document.querySelector("body");
        examElement.prepend(containerNameTime);
    }

    showResults() {
        this.timer.stop();
        document.querySelector('#exam-main').remove();
        var bar = new ProgressBar.Circle('#results #progress', {
            color: '#aaa',
            strokeWidth: 4,
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false
            },
            from: { color: '#aaa', width: 1 },
            to: { color: '#333', width: 4 },
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);

                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText('0%');
                } else {
                    circle.setText(value + '%');
                }

            }
        });
        bar.text.style.fontSize = '30px';

        bar.animate(this.score * this.questions.length / 100);

        const results = document.querySelector('#results');
        const p = document.createElement('p');

        p.textContent = `You have ${this.score} out of ${this.questions.length} correct answers.`;

        results.appendChild(p);
        results.style.display='flex';
    }

    get currentTime() { return this.timer.seconds; }
}