import {Gameboard, Ship, Player} from './factories.js';
import {addComputerShips, addShip} from './ships.js';
import {computersTurn, startGame} from './game.js';


//creating objects for the game
const gameboardComputer = Gameboard()
const gameboardUser = Gameboard()
export {gameboardUser, gameboardComputer};


//DOM manipulation
//Variables

var shipsize = 5
var alignment = "horizontal"
var gameStarted = false
var gameOver = false
var shotFired = false
var soundOn = true
var addedShip = 0

const palette = document.querySelector(('#placementBoard'))
const paletteContainer = document.querySelector(('#paletteContainer'))

//Vertical - horizontal button
const alignmentBtn = document.querySelector('#alignmentBtn');
    alignmentBtn.addEventListener('click', () => {
        
        if (alignment === "horizontal") {
            alignment = "vertical"
            alignmentBtn.innerText = "Vertical"
        }
        
        else {
            alignment = "horizontal" 
            alignmentBtn.innerText = "Horizontal"
        }

    });

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



//function for the initial placement board
function placementBoard () {

    let board = document.createElement('div');
    board.setAttribute('style', 'display: flex; align-items: stretch; width: 600px; height: 600px; ');

    for (let i = 0; i < 10; i++) {

        const i_Divs = []; 
        const k_Divs = [];

        i_Divs[i] = document.createElement('div');
        //set the id of the div to the number of the div
        i_Divs[i].setAttribute('id', `column_no_${i}`); 


        //set style 
        i_Divs[i].setAttribute('style', 'display: flex; flex-direction: column; align-content: stretch; width: 100%; ');    

        for (let k = 0; k < 10; k++) {

            k_Divs[k] = document.createElement('div');
            //set the id of the div to the number of the div
            k_Divs[k].setAttribute('id', `div_no_${k*10+i}`); 

            //create borders and set style
            k_Divs[k].setAttribute('style', 'display: flex; justify-content: center; align-items: center; font-size: 35px; user-select: none; border: 1px solid black; height: 100% ; background-color: white'); 

            //set an attribute that will help identify these divs when we select them
            k_Divs[k].setAttribute('data-src', ''); 

                //for each box we add a 'hover' (mouseover) listener
                k_Divs[k].addEventListener('mouseover', () => {

                    //if the game has started, do nothing
                    if (gameStarted === true){
                        return
                    }

                    //if the game is over, do nothing
                    if (gameOver === true){
                        return
                    }

                    //if the alignment is vertical, this is how we paint the boxes on hover
                    if (alignment === "vertical"){ 
                        //size of the hover effect will be depends on the ship size
                        for (let j = 0; j < shipsize; j++) {
                            //if it is exceeding the board size, turn it backwards 
                            if (k+shipsize > 9){
                                //we don't want mouseover to green the tiles that are gray (have a ship placed)
                                if (k_Divs[k-j].style.backgroundColor === "slategray"){
                                    return
                                }
                                k_Divs[k-j].style.backgroundColor = "lightgreen";
                            }else{
                                //we don't want mouseover to green the tiles that are gray (have a ship placed)
                                if (k_Divs[k+j].style.backgroundColor === "slategray"){
                                    return
                                }
                                k_Divs[k+j].style.backgroundColor = "lightgreen";
                            }
                        }
                    } else{ //if the alignment is horizontal, we paint the tiles horizontally
                        //
                        if (k_Divs[k].style.backgroundColor === "slategray"){
                            return
                        }

                        for (let j = 0; j < shipsize; j++) {
                            k_Divs[k].style.backgroundColor = "lightgreen";
                            //get the last 2 characters of the id of the hovered tile
                            //id is something like div_no_24 so we are getting the number at the end
                            let idNo = k_Divs[k].id.slice(7)

                            //
                            if (k_Divs[k].style.backgroundColor === "slategray"){
                                return
                            }

                            //we get the last digit of the id of the hovered tile and ship size to it
                            //if it is exceeding the board size, turn it backwards 
                            if (parseInt(k_Divs[k].id.at(-1))+shipsize > 9){
                                let z = document.querySelector("#div_no_"+(parseInt(idNo)-j))
                                //if there is a ship in any of the occupied tiles, do nothing
                                if (z.style.backgroundColor === "slategray"){
                                    return
                                }
                                z.style.backgroundColor = "lightgreen";
                            } else{
                                let z = document.querySelector("#div_no_"+(parseInt(idNo)+j))
                                //if there is a ship in any of the occupied tiles, do nothing
                                if (z.style.backgroundColor === "slategray"){
                                    return
                                }
                                z.style.backgroundColor = "lightgreen";
                            }
                        }
                    }

                });

                //mouseout listener for cleaning the tiles once hovering is over
                k_Divs[k].addEventListener('mouseout', () => {
                    //if the game has started, do nothing
                    if (gameStarted === true){
                        return
                    }
                    //if the game is over, do nothing
                    if (gameOver === true){
                        return
                    }

                    if (alignment === "vertical"){                    
                        for (let j = 0; j < shipsize; j++) {
                        //if it is exceeding the board size, turn it backwards 
                        if (k+shipsize > 9){
                            //we don't want mouseout to white the tiles that are gray (have a ship placed)
                            if (k_Divs[k-j].style.backgroundColor === "slategray"){
                                return
                            }
                            k_Divs[k-j].style.backgroundColor = "white";
                        }else{
                        
                            if (k_Divs[k+j].style.backgroundColor === "slategray"){
                                return
                            }
                            k_Divs[k+j].style.backgroundColor = "white";
                        }
                    } }
                    else{ //if the alignment is horizontal, this is how we clean the tiles once the hovering is over
                 
                        if (k_Divs[k].style.backgroundColor === "slategray"){
                            return
                        }

                        for (let j = 0; j < shipsize; j++) {
                            k_Divs[k].style.backgroundColor = "white";
                            //get the last 2 characters of the id of the hovered tile
                            //id is something like div_no_24 so we are getting the number at the end
                            let idNo = k_Divs[k].id.slice(7)

                            //we get the last digit of the id of the hovered tile and ship size to it
                            //if it is exceeding the board size, turn it backwards 
                            if (parseInt(k_Divs[k].id.at(-1))+shipsize > 9){
                                let z = document.querySelector("#div_no_"+(parseInt(idNo)-j))
                                //if there is a ship in any of the occupied tiles, do nothing
                                if (z.style.backgroundColor === "slategray"){
                                    return
                                }
                                z.style.backgroundColor = "white";
                            } else{
                                let z = document.querySelector("#div_no_"+(parseInt(idNo)+j))
                                //if there is a ship in any of the occupied tiles, do nothing
                                if (z.style.backgroundColor === "slategray"){
                                    return
                                }
                                z.style.backgroundColor = "white";
                            }
                    }

                }});
                //click listener for adding a ship and turning color to gray
                k_Divs[k].addEventListener('click', () => {

                    //if the game has started, do nothing
                    if (gameStarted === true){
                        return
                    }
                    //if the game is over, do nothing
                    if (gameOver === true){
                        return
                    }
                    //if the alignment is vertical, this is how the click function works
                    if (alignment === "vertical"){
                        for (let x = 0; x < shipsize; x++) {
                            if (k+shipsize > 9){
                                //if there is a ship in any of the occupied tiles, do nothing
                                if (k_Divs[k-x].style.backgroundColor === "slategray"){
                                    return
                                }
                            }else{
                                //if there is a ship in any of the occupied tiles, do nothing
                                if (k_Divs[k+x].style.backgroundColor === "slategray"){
                                    return
                                }
                            }
                        }
                        //if there is not a ship in the tile, turn it gray and add a ship 
                        for (let j = 0; j < shipsize; j++) {
                            //if it is exceeding the board size, turn it backwards 
                            if (k+shipsize > 9){
                                k_Divs[k-j].style.backgroundColor = "slategray";
                                
                            }else{
                                k_Divs[k+j].style.backgroundColor = "slategray";
                                
                            }
                        }
                     }
                    else{ //if the alignment is horizontal, this is how the click function works
                        //check if the there is already a ship in the hovered tiles, if there is, do nothing
                        for (let x = 0; x < shipsize; x++) {

                            let idNo = k_Divs[k].id.slice(7)

                            if (parseInt(k_Divs[k].id.at(-1))+shipsize > 9){
                                let z = document.querySelector("#div_no_"+(parseInt(idNo)-x))
                                //if there is a ship in any of the occupied tiles, do nothing
                                if (z.style.backgroundColor === "slategray"){
                                    return
                                }
                            } else{
                                let z = document.querySelector("#div_no_"+(parseInt(idNo)+x))
                                if (z.style.backgroundColor === "slategray"){
                                    return
                                }
                            }

                        }
                        //if the tiles are not occupied, turn them into gray and add a ship
                        for (let j = 0; j < shipsize; j++) {

                            let idNo = k_Divs[k].id.slice(7)

                            if (parseInt(k_Divs[k].id.at(-1))+shipsize > 9){
                                let z = document.querySelector("#div_no_"+(parseInt(idNo)-j))
                                z.style.backgroundColor = "slategray";
                                
                            } else{
                                let z = document.querySelector("#div_no_"+(parseInt(idNo)+j))
                                z.style.backgroundColor = "slategray";
                                
                            }
                        }   
                    }
                    //no matter where the user clicked, activate the addship function with the ID number of clicked tile.
                    //we handle how the position the ship while adding it to db within the Gameboard object.
                    addShip (alignment, k_Divs[k].id)
                    //after each ship is added, increase the addedShip variable by 1, so the size can change via addedShips()
                    addedShip++
                    //call the function to change the ship size
                    addedShips()

                });


            i_Divs[i].appendChild(k_Divs[k]); 
        }    
        board.appendChild(i_Divs[i])
    } 
    return board

}

let finalplacementBoard = placementBoard()
palette.appendChild(finalplacementBoard)




//function for producing a random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//function for displaying text with an interval
function printLetterByLetter(destination, message, speed){
    document.getElementById(destination).innerText = ""
    var i = 0;
    var interval = setInterval(function(){
        //start adding
        document.getElementById(destination).innerHTML += message.charAt(i);
        i++;
        if (i > message.length){
            clearInterval(interval);
        }
    }, speed);
}

//deciding on the ship size, depending on how many ships have been added by the player
function addedShips() {
    if (addedShip ===1){
        shipsize = 4
    } else if(addedShip ===2){
        shipsize = 3
    } else if(addedShip ===3){
        shipsize = 3
    } else if(addedShip ===4){
        shipsize = 2
    } else if(addedShip ===5){
        gameStarted = true
    }
}



function computerBoardCreation(){

    //placing the ships randomly inside the "gameboardComputer" object
    addComputerShips()

    console.log(gameboardComputer.x_axis)

    //board creation
    let board = document.createElement('div');
    board.setAttribute('style', 'display: flex; align-items: stretch; width: 600px; height: 600px; ');

    for (let i = 0; i < 10; i++) {

        const i_Divs = []; 
        const k_Divs = [];

        i_Divs[i] = document.createElement('div');
        //set the id of the div to the number of the div
        i_Divs[i].setAttribute('id', `comp_column_no_${i}`); 


        //set style 
        i_Divs[i].setAttribute('style', 'display: flex; flex-direction: column; align-content: stretch; width: 100%; ');    

        for (let k = 0; k < 10; k++) {

            k_Divs[k] = document.createElement('div');
            //set the id of the div to the number of the div
            k_Divs[k].setAttribute('id', `comp_div_no_${k*10+i}`); 

            //create borders and set style
            k_Divs[k].setAttribute('style', 'display: flex; justify-content: center; align-items: center; font-size: 35px; user-select: none; border: 1px solid black; height: 100% ; background-color: white'); 

            //set an attribute that will help us identify these divs when we select them
            k_Divs[k].setAttribute('data-src', ''); 


                //for each box we add a 'hover' listener
                //how many tiles change is based on the ship size
                k_Divs[k].addEventListener('mouseover', () => {

                    //if the game is over, do nothing
                    if (gameOver === true){
                        return
                    }
                    //if the tile has been hit already, do nothing
                    if(k_Divs[k].style.backgroundColor === "lightblue" || k_Divs[k].style.backgroundColor === "slategray"){
                        return 
                    }
                    k_Divs[k].style.backgroundColor = "blue"
                })
                //mouseout listener for cleaning the tiles once hovering is over
                k_Divs[k].addEventListener('mouseout', () => {
                    //if the game is over, do nothing
                    if (gameOver === true){
                        return
                    }
                    //if the tile has been hit already, do nothing
                    if(k_Divs[k].style.backgroundColor === "lightblue" || k_Divs[k].style.backgroundColor === "slategray"){
                        return 
                    }
                    k_Divs[k].style.backgroundColor = "white"
                });
                //click listener for adding a ship and turning color to gray
                k_Divs[k].addEventListener('click', () => {
                    //if the game is over, do nothing
                    if (gameOver === true){
                        return
                    }

                    //if a shot is already fired, do nothing
                    if (shotFired === true){
                        return
                    }
                    //if the tile has been hit already, do nothing
                    if(k_Divs[k].style.backgroundColor === "lightblue" || k_Divs[k].style.backgroundColor === "slategray"){
                        return 
                    }

                    //determine the coordinates that are hit by the player, by extracting id
                    //k_Divs[k].id is a string like comp_div_no_36. eliminate the first 12 chars to get the number
                    let id_num = k_Divs[k].id.slice(12)
                    //if the id number consists of 1 character, add a "0" in front of it
                    if (id_num.length === 1){
                        id_num = "0"+id_num
                    }
                    //hit that coordinates on the gameboard object, with the hit function 
                    gameboardComputer.receiveAttack(id_num[0], id_num[1])

                    //display the text area
                    let txt = document.querySelector("#placeships")
                    txt.style.visibility='visible'

                    //if the position has a ship on it, it's a hit, paint it gray and add a X on it
                    if(gameboardComputer.x_axis[id_num[0]][id_num[1]] === "hit"){
                        //add a sound
                        var hitSound = new Audio('/sounds/hit.wav');
                        if (soundOn === true) {
                        hitSound.play();
                        }
                        //add a textchange within the function printLetterByLetter()
                        printLetterByLetter("placeships", "Player fired and... it's a hit!", 40)
                        //add a variable to check if shot fired, don't allow user to fire another shot in the meanwhile
                        shotFired = true
                        setTimeout(function(){
                            shotFired = false
                            k_Divs[k].style.backgroundColor = "slategray"
                            k_Divs[k].innerText = "X"
                            //computer's turn
                            computersTurn()
                            shotFired = true
                            //wait for computer to play its turn, disable click until then
                            setTimeout(function(){shotFired = false}, 1400)
                        }, 1400);
                    }
                    //if the position doesn't have a ship on it, it's a miss, turn it into light blue
                    if(gameboardComputer.x_axis[id_num[0]][id_num[1]] === "miss"){
                        var missSound = new Audio('/sounds/miss.wav');
                        if (soundOn === true) {
                        missSound.play();
                        }
                        //add a textchange within the function printLetterByLetter()
                        printLetterByLetter("placeships", "Player fired and... missed.", 50)
                        //add an pause so game doesn't proceed until sound ends
                        shotFired = true
                        setTimeout(function(){
                            shotFired = false
                            k_Divs[k].style.backgroundColor = "lightblue"
                            //computer's turn
                            computersTurn()
                            shotFired = true
                            setTimeout(function(){shotFired = false}, 1400)
                        }, 1400);

                    }

                    //check if gameover
                    gameboardComputer.gameOver()
                    if (gameboardComputer.gameover ===true){
                        gameOver = true
                        //add a "player wins" text
                        let text = document.createElement('div');
                        text.innerText = "Player Wins!"
                        let container = document.querySelector("#middle")
                        container.appendChild(text)
                    }




                })
                i_Divs[i].appendChild(k_Divs[k]); 
            }    
            board.appendChild(i_Divs[i])
        } 
        return board
     
}

export {computerBoardCreation, placementBoard, getRandomInt, printLetterByLetter};


