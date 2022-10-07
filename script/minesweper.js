// Here are defined all the variables used by the JS 
var mines = 10
var nonMineCounterTag = 10
var cellId = 1
var id = 1
var explosionSimbol = "☀"
var table = document.getElementById('sqTable')
var square = document.getElementsByClassName("sq");
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const mockData = urlParams.get('mockData')
 

function getMockData(mockData) {
    return new URLSearchParams(window.location.search).has('mockData')?mockData.split('-'):null;
}

function startGame (getMockData) {
    if (getMockData != null) {
        createMockTable(getMockData)
        
        getMinesPosition(mockData)
        console.log('manolo')
    } else {
        createTable(9,9)
        getRandomMinesPosition()
    }
    
    const arrayOfSquares = document.querySelectorAll('td')
    console.log(arrayOfSquares)
}



function createMockTable(mockData) {
    createTable(mockData.length+1,mockData[0].length+1)
}

// Fuction to create the table of the mineswepper

function createTable(heigh,width){  
    for (let i = 1; i < heigh; i++){
        var row = createRow(width)
        row.setAttribute("id",i)
        table.appendChild(row)
        id++;
    }
}
function createRow(width){
    var row = document.createElement("tr")
    var cellDataTest = 1
    for (let i = 1; i < width; i++){
        row.appendChild(createSquare(cellDataTest))
        cellDataTest++
    }
    return row
}
function createSquare(cellDataTest){
    var square = document.createElement("td")
    var cellTestId = id+","+cellDataTest
    square.setAttribute("id","sq-"+cellId)
    square.setAttribute("data-testid",cellTestId)
    square.setAttribute("colspan","2")
    square.classList.add("sq")
    cellId++
    return square
}



function clickingButtons() {
    
    arrayOfSquares.forEach(td => {
        td.addEventListener('click', () => {
            sqExposed(td.id)
            gameOver(td)
        })
    })
    
}

function sqExposed(id) {
    if (document.getElementById(id).innerText == "☀") {
        document.getElementById(id).classList.add("sqUncovered");
    } else {
        document.getElementById(id).classList.add("sqUncovered");
        document.getElementById(id).innerHTML = ' ';
    }
    document.getElementById(id).setAttribute("disabled",true)
}

function getRandomMinesPosition() {
   while (nonMineCounterTag != 0) {
    var cell = Math.floor(Math.random() * 63 +1);
    console.log(cell)
    if (document.getElementById("sq-"+cell).innerText == explosionSimbol){
        nonMineCounterTag++;
    }else{
        document.getElementById("sq-"+cell).innerText = explosionSimbol
        }    
        nonMineCounterTag--;
    }
}

function getMinesPosition(mockData) {
    var minesPostion = []
    var replacedMockData = mockData.replace('-','')
   for (var i = 0; i < replacedMockData.length; i++) {
    if(replacedMockData[i] == "x") {
        minesPostion.push(i+1)
    }
   }
   putMinesInMockData (minesPostion)
}

function putMinesInMockData (minesPostion) {
    var mecagoentodo
    for (var i = 0; i < minesPostion.length-1; i++) {
        console.log(document.getElementById("sq-"+minesPostion[i]))
       mecagoentodo = document.getElementById("sq-"+minesPostion[i])
       mecagoentodo.innerText = "☀"
    }
}

function gameOver(target) {
    const arrayOfSquares = document.querySelectorAll('td')
    if (target.classList == "sq sqUncovered" && target.innerText == "☀") {
        for (var i = 0; i < arrayOfSquares.length; i++) {
            if (arrayOfSquares[i].innerText == "☀") {
                arrayOfSquares[i].classList.add("sqUncovered")
            }
            arrayOfSquares[i].setAttribute("disabled",true)
        }
        
    }
    
}

function checkClick () {
const arrayOfSquares = document.querySelectorAll('td')
arrayOfSquares.forEach(td => {
    console.log(td.id)
    td.addEventListener('onclick', () => {
        sqExposed(td.id)
    })
})
}


 startGame(getMockData(mockData));
 gameOver();
 
 

