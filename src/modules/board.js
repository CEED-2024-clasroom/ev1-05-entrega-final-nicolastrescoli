import '../lib/fontawesome.js';
import center from '../lib/center.js';

// FASE I del Proyecto =====================================================

//calcula las medidas máximas del tablero.
function calcBoard(game, wordPositions) {

    let maxRow = 0;
    let maxColumn = 0;
    let lastRow = 0;
    let lastColumn = 0;

    for (let j = 0; j < game.words.size; j++) {

        if (wordPositions[j].direction === 'vertical') {
            lastRow = wordPositions[j].origin[0] + wordPositions[j].length-1;
            lastColumn = wordPositions[j].origin[1];
        }
        else {
            lastColumn = wordPositions[j].origin[1] + wordPositions[j].length-1;
            lastRow = wordPositions[j].origin[0];
        }

        maxRow = Math.max(maxRow, lastRow);
        maxColumn = Math.max(maxColumn, lastColumn);
    }

    return [maxRow, maxColumn];
}

// Crea el div para la celda y le asigna la classe letter y la posición en grid
function createCell(grid, cellRow, cellColumn, cellCenter) {

    // Comprueba si ya existe la celda
    if (!document.querySelector('[data-x="' + cellColumn + '"][data-y="' + cellRow + '"]')) {

        let cell = document.createElement("div");
        cell.setAttribute("data-x", cellColumn); //referencia al colocar las letras
        cell.setAttribute("data-y", cellRow); //referencia al colocar las letras
        cell.classList.add("letter");

        let posX = cellRow + cellCenter[0]+1;
        let posY = cellColumn + cellCenter[1]+1;
        cell.setAttribute("style", "grid-area: " + (posX+1) + " / " + (posY+1) + ";");
        grid.appendChild(cell);
    }
}

// Calcula la posición de las celdas
function calcCells(game, wordPositions, grid, gridWidth, gridHeight) {

    var cellRow;
    var cellColumn;

    grid.innerHTML = ""; //Elimina las celdas por defecto

    const board = calcBoard(game, wordPositions);
    const cellCenter = center(board[1], board[0], gridWidth, gridHeight);

    for (let j = 0; j < game.words.size; j++) {

        if (wordPositions[j].direction === "vertical") {
            cellColumn = wordPositions[j].origin[0];

            for (let i = 0; i < wordPositions[j].length; i++) {
                cellRow = wordPositions[j].origin[1] + i;
                createCell(grid, cellRow, cellColumn, cellCenter);
            }
        }
        else {
            cellRow = wordPositions[j].origin[1];

            for (let i = 0; i < wordPositions[j].length; i++) {
                cellColumn = wordPositions[j].origin[0] + i;
                createCell(grid, cellRow, cellColumn, cellCenter);
            }
        }
    };
};

export {calcCells};
