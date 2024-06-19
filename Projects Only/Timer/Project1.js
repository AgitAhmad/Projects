const innerTimer = document.querySelector('.js-timer')
let intervalId;
let isStart = false;

function pressStart() {
    clearInterval(intervalId);

    intervalId = setInterval(() => innerTimer.innerHTML ++, 1000);
    isStart = true;
}

function pressStop() {
    if (isStart === true) {
        clearInterval(intervalId);
    }
    isStart = false;
}

function pressReset() {
    innerTimer.innerHTML = 0;
}