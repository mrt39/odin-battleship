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

    //gameover condition
    gameboard.gameover = false //will turn true if all ships sink

    //position ships on the gameboard
    //fill the respectable spots on the board with "filled" string
    gameboard.position = function (ship, alignment, startingPositionXaxis, startingPositionYaxis ) {

        //fill the spots on the board depending on the ship size
        for (let i = 0; i < ship.size; i++) {
            if (alignment === "horizontal"){ //alignment can also be vertical
                //if ship size exceeds the board size, do nothing 
                if (startingPositionXaxis+ship.size>9){
                    return                
                }else{ //else, fill the spots on the board with the ship object
                    gameboard.x_axis[startingPositionXaxis+i][startingPositionYaxis] = ship
                }
            }else{
                //if ship size exceeds the board size, do nothing 
                if (startingPositionYaxis+ship.size>9){
                    return 
                }else{ //else, fill the spots on the board with the ship object
                    gameboard.x_axis[startingPositionXaxis][startingPositionYaxis+i] = ship    
                }
            }
        }

    };

// TODO: MAKE SURE THAT IF THE SPOT HAS ALREADY BEEN HIT OR MISS, DO NOTHING 
    //registers players attack on a gameboard tile
    gameboard.receiveAttack = function (xAxis, yAxis ){
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

//export the Gameboard factory function to test environment
module.exports = {Gameboard, Ship};



