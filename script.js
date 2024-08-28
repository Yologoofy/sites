document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('movingButton');
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    let cheatCode = '';
    let cheatActivated = false;

    // Setze die Canvas-Größe auf die Fenstergröße
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix-Animation
    const cols = canvas.width / 20;
    const ypos = Array(Math.floor(cols)).fill(0);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Hintergrundfarbe
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0'; // Textfarbe
        ctx.font = '15px monospace';

        for (let i = 0; i < ypos.length; i++) {
            const text = String.fromCharCode(Math.random() * 128);
            ctx.fillText(text, i * 20, ypos[i] * 20);
            
            // Resetze die Y-Position, wenn das Ende des Bildschirms erreicht ist
            if (ypos[i] * 20 > canvas.height && Math.random() > 0.975) {
                ypos[i] = 0;
            }
            
            // Bewege die Y-Position nach unten
            ypos[i]++;
        }

        requestAnimationFrame(drawMatrix);
    }

    drawMatrix();

    // Positionierungsfunktion für den Knopf
    function moveButton() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const newTop = Math.random() * (windowHeight - button.offsetHeight);
        const newLeft = Math.random() * (windowWidth - button.offsetWidth);
        button.style.top = `${newTop}px`;
        button.style.left = `${newLeft}px`;
    }

    // Bewege den Knopf beim Überfahren der Maus
    button.addEventListener('mouseover', () => {
        if (!cheatActivated) {
            moveButton();
        }
    });

    // Cheat-Code-Verwaltung
    document.addEventListener('keydown', (event) => {
        cheatCode += event.key;

        // Cheat-Code für den Knopf-Klick
        if (cheatCode.endsWith('unlock')) {
            cheatActivated = true;
            button.removeEventListener('mouseover', moveButton); // Stoppe die Bewegung
            button.style.position = 'relative'; // Ändere Positionseigenschaft
            button.style.top = '50%';
            button.style.left = '50%';
            button.addEventListener('click', () => {
                window.location.href = 'https://www.youtube.com';
            });
            cheatCode = ''; // Setze den Cheat-Code zurück
        }

        // Zurücksetzen des Cheat-Codes, wenn er zu lang wird
        if (cheatCode.length > 10) {
            cheatCode = '';
        }
    });
});
