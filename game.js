import {gameboardUser, gameboardComputer} from './gameboards.js';
import {computerBoardCreation, placementBoard, getRandomInt, printLetterByLetter}  from './gameboards.js';


var soundOn = true


//sound buttons
const soundonBtn = document.querySelector('#soundonSVG');
const soundoffBtn = document.querySelector('#soundoffSVG');

soundonBtn.addEventListener('click', () => {
    soundOn = false
    soundonBtn.style.display = "none"
    soundoffBtn.style.display = "block"
});

soundoffBtn.addEventListener('click', () => {
    soundOn = true
    soundonBtn.style.display = "block"
    soundoffBtn.style.display = "none"
});



function startGame(){

    //remove the alignment button and "place your ships text"
    let txt = document.querySelector("#placeships")
    let btn = document.querySelector("#alignmentBtn")
    btn.remove()
    txt.style.visibility='hidden'

    //position the current board to the left, create another board and place on the right
    let computerBoard = document.createElement('div');
    let computerplacementBoard = computerBoardCreation()
    computerBoard.appendChild(computerplacementBoard)
    paletteContainer.appendChild(computerBoard)


}


//function for computer's turn
function computersTurn(){

    //produce two random numbers from 0-9 for random hitting coordinates
    var a = getRandomInt(10)
    var b = getRandomInt(10)

    //if this tile has already been hit, call the function again for another hit because it's not a legal move
    if (gameboardUser.x_axis[a][b] === "hit" || gameboardUser.x_axis[a][b] === "miss"){
        return computersTurn()
    }
    //hit the coordinates on the gameboardUser object
    gameboardUser.receiveAttack(a, b)

    //get a divno for the queryselector 
    var divno = String(a) + String(b)
    if (a === 0){
        divno = String(b)
    }

    //get the tile that was hit
    let z = document.querySelector("#div_no_"+divno)

    //if it's a hit, paint it gray and add a X on it
    if(gameboardUser.x_axis[a][b] === "hit"){
        //add a sound
        var hitSound = new Audio('/sounds/hit.wav');
        if (soundOn === true) {
        hitSound.play();
        }
        //add a textchange within the function printLetterByLetter()
        printLetterByLetter("placeships", "Computer fired and... it's a hit!", 40)
        //time the shot's landing with the text and sound
        setTimeout(function(){
            
            z.style.backgroundColor = "slategray"
            z.innerText = "X"
        }, 1400);
    }
    //if the position doesn't have a ship on it, it's a miss, turn it into light blue
    if(gameboardUser.x_axis[a][b] === "miss"){
        //add a sound
        var missSound = new Audio('/sounds/miss.wav');
        if (soundOn === true) {
        missSound.play();
        }
        //add a textchange within the function printLetterByLetter()
        printLetterByLetter("placeships", "Computer fired and... missed.", 40)
        //time the shot's landing with the text and sound
        setTimeout(function(){
            z.style.backgroundColor = "lightblue"
        }, 1400);

    } 

    //check if gameover
    gameboardUser.gameOver()
    if (gameboardUser.gameover ===true){
        gameOver = true
        //add a computer wins text
        let text = document.createElement('div');
        text.innerText = "Computer Wins!"
        let container = document.querySelector("#middle")
        container.appendChild(text)
    }

}

export {computersTurn, startGame};