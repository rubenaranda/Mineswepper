// Here are defined all the variables used by the JS 
var cellId = 1
var table = document.getElementById('sqTable')
var squares = document.getElementsByClassName("sq");
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const mockData = urlParams.get('mockData')


function getMockData(mockData) {
    return new URLSearchParams(window.location.search).has('mockData')?mockData.split('-'):null;
}

function createMockTable() {

}

// Fuction to create the table of the mineswepper

function createTable(){  // This function create the default table of the mineswepper 8x8
    for (let i = 1; i < 9; i++){
        var row = createRow()
        row.setAttribute("id",i)
        table.appendChild(row)
    }
}
function createRow(){
    var row = document.createElement("tr")

    for (let i = 1; i < 9; i++){
        row.appendChild(createSquare())
        
    }
    return row
}
function createSquare(i){
    var square = document.createElement("td")
    square.setAttribute("id","sq-"+cellId)
    square.classList.add("sq")
    cellId++
    return square
}

function clickingButtons(event) {
    sqExposed(event.target.id)
}
function sqExposed(id) {
document.getElementById(id).classList.add("sqUncovered");
}

createTable();