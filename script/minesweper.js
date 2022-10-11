// Here are defined all the variables used by the JS 
var mines = 10
var nonMineCounterTag = 10
var cellId = 1
var id = 1
var explosionSimbol = "☀"
var table = document.getElementById('sqTable')
var square = document.getElementsByClassName("sq");
var charFlag = "!";
var charQuestion = "?";
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
    } else {
        createTable(9,9)
        getRandomMinesPosition()
    }
    
    const arrayOfSquares = document.querySelectorAll('td')
    for (var i = 1; i < arrayOfSquares.length; i++) {
    arrayOfSquares[i].addEventListener("contextmenu",e =>{
        e.preventDefault()
        setTagsInSquares(e)
    })
}
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
    square.classList.add("sqCovered")
    cellId++
    return square
}



function clickingButtons(event) {
    sqExposed(event.target.id)
    gameOver(event.target.id)
    
}

function sqExposed(id) {
    var square = document.getElementById(id);
    square.classList.remove("tagged");
    if (square.hasAttribute("mined")) {
        square.innerText = explosionSimbol
        square.classList.add("sqUncovered");
    } else if (square.className == "sqCovered") {
        square.classList.add("sqUncovered");
        square.innerHTML = ' ';
    }
    square.setAttribute("disabled",true)
}

function getRandomMinesPosition() {
   while (mines != 0) {
    var cell = Math.floor(Math.random() * 63 +1);
    if (document.getElementById("sq-"+cell).getAttribute("mined") == true){
        mines++;
    }else{
        document.getElementById("sq-"+cell).setAttribute("mined",true)
        }    
        mines--;
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
    var mines
    for (var i = 0; i < minesPostion.length-1; i++) {
       mines = document.getElementById("sq-"+minesPostion[i])
       mines.setAttribute("mined",true);
    }
}

function gameOver(id) {
    var square = document.getElementById(id); 
    const arrayOfSquares = document.querySelectorAll('td')
    if (square.className == "sqCovered sqUncovered" && square.innerText == "☀") {
        for (var i = 0; i < arrayOfSquares.length; i++) {
            if (arrayOfSquares[i].hasAttribute("mined")) {
                arrayOfSquares[i].innerText = explosionSimbol
                arrayOfSquares[i].classList.add("sqUncovered")
            }
            arrayOfSquares[i].setAttribute("disabled",true)
        }
        
    } 
}

function setTagsInSquares (event) {
    var square = document.getElementById(event.target.id);
  if (event.button == 2 && !square.hasAttribute("minedtag") && !square.hasAttribute("inconclusivetag")) {
    square.classList.add("minetag");
    square.setAttribute("minedtag", true);
    square.innerText = charFlag;
    nonMineCounterTag --;
  } else if (event.button == 2 && square.hasAttribute("minedtag")) {
    square.classList.remove ("minetag")
    square.classList.add ("inconclusivetag")
    square.removeAttribute("minedtag")
    square.setAttribute("inconclusivetag",true)
    square.innerText = charQuestion;
    nonMineCounterTag ++;
  } else if (event.button == 2 && square.hasAttribute("inconclusivetag")){
    console.log("hola")
    square.classList.remove("inconclusivetag")
    square.removeAttribute("inconclusivetag")
    square.innerText = '';
  } 
  document.getElementById("mines").innerText = nonMineCounterTag;
}
 startGame(getMockData(mockData));

 
 
 

