const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const mockData = urlParams.get('mockData')

var table = document.getElementById('sqTable')
console.log(table)

function createTable(){
    for (let i = 1; i < 9; i++){
        var row = createRow()
       table.appendChild(row)

    }
}

function createRow(){
    for (let i = 1; i < 9; i++){
        var row = document.createElement("tr")
        row.setAttribute("id",i)
        row.appendChild(createSquares(i))
    }
    return row
}

function createSquares(i){
    var square = document.createElement("td")
    square.setAttribute("id","sq-"+i)
    square.classList.add("sq")
    return square
}