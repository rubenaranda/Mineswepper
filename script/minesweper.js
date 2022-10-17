// Here are defined all the variables used by the JS 
var mines = 10
var nonMineCounterTag = 10
var cellId = 1
var id = 1
var explosionSimbol = "☀"
var mineDataMap = new Map();
var boardMap = new Map();
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
        console.log(mineDataMap)
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

function createTableHead(){
    var trHead = document.createElement('tr');
    trHead.setAttribute('id',0);
    trHead.setAttribute('data-testid',0)

    var tdHead = document.createElement('td');
    tdHead.classList.add('score');
    tdHead.setAttribute('colspan',80);

    var divCounter = document.createElement('div');
    divCounter.classList.add('counter');
    divCounter.setAttribute('id','mines');
    divCounter.setAttribute('data-testid','mines');
    divCounter.textContent = '0'

    var imgSimley = document.createElement('img');
    imgSimley.setAttribute('id','smiley');
    imgSimley.setAttribute('src','/src/images/smiley.gif');

    var divTimer = document.createElement('div');
    divTimer.setAttribute('id','time');
    divTimer.classList.add('counter');
    divTimer.textContent = '0';

    tdHead.append(divCounter,imgSimley,divTimer);
    trHead.appendChild(tdHead);

    return trHead
}

function createTable(heigh,width){ 
    var body = document.getElementsByTagName('body')[0];
    var table = document.createElement('table');
    table.setAttribute('id','sqTable');
    table.setAttribute('onclick',"clickingButtons(event)")
    table.appendChild(createTableHead()); 
    for (let i = 1; i < heigh; i++){
        var row = createRow(width)
        row.setAttribute("id",i)
        table.appendChild(row)
        id++;
    }
    body.append(table);
    console.log(table)
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
    boardMap.set("sq-"+cellId,"sqCovered")
    cellId++
    return square
}

function clickingButtons(event) {
    sqExposed(event.target.id)
    gameOver(event.target.id)
}

function sqExposed(id) {
    var square = document.getElementById(id);
    square.classList.remove("minetag");
    if (mineDataMap.has(id)) {
        square.innerText = explosionSimbol
        square.classList.add("sqUncovered");
    } else if (boardMap.get(id) == "sqCovered") {
        square.classList.add("sqUncovered");
    }
    boardMap.set(id, "sqUncovered");
    square.setAttribute("disabled",true)
    getAdjecentMines (id)
}

function getRandomMinesPosition() {
   while (mines != 0) {
    var cell = Math.floor(Math.random() * 63 +1);
    if (!mineDataMap.has(cell)){
        mines--;
        mineDataMap.set("sq-"+cell,"sqCovered")
     }
    }
}

function getMinesPosition(mockData) {
    var minesPostion = []
    var tagsPosition = []
    var replacedMockData = mockData.replace('-','')
   for (var i = 0; i < replacedMockData.length; i++) {
    if(replacedMockData[i] == "x") {
        minesPostion.push(i+1)
    } else if (replacedMockData[i] == "!") {
        tagsPosition.push(i+1)
    }
   }
   mines = minesPostion.length
   nonMineCounterTag = mines 
   putMinesInMockData (minesPostion)
   putTagsInMockData (tagsPosition)
}

function putMinesInMockData (minesPostion) {
    var mines
    for (var i = 0; i < minesPostion.length; i++) {
       mines = document.getElementById("sq-"+minesPostion[i])
       mines.setAttribute("mined",true);
    }
}

function putTagsInMockData (tagsPosition) {
    var tags
    for (var i = 0; i < tagsPosition.length; i++) {
       tags = document.getElementById("sq-"+tagsPosition[i])
        tags.classList.add("minetag");
        tags.setAttribute("minedtag", true);
        tags.innerText = charFlag;
        nonMineCounterTag --;
    }
    document.getElementById("mines").innerText = nonMineCounterTag;
}

function gameOver(id) {
    var square = document.getElementById(id); 
    const arrayOfSquares = document.querySelectorAll('td')


    // if (mineDataMap.has(id)) {
        // mineDataMap.forEach(function(value,key){
        //boardMap.set(key, "mined")
    //})}

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
    square.classList.remove("inconclusivetag")
    square.removeAttribute("inconclusivetag")
    square.innerText = '';
  } 
  document.getElementById("mines").innerText = nonMineCounterTag;
}

function getAdjecentMines (id) {
    var numId = parseInt(id.split("-")[1])
    var square = document.getElementById(id);
    const arrayOfTr = document.querySelectorAll("tr");
    }
 startGame(getMockData(mockData));

 function laFUNCION () {
    // Esta funcion es la FUNCION que actualiza el html segun el boardMap

 }
 
 

