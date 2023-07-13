// Factory Function for creating ship objects
const Ship = function (name, size) {

    // creating ship object
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

//export the ship factory function to test environment
module.exports = Ship;

