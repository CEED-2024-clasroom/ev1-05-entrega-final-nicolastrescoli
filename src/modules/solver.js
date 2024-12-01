// Elimina un elemento del Map (por valor)
function eliminarPorValor(mapName, x, y) {
    for (let [clave, valor] of mapName) {
        if (valor[0] == x && valor[1] == y) {
            mapName.delete(clave);
            break;
        }
    }
}

// Resuelve la posición de una letra
function solveLetter(x, y, game, hiddenLetters) {

    // Selecciona la casilla con la misma posición x, y
    const cell = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');

    // Dibuja la letra dentro de la casilla si está vacía
    if (cell.innerHTML == '') {
        cell.innerHTML = game.letterAt(x, y);
        // Eliminación del Map sabiendo la posición
        eliminarPorValor(hiddenLetters, x, y);
        return true;
    }
}

export {solveLetter, eliminarPorValor};
