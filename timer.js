export default class Timer {

    constructor() {
        this.seconds = 60;
        this.intervalId = 0;
        this.timerElement = 0;
    }
    
    start() {
        this.intervalId = setInterval(() => {
            this.seconds--;
            this.updateTimerDisplay();
            if (this.seconds <= 0) {
                this.stop();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    updateTimerDisplay() {
        if (this.timerElement) {
            this.timerElement.textContent = `Time Remaining: ${this.seconds}s`;
        }
    }

    createTimerElement() {
        this.timerElement = document.createElement("p");
        this.timerElement.textContent = `Time Remaining: ${this.seconds}s`;
        return this.timerElement;
    }

}