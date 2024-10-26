class Pomodoro {
  constructor(arr) {
    this.minutes = arr[0] - 1;
    this.seconds = 60;
    this.shortBreak = arr[1];
    this.longRest = arr[2];
    this.initialMinutes = arr[0] - 1;
    this.timer = null;
    this.audio = new Audio("../audio/pobednyiy-zvuk-fanfar.mp3");
    this.count = 0;
    this.isShortBreak = false;
  }

  addZero(num) {
    return num < 10 ? "0" + num : num;
  }

  render() {
    if (this.minutes < 0) return false;

    if (this.seconds > 0) {
      this.seconds--;
    } else if (this.minutes > 0) {
      this.seconds = 59;
      this.minutes--;
    } else {
      this.stop();
      this.playAlarm();
    }

    return `${this.addZero(this.minutes)}:${this.addZero(this.seconds)}`;
  }

  playAlarm() {
    this.audio.play();
  }

  pause() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.minutes = this.initialMinutes;
    this.seconds = 59;
  }

  start(callback) {
    if (!this.timer) {
      this.timer = setInterval(() => {
        const time = this.render();
        if (callback) callback(time);
      }, 1000);
    }
  }
}
