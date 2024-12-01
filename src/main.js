import './lib/fontawesome.js';
import { Game } from './lib/Game.js';
import GAMES from './lib/games.js';
import { calcCells } from './modules/board.js'
import { drawWheel } from './modules/wheel.js'
import { mixLetters, hintBulb, hintTarget, hammerHelp } from './modules/tools.js';
import { addMouseDown, addMouseMove, addMouseEnter, addMouseUp } from './modules/mouseEvents.js';

// FASE I ======================================================================

const id = 3;
const game = new Game(id);
const selectedGame = GAMES[id];
const wordPositions = game.wordPositions;
const grid = document.getElementById("grid");
const gridWidth = 10;
const gridHeight = 10;

calcCells(selectedGame, wordPositions, grid, gridWidth, gridHeight);

// FASE II =====================================================================

drawWheel(selectedGame);

const wheelLetters = document.querySelectorAll('.wheel-letter');
// Linea actual
var currentLine;
// Lista de letras seleccionadas
var selectedLetters = [];
// Map con las letras que faltan por descubrir a partir de un array (a partir de un HTMLCollection)
const hiddenLetters = new Map();
let gameLetters = Array.from(document.getElementsByClassName('letter'));
for(let i=0; i<gameLetters.length; i++) {
    hiddenLetters.set(i, [gameLetters[i].dataset.x, gameLetters[i].dataset.y])
}

// Asignación de eventos del mouse sobre la rueda de letras
wheelLetters.forEach(wheelLetter => {

    // Añade la clase 'selected' al elemento clickeado y crea una nueva linea sin propiedades
    wheelLetter.addEventListener('mousedown', function (event) {
        // Asegura que no se acarreen letras de una anterior selección
        selectedLetters = [];
        currentLine = addMouseDown(wheelLetter, selectedLetters);
        event.stopPropagation();
    })

    // Asigna las propiedades de posición a la linea siguiento el mouse
    document.addEventListener('mousemove', function (event) {
        addMouseMove(selectedLetters, currentLine, event);
    })

    // FASE III ================================================================

    // Elimina la clase 'selected' de todos los elementos, resetea la lista de letras seleccionadas, borra los divs de las lineas existentes y resetea la linea actual
    document.addEventListener('mouseup', function (event) {
        addMouseUp(selectedLetters, game, hiddenLetters);
        // Elimina la linea actual
        currentLine = null;
        // Vacia el array de letras seleccionadas
        selectedLetters = [];
        event.stopPropagation();
    });

    // Fija una linea al pasar sobre otra letra no seleccionada
    wheelLetter.addEventListener('mouseenter', function (event) {
        currentLine = addMouseEnter(wheelLetter, selectedLetters, currentLine);
        event.stopPropagation();
    });
});

// FASE IV =====================================================================

// Herramienta Shuffler

// Selecciona el botón de mezclado
const suffler = document.getElementsByClassName('tool-icon fa-solid fa-shuffle')[0].parentElement;

// Añade el evento de mezclado
suffler.addEventListener('click', function (event) {
    mixLetters(wheelLetters, event);
});

// Herramienta Hint (bulb)

// Selecciona el botón de pista (bombilla)
const simpleHint = document.getElementsByClassName('tool-icon fa-solid fa-lightbulb')[0].parentElement;

// Añade el evento pista
simpleHint.addEventListener('click', function () {
    hintBulb(hiddenLetters, game);
});

// Herramienta Hint (taget)

// Selecciona el botón de pista (diana)
const multipleHint = document.getElementsByClassName('tool-icon fa-solid fa-expand')[0].parentElement;

// Añade el evento pista múltiple
multipleHint.addEventListener('click', function () {
    hintTarget(hiddenLetters, game);
});

// FASE V ======================================================================

// Herramienta Martillo

// Selecciona el botón de martillo
const hammer = document.getElementsByClassName('tool-icon fa-solid fa-hammer')[0].parentElement;

// Añade el evento de ayuda de martillo
hammer.addEventListener('click', function () {
    hammerHelp(game, hiddenLetters);
});