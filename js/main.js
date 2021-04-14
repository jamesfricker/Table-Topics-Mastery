const START_THRESHOLD = 2;
const CLOSE_THRESHOLD = 5;
const END_THRESHOLD = 10;

const COLOR_CODES = {
  info: {
    color: "white"
  },
  start: {
    color: "green",
    threshold: START_THRESHOLD
  },
  close: {
    color: "orange",
    threshold: CLOSE_THRESHOLD
  },
  end: {
    color: "red",
    threshold: END_THRESHOLD
  }
};

let timePassed = 0;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;


document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg">
  <circle id="tt-circle" r="50" stroke="black" stroke-width="3" fill="white" />
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timePassed
  )}</span>
</div>
`;

function resetTimer() {
  // resets the timer and the color of stuff
  clearInterval(timerInterval);
  timerInterval = null;
  timePassed = 0;
  document.getElementById("base-timer-label").innerHTML = formatTime(
    timePassed
  );
  document.getElementById("tt-circle").style.fill = COLOR_CODES.info.color;;
}

function startTimer() {
  // means we can't use startTimer twice
  if(timerInterval != null){
    return 0;
  }
  // starts the timer
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timePassed
    );
    setRemainingPathColor(timePassed);

  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timePassed) {
  // set the color depending on how much time is left
  const { info,start, close, end } = COLOR_CODES;
  if (timePassed >= end.threshold) {
    document
      .getElementById("tt-circle")
      .style.fill = end.color;
  } else if (timePassed >= close.threshold) {
    document
      .getElementById("tt-circle")
      .style.fill = close.color;
  } else if (timePassed >= start.threshold) {
    document
      .getElementById("tt-circle")
      .style.fill = start.color;
    }
}

$(document).ready(function(){
  // use for show / hide the timer
  // found here
  // https://stackoverflow.com/questions/13652835/button-text-toggle-in-jquery
  $("#toggleTimer").click(function(){
    $("#base-timer-label").toggle();
    $(this).text(function(i, text){
          return text === "Hide Timer" ? "Show Timer" : "Hide Timer";
      })
  });
});

//// lines[Math.floor(Math.random() * lines.length)]
