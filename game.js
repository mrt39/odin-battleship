import {Gameboard, Ship, Player} from './factories.js';


//creating objects for the game
const gameboardComputer = Gameboard()
const gameboardUser = Gameboard()
 

//DOM manipulation

//Variables

var shipsize = 5
var alignment = "horizontal"
let numberofShipsAdded = 0
var gameStarted = false
var gameOver = false
var shotFired = false

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

            //create borders
            k_Divs[k].setAttribute('style', 'display: flex; justify-content: center; align-items: center; font-size: 35px; user-select: none; border: 1px solid black; height: 100% ; background-color: white'); 

            //set an attribute that will help us identify these divs when we select them
            k_Divs[k].setAttribute('data-src', ''); 


                //for each box we add a 'hover' listener
                //how many tiles change is based on the ship size
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
                        //we don't want mouseover to green the tiles that are gray (have a ship placed)
                        if (k_Divs[k].style.backgroundColor === "slategray"){
                            return
                        }

                        for (let j = 0; j < shipsize; j++) {
                            k_Divs[k].style.backgroundColor = "lightgreen";
                            //get the last 2 characters of the id of the hovered tile
                            //id is something like div_no_24 so we are getting the number at the end
                            let idNo = k_Divs[k].id.slice(7)

                            //we don't want mouseout to white the tiles that are gray (have a ship placed)
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
                            //we don't want mouseout to white the tiles that are gray (have a ship placed)
                            if (k_Divs[k+j].style.backgroundColor === "slategray"){
                                return
                            }
                            k_Divs[k+j].style.backgroundColor = "white";
                        }
                    } }
                    else{ //if the alignment is horizontal, this is how we clean the tiles once the hovering is over
                        //we don't want mouseout to white the tiles that are gray (have a ship placed)
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
                        //check if the there is already a ship in the hovered tiles, if there is, do nothing
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
                                //calling addship function
                                
                            }else{
                                k_Divs[k+j].style.backgroundColor = "slategray";
                                //calling addship function
                                
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
                                //if there is a ship in any of the occupied tiles, do nothing
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

                });


            i_Divs[i].appendChild(k_Divs[k]); 
        }    
        board.appendChild(i_Divs[i])
    } 
    return board

}

let finalplacementBoard = placementBoard()
palette.appendChild(finalplacementBoard)


//function for adding ships to the placement board by user click
function addShip (alignment, placement_id) {

    //change the text after each ship is added
    let txt = document.querySelector("#placeships")
    //placement_id is a string like div_no_36. eliminate the first 7 chars to get the number
    let id_num = placement_id.slice(7)
    //if the id number consists of 1 character, add a "0" in front of it
    if (id_num.length === 1){
        id_num = "0"+id_num
    }

    //add a carrier (size:5)
    if (numberofShipsAdded ===0){
        
        gameboardUser.position(Ship("carrier", 5), alignment, parseInt(id_num[0]), parseInt(id_num[1]))
        numberofShipsAdded++
        //change the shipsize to 4 (this is for displaying the hover tiles on dom)
        shipsize = 4
        txt.innerText = "Place your Battleship."
    //add a battleship (size:4)
    } else if (numberofShipsAdded ===1){
        gameboardUser.position(Ship("battleship", 4), alignment, parseInt(id_num[0]), parseInt(id_num[1]))
        numberofShipsAdded++
        shipsize = 3
        txt.innerText = "Place your Submarine."
    //add a destroyer (size:3)
    } else if (numberofShipsAdded ===2){
        gameboardUser.position(Ship("submarine", 3), alignment, parseInt(id_num[0]), parseInt(id_num[1]))
        numberofShipsAdded++
        shipsize = 3
        txt.innerText = "Place your Destroyer."
    //add a submarine (size:3)
    } else if (numberofShipsAdded ===3){
        gameboardUser.position(Ship("destroyer", 3), alignment, parseInt(id_num[0]), parseInt(id_num[1]))
        numberofShipsAdded++
        shipsize = 2
        txt.innerText = "Place your Patrol Boat."
    //add a boat (size:2)
    } else if (numberofShipsAdded ===4){
        gameboardUser.position(Ship("boat", 2), alignment, parseInt(id_num[0]), parseInt(id_num[1]))
        
        startGame()
    } 
    
    console.log(gameboardUser.x_axis)
    
}

//function for producing a random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//function for displaying text with an interval
function printLetterByLetter(destination, message, speed){
    document.getElementById(destination).innerText = ""
    var i = 0;
    var interval = setInterval(function(){
        //clean the element first
        //start adding
        document.getElementById(destination).innerHTML += message.charAt(i);
        i++;
        if (i > message.length){
            clearInterval(interval);
        }
    }, speed);
}



//function for placing  ships randomly inside the "gameboardComputer" object
function addComputerShips() {

    let alignmentComp = "horizontal"

    //carrier placement
    while (gameboardComputer.placedcarrier === false){
        //getrandomint returns 0, alignment is horizontal
        if (getRandomInt(2) === 0){
            alignmentComp = "horizontal"
        }
        else { //getrandomint returns 1, alignment is vertical
            alignmentComp = "vertical"
        }
        gameboardComputer.position(Ship("carrier", 5), alignmentComp, getRandomInt(10), getRandomInt(10))

        //if the computer manages to place the carrier legally, break the while loop
        if (gameboardComputer.placedcarrier === true){
            break
        }
    }

     //battleship placement
    while (gameboardComputer.placedbattleship === false){
        //getrandomint returns 0, alignment is horizontal
        if (getRandomInt(2) === 0){
            alignmentComp = "horizontal"
        }
        else { //getrandomint returns 1, alignment is vertical
            alignmentComp = "vertical"
        }
        gameboardComputer.position(Ship("battleship", 4), alignmentComp, getRandomInt(10), getRandomInt(10))

        //if the computer manages to place the battleship legally, break the while loop
        if (gameboardComputer.placedbattleship === true){
            break
        }
    }
    

    //destroyer placement
    while (gameboardComputer.placeddestroyer === false){
        //getrandomint returns 0, alignment is horizontal
        if (getRandomInt(2) === 0){
            alignmentComp = "horizontal"
        }
        else { //getrandomint returns 1, alignment is vertical
            alignmentComp = "vertical"
        }
        gameboardComputer.position(Ship("destroyer", 3), alignmentComp, getRandomInt(10), getRandomInt(10))

        //if the computer manages to place the destroyer legally, break the while loop
        if (gameboardComputer.placeddestroyer === true){
            break
        }
    }
    

    //submarine placement
    while (gameboardComputer.placedsubmarine === false){
        //getrandomint returns 0, alignment is horizontal
        if (getRandomInt(2) === 0){
            alignmentComp = "horizontal"
        }
        else { //getrandomint returns 1, alignment is vertical
            alignmentComp = "vertical"
        }
        gameboardComputer.position(Ship("submarine", 3), alignmentComp, getRandomInt(10), getRandomInt(10))

        //if the computer manages to place the submarine legally, break the while loop
        if (gameboardComputer.placedsubmarine === true){
            break
        }
    }
    

    //boat placement
    while (gameboardComputer.placedboat === false){
        //getrandomint returns 0, alignment is horizontal
        if (getRandomInt(2) === 0){
            alignmentComp = "horizontal"
        }
        else { //getrandomint returns 1, alignment is vertical
            alignmentComp = "vertical"
        }
        gameboardComputer.position(Ship("boat", 2), alignmentComp, getRandomInt(10), getRandomInt(10))

        //if the computer manages to place the boat legally, break the while loop
        if (gameboardComputer.placedboat === true){
            break
        }

    } 
    

    console.log(gameboardComputer.x_axis)

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

            //create borders
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
                        hitSound.play();
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
                        }, 1400);
                    }
                    //if the position doesn't have a ship on it, it's a miss, turn it into light blue
                    if(gameboardComputer.x_axis[id_num[0]][id_num[1]] === "miss"){
                        var missSound = new Audio('/sounds/miss.wav');
                        missSound.play();
                        //add a textchange within the function printLetterByLetter()
                        printLetterByLetter("placeships", "Player fired and... missed.", 50)
                        //add an pause so game doesn't proceed until sound ends
                        shotFired = true
                        setTimeout(function(){
                            shotFired = false
                            k_Divs[k].style.backgroundColor = "lightblue"
                            //computer's turn
                            computersTurn()
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


function startGame(){

    gameStarted = true
    //remove the alignment button and "place your ships text"
    let txt = document.querySelector("#placeships")
    let btn = document.querySelector("#alignmentBtn")
    btn.remove()
    txt.style.visibility='hidden'

    //position the current board to the left, create another board of the similar kind to the right
    let computerBoard = document.createElement('div');
    let computerplacementBoard = computerBoardCreation()
    computerBoard.appendChild(computerplacementBoard)
    paletteContainer.appendChild(computerBoard)


}


//function for computer's turn
function computersTurn(){

    //TODO: computer makes a move
    //produce two random numbers from 0-9 for random hitting coordinates
    var a = getRandomInt(10)
    var b = getRandomInt(10)

    //if this tile has already been hit, call the function again for another hit because it's not a legal move
    if (gameboardUser.x_axis[a][b] === "hit" || gameboardUser.x_axis[a][b] === "miss"){
        return computersTurn()
    }
    //hit random coordinates on the gameboardUser object, with the hit function 
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
        hitSound.play();
        //add a textchange within the function printLetterByLetter()
        printLetterByLetter("placeships", "Computer fired and... it's a hit!", 40)
        //add a variable to check if shot fired, don't allow user to fire another shot in the meanwhile
        shotFired = true
        setTimeout(function(){
            shotFired = false
            z.style.backgroundColor = "slategray"
            z.innerText = "X"
        }, 1400);
    }
    //if the position doesn't have a ship on it, it's a miss, turn it into light blue
    if(gameboardUser.x_axis[a][b] === "miss"){
        //add a sound
        var missSound = new Audio('/sounds/miss.wav');
        missSound.play();
        //add a textchange within the function printLetterByLetter()
        printLetterByLetter("placeships", "Computer fired and... missed.", 40)
        //add a variable to check if shot fired, don't allow user to fire another shot in the meanwhile
        shotFired = true
        setTimeout(function(){
            shotFired = false
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

