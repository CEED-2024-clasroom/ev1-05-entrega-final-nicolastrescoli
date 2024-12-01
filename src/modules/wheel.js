import '../lib/fontawesome.js';
import calculateLetterPositions from '../lib/letter_positions.js';

// Dubuja las letras sobre la rueda
function drawWheel(selectedGame) {

    var position = calculateLetterPositions(selectedGame.letters.length);
    const wheel = document.getElementById("wheel");
    wheel.innerHTML = ""; //Elimina las letras por defecto

    for (let i = 0; i < selectedGame.letters.length; i++) {

        let letter = document.createElement("div");
        letter.classList.add("wheel-letter");
        letter.setAttribute("style", "left: " + position[i].left + "; top: " + position[i].top + ";");
        letter.innerHTML = selectedGame.letters[i];
        wheel.appendChild(letter);
    }
}

export {drawWheel};