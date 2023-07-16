import {Gameboard, Ship, Player} from './factories.js';


//creating objects for the game
const gameboardComputer = Gameboard()
const gameboardUser = Gameboard()
const playerUser = Player("user")
const playerComputer = Player("computer")

//TEST FUNCTIONS
//gameboardComputer.position(Ship("submarine", 3), "horizontal", 8, 9)




/* playerUser.attack(gameboardComputer, 2, 3)

console.log(gameboardComputer.x_axis[2][3])
console.log(gameboardComputer.submarine) 

playerUser.attack(gameboardComputer, 3, 3)

console.log(gameboardComputer.x_axis[3][3])
console.log(gameboardComputer.submarine) */  

 

//DOM manipulation

//Variables

var shipsize = 5
var alignment = "horizontal"
let numberofShipsAdded = 0

const palette = document.querySelector(('#placementBoard'))

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
            k_Divs[k].setAttribute('style', 'border: 1px solid black; height: 100% ; background-color: white'); 

            //set an attribute that will help us identify these divs when we select them
            k_Divs[k].setAttribute('data-src', ''); 


                //for each box we add a 'hover' listener
                //how many tiles change is based on the ship size
                k_Divs[k].addEventListener('mouseover', () => {

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


//function for adding ships to the placement board
function addShip (alignment, placement_id) {

    //placement_id is a string like div_no_36. eliminate the first 7 chars to get the number
    let id_num = placement_id.slice(7)
    //if the id number consists of 1 character, add a "0" in front of it
    if (id_num.length === 1){
        id_num = "0"+id_num
    }


/*     console.log(id_num[0])
    console.log(id_num[1]) */
    //gameboardUser.position(Ship("carrier", 5), alignment, id_num[0], id_num[1])    
    //console.log(gameboardUser.x_axis)
    

    //add a carrier (size:5)
    if (numberofShipsAdded ===0){
        
        gameboardUser.position(Ship("carrier", 5), alignment, parseInt(id_num[0]), parseInt(id_num[1]))
        numberofShipsAdded++
        //change the shipsize to 4 (this is for displaying the hover tiles on dom)
        shipsize = 4
    //add a battleship (size:4)
    } else if (numberofShipsAdded ===1){
        gameboardUser.position(Ship("battleship", 4), alignment, parseInt(id_num[0]), parseInt(id_num[1]))
        numberofShipsAdded++
        shipsize = 3
    //add a destroyer (size:3)
    } else if (numberofShipsAdded ===2){
        gameboardUser.position(Ship("submarine", 3), alignment, parseInt(id_num[0]), parseInt(id_num[1]))
        numberofShipsAdded++
        shipsize = 3
    //add a submarine (size:3)
    } else if (numberofShipsAdded ===3){
        gameboardUser.position(Ship("destroyer", 3), alignment, parseInt(id_num[0]), parseInt(id_num[1]))
        numberofShipsAdded++
        shipsize = 2
    //add a boat (size:2)
    } else if (numberofShipsAdded ===4){
        gameboardUser.position(Ship("boat", 2), alignment, parseInt(id_num[0]), parseInt(id_num[1]))
        
        //start the game
    } 
    
    console.log(gameboardUser.x_axis)

}


let finalplacementBoard = placementBoard()
palette.appendChild(finalplacementBoard)


