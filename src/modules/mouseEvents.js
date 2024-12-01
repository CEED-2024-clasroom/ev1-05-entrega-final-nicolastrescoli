import { createLine, updateLine } from "./lines";
import { getElementCenter } from "../lib/line_position";
import { solveLetter } from "./solver";

function addMouseDown(wheelLetter, selectedLetters) {

    // Añade la clase 'selected' al elemento que fue clickeado
    wheelLetter.classList.add('selected');

    // Agrega la letra al array de letras seleccionadas
    selectedLetters.push(wheelLetter);

    // Crea una nueva linea sin propiedades
    let currentLine = createLine();

    return currentLine;
}

function addMouseMove(selectedLetters, currentLine, event) {

    if (currentLine) {
        const origin = getElementCenter(selectedLetters[selectedLetters.length - 1]);
        const actualXY = [event.clientX, event.clientY];
        updateLine(currentLine, origin, actualXY);
    }
}

function addMouseUp(selectedLetters, game, hiddenLetters) {

    // Borra las lineas
    document.querySelectorAll('.line').forEach(line => line.remove());

    // Almacena en un string las letras seleccionadas en orden.
    let word = '';
    selectedLetters.forEach(letter => word += letter.innerHTML);

    // Elimina la selección sobre las letras y vacia el array de letras seleccionadas
    selectedLetters.forEach(letter => letter.classList.remove('selected'));
    selectedLetters = [];

    // Comprueba si la palabra existe en el juego
    if (game.findWord(word) != null) {

        // obtiene la posisición inicial de la palabra: x, y
        let positions = game.findWord(word);
        let x = positions.origin[0];
        let y = positions.origin[1];
        
        // Descubre la letra
        solveLetter(x, y, game, hiddenLetters);

        // Posicionamiento del resto de las letras en función de si la palabra es horizontal o vertical
        if (game.findWord(word).direction == 'horizontal') {
            for (let i = 1; i < word.length; i++) {
                solveLetter(x+i, y, game, hiddenLetters) // Descubre la letra
            }
        }
        else {
            for (let i = 1; i < word.length; i++) {
                solveLetter(x, y+i, game, hiddenLetters) // Descubre la letra
            }
        }
    }
}

function addMouseEnter(wheelLetter, selectedLetters, currentLine) {

    if (selectedLetters.length > 0 && !wheelLetter.classList.contains('selected')) {

        // Origen de la última letra seleccionada
        const origin = getElementCenter(selectedLetters[selectedLetters.length - 1]);
        const actualXY = getElementCenter(wheelLetter);

        // Fija la línea entre la última letra seleccionada y la nueva
        updateLine(currentLine, origin, [actualXY.x, actualXY.y]);

        // Añade la clase 'selected' a la nueva letra
        wheelLetter.classList.add('selected');
        // Registra la letra seleccionada en la lista
        selectedLetters.push(wheelLetter);

        // Crea una nueva línea
        return currentLine = createLine();
    }
}

export { addMouseDown, addMouseMove, addMouseEnter, addMouseUp }