import { solveLetter } from "./solver";

// Mix Letters =================================================================

function mixLetters(wheelLetters, event) {

    // Creación de un array con el style (posición) de las letras
    let styles = [];
    Array.from(wheelLetters).forEach(wheelLetter => {
        styles.push(wheelLetter.getAttribute('style'));
    });

    // Mezcla del array
    function mezclarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const mezclado = mezclarArray(styles);
    
    // Otra opción
    // return styles.sort(() => Math.random() - 0.5);

    // Asignación del nuevo style de posición a cada letra
    let i = 0;
    wheelLetters.forEach(wheelLetter => {
        wheelLetter.setAttribute('style', mezclado[i++]);
    });

    event.stopPropagation();
}

// Hint Bulb ===================================================================

function hintBulb(hiddenLetters, game) {

    // Comprueba si quedan letras por descubrir
    if (hiddenLetters.size == 0) return;

    // Clave aleatoria del Map
    const random = Array.from(hiddenLetters.keys())[Math.floor(Math.random() * hiddenLetters.size)];

    // Descubre la letra
    solveLetter(hiddenLetters.get(random)[0], hiddenLetters.get(random)[1], game, hiddenLetters)
}

// Hint Target =================================================================

function hintTarget(hiddenLetters, game) {

    // Llama 5 veces a la función hintBulb para descubrir hasta 5 letras
    for (let i = 0; i < 5; i++) {
        hintBulb(hiddenLetters, game);
    }
}

// Hammer Help =================================================================

function hammerHelp(game, hiddenLetters) {

    const black = document.getElementById('black');
    const letters = Array.from(document.getElementsByClassName('letter'));

    // Finalizar la ayuda
    function finalizarAyuda() {
        // Quitar la clase .on-top de todas las letras
        letters.forEach(letter => {
            letter.setAttribute('class', 'letter');
        });

        // Ocultar el div #black y quitar su evento
        black.setAttribute('class', 'hidden');
        black.removeEventListener('click', finalizarAyuda);
    }

    // Función manejadora del evento en cada letra
    function handleClick(event) {

        // Obtiene las propiedades data-x, data-y de la letra
        const letter = event.currentTarget;
        const x = letter.dataset.x;
        const y = letter.dataset.y;

        // True si Resuelve la letra
        let success = solveLetter(x, y, game, hiddenLetters)

        if (success == true) {
            letter.removeEventListener('click', handleClick);
            finalizarAyuda();
        } // Si ya había una letra resuelta, no hace nada
    }

    // Quita la clase hidden al div #black
    black.setAttribute('class', '');

    // Agregar evento finalizar ayuda en el div #black
    black.addEventListener('click', finalizarAyuda);

    // Añade la clase .on-top a todas las letras
    letters.forEach(letter => {
        letter.setAttribute('class', 'letter on-top');
    });

    // Agregar evento solver a las letras
    letters.forEach(letter => {
        letter.addEventListener('click', handleClick);
    });

}

export { mixLetters, hintBulb, hintTarget, hammerHelp };