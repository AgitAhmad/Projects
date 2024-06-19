let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};                              //get score out of st  / shortcut of:

updateScoreElement();

/* if (!score) {                //this
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
} */

let isAutoPlaying = false;
let intervalId; 
const innerElement = document.querySelector('.js-auto-play-btuuon')

//const autoPlay = () => {

//}
function autoPlay() {

    if(!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    }   
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    });
document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    });
document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('scissors');
    });
document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
        showResetConfirmation();
    })
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        showResetConfirmation();
    }
})


function showResetConfirmation() {
    document.querySelector('.js-are-you-sure-button')
            .innerHTML = `Are you Sure? 
            <button class="js-yes-button">
                Yes
            </button>
            <button class="js-no-button">
                No
            </button>`;

    document.querySelector('.js-yes-button')
    .addEventListener('click', () => {
        resetScore()
        hideResetConfirmation()
    })

    document.querySelector('.js-no-button')
    .addEventListener('click', () => {
        hideResetConfirmation()
    })
}

function hideResetConfirmation() {
    document.querySelector('.js-are-you-sure-button')
            .innerHTML = '';
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}


document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
        const innerValue = document.querySelector('.js-auto-play-button')

        if (innerValue.innerHTML === 'Auto Play') {
            innerValue.innerHTML = 'Stop Playing'
        } else {
            innerValue.innerHTML = 'Auto Play'
        }
        autoPlay();
    })
document.body.addEventListener('keydown', (event) => {
        if (event.key === 'a') {
            autoPlay();
        }
    })

console.log(!isAutoPlaying);

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors')
    }
})

function playGame(playerMove) {
    const computerMove = pickComputerMove(); //variable infunction is inside scope noerror

    let result = '';                    // Compare our move to Computer move


    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }
        
    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    };

    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    };

    localStorage.setItem('score', JSON.stringify(score));   //safe score in storage

    updateScoreElement();

    document.querySelector('.js-result')
        .innerHTML = result;

    document.querySelector('.js-moves')
        .innerHTML = `
            You
            <img src="/RPS/img/${playerMove}-emoji.png" class="move-icon">
            <img src="/RPS/img/${computerMove}-emoji.png" class="move-icon">
            Computer`;
};

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

function pickComputerMove() {
    const randomNumber = Math.random(); // Generate a random Number

    let computerMove = '';              // Computer selects a Move

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;                        // no code runs after retur statements
};