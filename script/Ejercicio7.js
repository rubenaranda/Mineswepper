var numberOfRows = prompt ("How many rows do you want?");

var numberOfColummns = prompt ("How many colummns do you want?")

function createTable (numberOfRows,numberOfColummns) {
    var table_row = document.getElementById("Taula");

    for (i = 0; i < numberOfRows; i++) {
        var tr = document.createElement("tr")

        table_row.appendChild(tr)

        for (j = 0; j < numberOfColummns; j++) {

            var td = document.createElement("td")

            td.textContent = "fila " + i + " columna " + j

            tr.appendChild(td)
        }
        
    }

}

createTable(numberOfRows,numberOfColummns)