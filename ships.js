import {gameboardUser, gameboardComputer} from './gameboards.js';
import {computerBoardCreation, placementBoard}  from './gameboards.js';
import {Gameboard, Ship, Player} from './factories.js';
import {computersTurn, startGame} from './game.js';

let numberofShipsAdded = 0
var shipsize = 5


//function for adding ships to the placement board by user click
function addShip (alignment, placement_id) {

    //change the text on top after each ship is added
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
        
        if (getRandomInt(2) === 0){
            alignmentComp = "horizontal"
        }
        else { 
            alignmentComp = "vertical"
        }
        gameboardComputer.position(Ship("battleship", 4), alignmentComp, getRandomInt(10), getRandomInt(10))

        if (gameboardComputer.placedbattleship === true){
            break
        }
    }
    

    //destroyer placement
    while (gameboardComputer.placeddestroyer === false){
        
        if (getRandomInt(2) === 0){
            alignmentComp = "horizontal"
        }
        else { 
            alignmentComp = "vertical"
        }
        gameboardComputer.position(Ship("destroyer", 3), alignmentComp, getRandomInt(10), getRandomInt(10))

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

        if (gameboardComputer.placedboat === true){
            break
        }

    } 
    

    console.log(gameboardComputer.x_axis)

}   

export {addComputerShips, addShip};