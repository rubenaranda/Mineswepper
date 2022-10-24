// Here are defined all the variables used by the JS 
var mines = 10
var nonMineCounterTag = 0
var explosionSimbol = "☀"
var mapData;
var isGameOver = false;
var charFlag = "!";
var charQuestion = "?";
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const mockData = urlParams.get('mockData')


function getMockData(mockData) {
   var splitedMockData =  new URLSearchParams(window.location.search).has('mockData') ? mockData.split('-') : null;
   if (splitedMockData != null) {
       mapData = createMockDataBoard(splitedMockData)
   } else {
        mapData = createRandomDataBoard();
   }
}

function startGame() {
    getMockData(mockData)
    setSquareValue();

    createTable();
        // createTable(numberOfColumns, numberOfRows)
        // getRandomMinesPosition()

    const arrayOfSquares = document.querySelectorAll('td')
    for (var i = 1; i < arrayOfSquares.length; i++) {
        arrayOfSquares[i].addEventListener("contextmenu", e => {
            e.preventDefault()
            setTagsInSquares(e.target.id)
            boardMapUpdate()
        })
    }
}



function createMockTable(mockData) {
    createTable(mockData.length + 1, mockData[0].length + 1)
}

// Fuction to create the table of the mineswepper

function createTableHead() {
    var trHead = document.createElement('tr');
    trHead.setAttribute('id', 0);
    trHead.setAttribute('data-testid', 0)

    var tdHead = document.createElement('td');
    tdHead.classList.add('score');
    tdHead.setAttribute('colspan', 80);

    var divCounter = document.createElement('div');
    divCounter.classList.add('counter');
    divCounter.setAttribute('id', 'mines');
    divCounter.setAttribute('data-testid', 'mines');
    divCounter.textContent = nonMineCounterTag

    var imgSimley = document.createElement('img');
    imgSimley.setAttribute('id', 'smiley');
    imgSimley.setAttribute('src', '/src/images/smiley.gif');

    var divTimer = document.createElement('div');
    divTimer.setAttribute('id', 'time');
    divTimer.classList.add('counter');
    divTimer.textContent = '0';

    tdHead.append(divCounter, imgSimley, divTimer);
    trHead.appendChild(tdHead);

    return trHead
}

function createTable() {
    let height = mapData.length;
    let width;
    var body = document.body;
    var table = document.createElement('table');
    table.setAttribute('id', 'sqTable');
    table.setAttribute('onclick', "clickingButtons(event)")
    table.appendChild(createTableHead());
    for (let i = 0; i < height; i++) {
        width = mapData[i].length
        var row = createRow(width,i+1)
        row.setAttribute("id", i+1)
        table.appendChild(row)
    }
    body.append(table);
}
function createRow(width,i) {
    var row = document.createElement("tr")
    for (let j = 0; j < width; j++) {
        row.appendChild(createSquare(i,j+1))
    }
    return row
}
function createDataSquare(cellId,isMined,value = null) {
   /* var square = document.createElement("td")
    var cellTestId = id + "," + cellDataTest
    square.setAttribute("id", "sq-" + cellId)
    square.setAttribute("data-testid", cellTestId)
    square.setAttribute("colspan", "2")
    square.classList.add("sqCovered");
    boardMap.set("sq-" + cellId, ["sqCovered"])
    cellId++
    return square */
    let cell = {
        id: cellId,
        value: value,
        isMined: isMined,
        isCovered: true,
        isMineTag: false,
        isInconclusiveTag: false,
    }
    return cell;
}
function createSquare(i,j) {
    var square = document.createElement("td")
    var cellId = i + "," + j
    square.setAttribute("id",cellId)
    square.setAttribute("data-testid", cellId)
    square.setAttribute("colspan", "2")
    square.classList.add("sqCovered");
    return square
}
function createMockDataBoard (splitedMockData){
    let array = [];
    let row;
    for (let i = 1; i <= splitedMockData.length; i++) {
        row = [];
        for (let j = 1; j <= splitedMockData[i-1].length; j++) {
            if (splitedMockData[i-1][j-1] == "x"){
                row.push(createDataSquare(i+","+j,true,explosionSimbol));
            } else {
                row.push(createDataSquare(i+","+j,false))
            }
        }
        array.push(row);
    }
    console.log(array);
    return array;
}

function createRandomDataBoard (){
    let array = [];
    let row;
    let height = 8;
    let width = 8;
    for (let i = 1; i <= height; i++) {
        row = [];
        for (let j = 1; j <= width; j++) {
                row.push(createDataSquare(i+","+j,false))
            }
        array.push(row);
    }
    getRandomMinesPosition(array)
    return array;
}

function boardMapUpdate() {
    // boardMap.forEach(function (value, key) {
    //     if (value.includes("sqUncovered") && value.includes("AdjacentMine")){
    //         document.getElementById(key).classList.add("sqUncovered")
    //         var number = boardMap.get(key)[boardMap.get(key).length-1]
    //         document.getElementById(key).innerText = number
    //     } else if (value.includes("explosion")){
    //         document.getElementById(key).innerHTML = explosionSimbol
    //         document.getElementById(key).classList.add("sqUncovered")
    //     }
    // })
    let id 
    let square
    for (let i = 0; i < mapData.length; i++) {
        for (let j = 0; j < mapData[i].length; j++) {
            id = (i+1)+","+(j+1)
            square = document.getElementById(id)
            if (mapData[i][j].isMineTag){
                square.classList.add("minetag");
                square.innerText = charFlag;
            } else if (mapData[i][j].isInconclusiveTag){
                square.classList.remove("minetag");
                square.classList.add("inconclusivetag");
                square.innerText = charQuestion;
            } else if (!mapData[i][j].isInconclusive && !mapData[i][j].isMineTag) {
                square.classList.remove("inconclusivetag");
                square.innerText = ""
            }
            if(!mapData[i][j].isCovered){
                square.classList.add("sqUncovered");
                square.innerText = mapData[i][j].value
            }
        }
    }
}

function clickingButtons(event) {
    sqExposed(event.target.id)
    boardMapUpdate()
}

function sqExposed(id) {
    var splitedId = id.split(",")
    let row = splitedId[0]-1;
    let column = splitedId[1]-1;
    console.log(mapData[row])
    console.log(mapData[row][column])
    if (mapData[row][column].isMined){
        gameOver()
    } else{
        mapData[row][column].isCovered = false;
    }
}

function getRandomMinesPosition(array) {
    while (mines != 0) {
        var row = Math.floor(Math.random() * 7 + 1);
        var column = Math.floor(Math.random() * 7 + 1);
        if (!array[row][column].isMined) {
            mines--;
            array[row][column].isMined = true;
            array[row][column].value = explosionSimbol
        }
    }
}

function gameOver() {
      for (let i = 0; i < mapData.length; i++) {
        for (let j = 0; j < mapData[i].length; j++) {
            if (mapData[i][j].isMined) {
            mapData[i][j].isCovered = false;
        }
      }
    }
    isGameOver = true;
}

function setTagsInSquares(id) {
    let splitedId = id.split(',');
    let row = splitedId[0]-1
    let column= splitedId[1]-1;
    let square = mapData[row][column]
    if (square.isMineTag) {
        square.isMineTag = false;
        square.isInconclusiveTag = true;
        nonMineCounterTag ++;
    } else if (square.isInconclusiveTag) {
        square.isInconclusiveTag = false;
    } else {
        square.isMineTag = true;
        nonMineCounterTag --;
    }
    document.getElementById("mines").innerText = nonMineCounterTag;
}

function getAdjecentMines(row, column) {
    let counter = 0;
    for (let i = row-1; i <= row+1; i++) {
        for (let j = column-1; j <= column+1; j++) {
            if(isValidPosition(i,j)) {
                if (mapData[i][j].isMined) {
                    counter ++;
                }
            }
        }
    }
    return counter == 0? "":counter;
}

function setSquareValue() {
    for (let i = 0; i < mapData.length; i++) {
        for (let j = 0; j < mapData[i].length; j++) {
            if (!mapData[i][j].isMined){
                mapData[i][j].value = getAdjecentMines(i,j);
            } else {
                nonMineCounterTag++;
            }
        }
    }
}

function isValidPosition (row,column) {
    return row >= 0 && row < mapData.length && column >= 0 && column < mapData[row].length
}
startGame();






