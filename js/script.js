//Настройки
const settingButton = document.querySelector(".settingButton");
const settingLink = document.querySelector(".settingLink");
const header = document.querySelector("header");

//header
const timerRender = document.querySelector(".render");
const timerSetting = document.querySelector(".setting");

//main
const timerBasic = document.querySelector(".basic");
const timerSettings = document.querySelector(".settings");

settingButton.addEventListener("click", () => {
  timerRender.style.display = "none";
  timerBasic.style.display = "none";

  timerSetting.style.display = "block";
  timerSettings.style.display = "block";

  header.style.marginBottom = "0.2em";
});

settingLink.addEventListener("click", () => {
  timerSetting.style.display = "none";
  timerSettings.style.display = "none";

  timerRender.style.display = "block";
  timerBasic.style.display = "block";

  header.style.marginBottom = "1.5em";
});

//Тема
const themeList = document.querySelectorAll(".themeSwitcher__item");

const rootElement = document.documentElement;
const styles = getComputedStyle(rootElement);

const darkImage = document.querySelectorAll(".dark svg path");

themeList.forEach((item) => {
  item.addEventListener("click", () => {
    themeList.forEach((element) => element.classList.remove("active"));
    item.classList.add("active");

    const themeInfo = document.querySelector(".themeSwitcher__description");
    if (
      themeInfo.innerHTML === "dark mode" &&
      item.classList.contains("light")
    ) {
      themeInfo.textContent = "light mode";
      rootElement.style.setProperty("--main-bg", "#FAFAFA");
      rootElement.style.setProperty("--main-color", "#1C1C1C");
      rootElement.style.setProperty("--button-color", "#0059C1");
      rootElement.style.setProperty("--link-color", "#676767");
      rootElement.style.setProperty("--line-color", "#AFB3B7");

      darkImage.forEach((path) => {
        path.style.fill = "#676767";
      });
    } else if (
      themeInfo.innerHTML === "light mode" &&
      item.classList.contains("dark")
    ) {
      themeInfo.textContent = "dark mode";
      rootElement.style.setProperty("--main-bg", "#232931");
      rootElement.style.setProperty("--main-color", "#EFEFEF");
      rootElement.style.setProperty("--button-color", "#A0CCFF");
      rootElement.style.setProperty("--link-color", "#919498");
      rootElement.style.setProperty("--line-color", "#3D3E42");

      darkImage.forEach((path) => {
        path.style.fill = "#232931";
      });
    }
  });
});

// Таймер
const timerDisplay = document.querySelector(".timer__pomodoro p");
const restartBtn = document.querySelector(".restart");
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");

const focusInput = document.getElementById("focus");
const breakInput = document.getElementById("break");
const restInput = document.getElementById("rest");

let arrInputsValue = [
  parseInt(focusInput.value),
  parseInt(breakInput.value),
  parseInt(restInput.value),
];

function updateInputValues() {
  arrInputsValue = [
    parseInt(focusInput.value),
    parseInt(breakInput.value),
    parseInt(restInput.value),
  ];
}

let pomodoro = new Pomodoro(arrInputsValue);

function updateDisplay(time) {
  timerDisplay.innerHTML = time;
}

focusInput.addEventListener("input", () => {
  updateInputValues();
  pomodoro = new Pomodoro(arrInputsValue);
  timerDisplay.innerHTML =
    arrInputsValue[0] < 10
      ? `0${arrInputsValue[0]}:00`
      : `${arrInputsValue[0]}:00`;
});

breakInput.addEventListener("input", () => {
  updateInputValues();
  pomodoro = new Pomodoro(arrInputsValue);
});

restInput.addEventListener("input", () => {
  updateInputValues();
  pomodoro = new Pomodoro(arrInputsValue);
});

startBtn.addEventListener("click", () => {
  pomodoro.start(updateDisplay);
  console.log(pomodoro);
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
});

pauseBtn.addEventListener("click", () => {
  pomodoro.pause();
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
});

restartBtn.addEventListener("click", () => {
  pomodoro.stop();
  updateDisplay("30:00");
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  timerDisplay.innerHTML =
    arrInputsValue[0] < 10
      ? `0${arrInputsValue[0]}:00`
      : `${arrInputsValue[0]}:00`;
});
