document.addEventListener('DOMContentLoaded', () => {
    window.asteroidState = {
        enabled: true
    };

    window.toggleAsteroids = function () {
        window.asteroidState.enabled = !window.asteroidState.enabled;

        const btn = document.getElementById('asteroid-toggle-btn');

        if (btn) {
            btn.innerHTML = window.asteroidState.enabled
                ? '☄️'
                : '🚫☄️';
        }

        console.log(
            window.asteroidState.enabled
                ? '☄️ Eventos espaciais Meteoros ativados'
                : '🚫 Eventos espaciais Meteoros pausados'
        );
    };

    console.log('☄️ Controle de eventos espaciais inicializado!');
});