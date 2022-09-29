// Here are defined all the variables used by the JS 

var squares = document.getElementsByClassName("sq");

function clickingButtons(event) {
    sqExposed(event.target.id)
}


function sqExposed(id) {
document.getElementById(id).classList.add("sqUncovered");
}