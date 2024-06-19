
// Variablen definieren

const fields = document.querySelectorAll('.field');             // fields wählt jedes Feld (jeden button) aus
const restartBtn = document.querySelector('.js-reset-button');  // wählt reset button aus
const change = document.querySelector('.js-switch-marks');      // wählt switch marks button aus
const winningConditions = [                                     // definieren wann ein Sieg passiert
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let options = ['', '', '', '', '', '', '', '', '', ];           // array zum speichern der Werte in entsprechenden inizes
let running = false;                                            // spiel läuft nicht
let statusText = document.querySelector('.js-state')            // wählt paragraphen aus um den status des spiels wiederzugeben
let currentPlayer = 'X';                                        // fängt immer mit X an


// Ausführen

startGame();                                                    


// Funktionen definieren

function startGame() {
    fields.forEach(field => field.addEventListener('click', fieldClicked));       // für jedes angklickte feld soll fieldcklicked() ausgeführt werden
    restartBtn.addEventListener('click', restartGame);                              // für Reset button soll restartGame() ausgeführt werden
    change.addEventListener('click', switchBtn);                                    // für Switch Marks button soll switchBtn() ausgeführt werden
    running = true;                                                                 // speil läuft 
} 

function fieldClicked() {
    const cellIndex = this.getAttribute('cellIndex');                               // this wählt das elemet aus was man angeklickt hat. mit getAttribute('cellIndex') bekommt man das Attribut des elementes 

    if (options[cellIndex] != '' || !running) {                                     // cellindex = Zahl zwschen 0 - 8.   options wählt array für ergebnis aus und nimmt die Zahl aus cellIndex als eigene Index
        return;                                                                     // => wenn array leer oder running falsch dann soll fieldClicked stoppen oder spiel wird gestoppt bei runnin = false. 
    }                                                                               // Andernfalls soll updateCell() durchgeführt werden

    updateCell(this, cellIndex);                                                    // updateCell() nimmt parameter this & cellIndex
    checkWinner();                                                                  // der winner wird nach jeder runde gecheckt.
}

function updateCell(cell, index) {                                                  // nimmt 2 parameter cell & index
    options[index] = currentPlayer;                                                 // soll den currentPlayer zum entsprechenden array index (0 - 8) hinzufügen
    cell.textContent = currentPlayer;                                               // soll das entsprechende feld mit Text füllen (ob X oder O)
}   

function checkWinner() {            
    let roundWon = false;                                                           // eine lokale variable die immer false anzegt bis eine runde gewonnen wurde

    for (let i = 0; i < winningConditions.length; i++) {                            // for-Loop durch array(winningConditions)
        const condition = winningConditions[i];                                     // variable für index in array definiert
        const cellA = options[condition[0]];                                        // variable für index in array innerhalb der array definiert * 3
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == '' || cellB == '' || cellC == '') {                            // condition: wenn es eine leere fläche gibt dann geht es 
            continue;                                                               // weiter
        }
        if (cellA == cellB && cellB == cellC) {                                     // condition: wenn bei eines der winningConditions cellA == cellB == cellC eintrifft dann gibt es einen gewinner  
            roundWon = true;                                                        // variable roudnWon wird dann zu true
            break;                                                                  // loop wird dann unterbrochen
        }
    }

    if (roundWon) {                                                                 // condition: wenn roundWon = true => Textausgabe
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;                                                            // dann running = false setzen damit spiel stoppt und kein klick mehr geht
    } 
    else if (!options.includes('')) {                                               // falls das spiel weitergeht und keine felder mehr leer sind => Textausgebe(Draw)
        statusText.textContent = `Draw!`;
        running = false
    } else {
        changePlayer();                                                             // andernfalls soll der spieler gewechselt werden von X zu O oder O zu X. changePlayer() wird ausgeführt
    }
}

function changePlayer() {                                                               
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';        //shortcut if statement      //condition: wenn currentPlayer = X dann O andernfalls X
    statusText.textContent = `${currentPlayer} 's turn`;
}

function restartGame() {                                                                
    currentPlayer = currentPlayer;                                                            // standardmäßig auf X player setzen
    options = ['', '', '', '', '', '', '', '', '', ];                               // array(ergebnis) leeren 
    statusText.textContent = `${currentPlayer}'s turn`
    fields.forEach(field => field.textContent = '');                                // textContent innerhalb der Felder soll bei jedem element geleert werden
    running = true;                                                                 // running = true um erneut spielen zu können
}

function switchBtn() {                                                              
    currentPlayer = (currentPlayer == 'O') ? 'X' : 'O';                             // condition: wenn currentPlayer = X dann O andernfalls X
    statusText.textContent = `${currentPlayer}'s turn`;                             
    restartGame();                                                                  // retstartGame() soll erneut ausgeführt werden um von vorne anzufangen
    alert('You switched sides, time for a Restart!')                                // alarm tauch auf das man gewechselt hat
}