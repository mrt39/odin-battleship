/* let allFunctions = require('./factories');
const Ship = allFunctions.Ship;
const Gameboard = allFunctions.Gameboard;
const Player = allFunctions.Player;



//creating objects for the game
const gameboardComputer = Gameboard()
const gameboardUser = Gameboard()
const playerUser = Player("user")
const playerComputer = Player("computer")

gameboardComputer.position(Ship("submarine", 3), "horizontal", 2, 3)


playerUser.attack(gameboardComputer, 2, 3)

console.log(gameboardComputer.x_axis[2][3])
console.log(gameboardComputer.submarine) 

playerUser.attack(gameboardComputer, 3, 3)

console.log(gameboardComputer.x_axis[3][3])
console.log(gameboardComputer.submarine) 

 */

//DOM manipulation

let shipsize = 5
let alignment = "xd"


function placementBoard () {
    for (let i = 0; i < 10; i++) {

        const i_Divs = []; 
        const k_Divs = [];

        i_Divs[i] = document.createElement('div');
        //set the id of the div to the number of the div
        i_Divs[i].setAttribute('id', `column_no_${i}`); 


        //set style 
        
        i_Divs[i].setAttribute('style', 'display: flex; flex-direction: column; align-content: stretch; width: 100%; ');    
    
        const palette = document.querySelector(('#wholePalette'))

        palette.appendChild(i_Divs[i])


        for (let k = 0; k < 10; k++) {

            k_Divs[k] = document.createElement('div');
            //set the id of the div to the number of the div
            k_Divs[k].setAttribute('id', `div_no_${k*10+i}`); 

            //create borders
            k_Divs[k].setAttribute('style', 'border: 1px solid black; height: 100% ; background-color: white'); 

            //set an attribute that will help us identify these divs when we select them
            k_Divs[k].setAttribute('data-src', ''); 

            //if the alignment is vertical, this is how we paint the boxes on hover
            if (alignment === "vertical"){
                //for each box we add a 'hover' listener
                //how many tiles change is based on the ship size
                k_Divs[k].addEventListener('mouseover', () => {
                    for (let j = 0; j < shipsize; j++) {
                        //if it is exceeding the board size, turn it backwards 
                        if (k+shipsize > 9){
                            k_Divs[k-j].style.backgroundColor = "lightgreen";
                        }else{
                            k_Divs[k+j].style.backgroundColor = "lightgreen";
                        }
                    }

                });

                //mouseout listener for cleaning the tiles once hovering is over
                k_Divs[k].addEventListener('mouseout', () => {
                    for (let j = 0; j < shipsize; j++) {
                        //if it is exceeding the board size, turn it backwards 
                        if (k+shipsize > 9){
                            k_Divs[k-j].style.backgroundColor = "white";
                        }else{
                            k_Divs[k+j].style.backgroundColor = "white";
                        }
                    }
                });

            } else{ //if the alignment is horizontal, we paint the tiles horizontally

                // for each box we add a 'hover' listener
                //how many tiles change is based on the ship size
                k_Divs[k].addEventListener('mouseover', () => {

                    //we don't want mouseout to white the tiles that are gray (have a ship placed)
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
                            if (z.style.backgroundColor === "slategray"){
                                return
                            }
                            z.style.backgroundColor = "lightgreen";
                        } else{
                            let z = document.querySelector("#div_no_"+(parseInt(idNo)+j))
                            if (z.style.backgroundColor === "slategray"){
                                return
                            }
                            z.style.backgroundColor = "lightgreen";
                        }
                    }

                });

                //mouseout listener for cleaning the tiles once hovering is over
                k_Divs[k].addEventListener('mouseout', () => {

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
                            if (z.style.backgroundColor === "slategray"){
                                return
                            }
                            z.style.backgroundColor = "white";
                        } else{
                            let z = document.querySelector("#div_no_"+(parseInt(idNo)+j))
                            if (z.style.backgroundColor === "slategray"){
                                return
                            }
                            z.style.backgroundColor = "white";
                        }
                }
                });

                //mouseout listener for cleaning the tiles once hovering is over
                k_Divs[k].addEventListener('click', () => {
                    for (let j = 0; j < shipsize; j++) {
                        k_Divs[k].style.backgroundColor = "slategray";
                        //get the last 2 characters of the id of the hovered tile
                        //id is something like div_no_24 so we are getting the number at the end
                        let idNo = k_Divs[k].id.slice(7)

                        //we get the last digit of the id of the hovered tile and ship size to it
                        //if it is exceeding the board size, turn it backwards 
                        if (parseInt(k_Divs[k].id.at(-1))+shipsize > 9){
                            let z = document.querySelector("#div_no_"+(parseInt(idNo)-j))
                            z.style.backgroundColor = "slategray";
                        } else{
                            let z = document.querySelector("#div_no_"+(parseInt(idNo)+j))
                            z.style.backgroundColor = "slategray";
                        }
                }
                });


            }
            

            i_Divs[i].appendChild(k_Divs[k]); 

        }    
    }  

}


placementBoard ()




