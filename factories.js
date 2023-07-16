// Factory Function for creating ship objects
const Ship = function (name, size) {

    // create ship object
    var ship = {};

    // parameters as keys to this object  
    ship.name = name;
    ship.size = size;
    ship.hits = 0; //times the ship has been hit
    ship.sunk = false; //check if the ship has been sunk

    // function to hit the ship
    ship.hit = function () {
        //if ship has already been hit in its whole size, do nothing
        if (ship.hits === ship.size){
            return
        //else, increase the hit number
        }else{
            ship.hits++
            //check if ship has been sunk
            ship.hasSunk()
        }    
    };
    //check if the ship has been sunk
    ship.hasSunk = function () {
        //if ship has already been hit in its whole size, turn ship.sunk to true
        if (ship.hits === ship.size){
            ship.sunk = true
        //else, do nothing
        }else{
            return
        }
    };
    return ship;
};



// Factory Function for creating gameboard objects
const Gameboard = function () {

    // create gameboard object
    var gameboard = {};

    gameboard.x_axis = []

    //populate the gameboard (10x10) by filling the arrays
    for (let i = 0; i < 10; i++) {
        gameboard.x_axis[i] = []
        for (let k = 0; k < 10; k++) {
            gameboard.x_axis[i][k] = "blank"
        }
    }

    //create ships 
    gameboard.carrier = Ship("carrier", 5);
    gameboard.battleship = Ship("battleship", 4);
    gameboard.destroyer = Ship("destroyer", 3);
    gameboard.submarine = Ship("submarine", 3);
    gameboard.boat = Ship("boat", 2);

    //whether this board has these ships or not
    gameboard.placedcarrier = false
    gameboard.placedbattleship = false
    gameboard.placeddestroyer = false
    gameboard.placedsubmarine = false
    gameboard.placedboat = false

    //gameover condition
    gameboard.gameover = false //will turn true if all ships sink

    //position ships on the gameboard
    //fill the respectable spots on the board with "filled" string
    gameboard.position = function (ship, alignment, startingPositionXaxis, startingPositionYaxis ) {

        //variable for checking if the chosen areas are already occupied with a ship or are if they're clean
        var clean = true
        
            if (alignment === "vertical"){ //alignment can also be horizontal
                //if ship size exceeds the board size, place it backwards
                if (startingPositionXaxis + ship.size>9){
                    //if any of the tiles are occupied with a ship already, do nothing 
                    //if ship size exceeds the board size, we are looking to place it backwards
                    for (let i = 0; i < ship.size; i++) {
                        if (typeof gameboard.x_axis[startingPositionXaxis-i][startingPositionYaxis] === "object") {
                            //if they're already occupied with an "object", means there's a ship there, so turning clean to false
                            clean = false
                            return
                        }
                    }
                    //only placing a ship in these tiles because these tiles are clean (don't already have ships on them)
                    if (clean ===true){
                        for (let i = 0; i < ship.size; i++) {
                            gameboard.x_axis[startingPositionXaxis-i][startingPositionYaxis] = ship 
                        } 
                    } 

                }else{ 
                    //if any of the tiles are occupied with a ship already, do nothing 
                    for (let i = 0; i < ship.size; i++) {
                        if (typeof gameboard.x_axis[startingPositionXaxis+i][startingPositionYaxis] === "object") {
                            clean = false
                            return
                        }
                    }
                    if (clean ===true){
                        for (let i = 0; i < ship.size; i++) {
                            gameboard.x_axis[startingPositionXaxis+i][startingPositionYaxis] = ship
                    }   }
                }
            }else{
                //if ship size exceeds the board size, we are looking to place it backwards
                if (startingPositionYaxis+ship.size>9){
                    //if any of the tiles are occupied with a ship already, do nothing 
                    for (let i = 0; i < ship.size; i++) {
                        if (typeof gameboard.x_axis[startingPositionXaxis][startingPositionYaxis-i] === "object") {
                            clean = false
                            return
                        }
                    }
                    if (clean ===true){
                        for (let i = 0; i < ship.size; i++) {
                            gameboard.x_axis[startingPositionXaxis][startingPositionYaxis-i] = ship
                        }
                    }
                }else{ 
                    //if any of the tiles are occupied with a ship already, do nothing 
                    for (let i = 0; i < ship.size; i++) {
                        if (typeof gameboard.x_axis[startingPositionXaxis][startingPositionYaxis+i] === "object") {
                            clean = false
                            return
                        }
                    }
                    if (clean ===true){
                        for (let i = 0; i < ship.size; i++) {
                            gameboard.x_axis[startingPositionXaxis][startingPositionYaxis+i] = ship   
                        }
                    } 
                }
            }
        
        if (ship.name === "carrier") {
            gameboard.placedcarrier = true
        } else if (ship.name === "battleship") {
            gameboard.placedbattleship = true
        } else if (ship.name === "destroyer") {
            gameboard.placeddestroyer = true
        } else if (ship.name === "submarine") {
            gameboard.placedsubmarine = true
        } else if (ship.name === "boat") {
            gameboard.placedboat = true
        }
    };

    //registers players attack on a gameboard tile
    gameboard.receiveAttack = function (xAxis, yAxis ){

        //if the tile already has a "hit" or "miss" string on it, that's not a legal move, so do nothing
        if (gameboard.x_axis[xAxis][yAxis] === "hit" || gameboard.x_axis[xAxis][yAxis] === "miss"){
            return
        }
        //if the received attack from the coordinates hits a ship, activate hit function on the ship
        //also remove the ship object from the tile and fill it with "hit" string
        if(gameboard.x_axis[xAxis][yAxis] != "blanks"){
            gameboard[gameboard.x_axis[xAxis][yAxis].name].hit()
            gameboard.x_axis[xAxis][yAxis] = "hit"
        }else{
            gameboard.x_axis[xAxis][yAxis] = "miss"
        }
    }



    //checks if all the ships on the board has been sunk
    gameboard.gameOver = function (){
        if(gameboard.boat.sunk===true&&gameboard.submarine.sunk===true&&gameboard.destroyer.sunk===true&&gameboard.battleship.sunk===true&&gameboard.carrier.sunk===true){
            gameboard.gameover =true
        }
    }


    return gameboard;
};


// Factory Function for creating players for the game
const Player = function (playername) {

    // create ship object
    var player = {};

    // parameters as keys to this object  
    player.name = playername;

    // function for the player move
    player.attack = function(gameboard, xAxis, yAxis) {
        
        gameboard.receiveAttack(xAxis, yAxis) 
        
    };

    return player;

};


export {Gameboard, Ship, Player};
