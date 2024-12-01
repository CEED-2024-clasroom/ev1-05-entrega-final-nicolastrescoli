import { lengthAndAngle } from '../lib/line_position.js';

// Crea una linea sin propiedades de posición
function createLine() {

    const line = document.createElement("div");
    line.classList.add("line");
    document.body.appendChild(line);
    return line;
};

// Actualiza la posición de la línea desde el un punto marcado como origen hasta otro como actualXY
function updateLine(currentLine, origin, actualXY) {

    const lengthAngle = lengthAndAngle([origin.x, origin.y], actualXY);

    currentLine.setAttribute("style", "left: " + origin.x + "px; top: " + origin.y + "px; width: " + lengthAngle.length + "px; transform: rotate(" + lengthAngle.angle + "deg)");
}


export {createLine, updateLine}