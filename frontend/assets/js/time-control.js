//time-control.js
document.addEventListener('DOMContentLoaded', () => {
    window.universeState = {
        timeScale: 1,
        isPaused: false
    };
    
    // Mobile detection
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const buttonSize = isMobile ? 48 : 45;
    const fontSize = isMobile ? 22 : 20;
    const padding = isMobile ? '20px 30px' : '15px 25px';
    const gap = isMobile ? 20 : 15;
    
    function createTimeControlUI() {
        const controlPanel = document.createElement('div');
        controlPanel.id = 'time-control';
        controlPanel.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 15, 35, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 50px;
            padding: ${padding};
            display: flex;
            align-items: center;
            gap: ${gap}px;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        `;
        const playPauseBtn = document.createElement('button');
        playPauseBtn.id = 'play-pause-btn';
        playPauseBtn.innerHTML = '⏸️';
        playPauseBtn.style.cssText = `
            width: ${buttonSize}px;
            height: ${buttonSize}px;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: ${fontSize}px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        `;
        playPauseBtn.addEventListener('mouseenter', () => {
            playPauseBtn.style.background = 'rgba(255, 255, 255, 0.2)';
            playPauseBtn.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        });
        playPauseBtn.addEventListener('mouseleave', () => {
            playPauseBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            playPauseBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });
        playPauseBtn.addEventListener('click', togglePlayPause);
        const speedContainer = document.createElement('div');
        speedContainer.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        const speeds = [0.5, 1, 2, 10];
        const speedLabels = ['0.5x', '1x', '2x', '10x'];
        const speedPadding = isMobile ? '12px 20px' : '8px 16px';
        const speedFontSize = isMobile ? 16 : 14;
        speeds.forEach((speed, index) => {
            const speedBtn = document.createElement('button');
            speedBtn.textContent = speedLabels[index];
            speedBtn.dataset.speed = speed;
            speedBtn.style.cssText = `
                padding: ${speedPadding};
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: rgba(255, 255, 255, 0.05);
                color: rgba(255, 255, 255, 0.7);
                font-size: ${speedFontSize}px;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            if (speed === 1) {
                speedBtn.style.background = 'rgba(107, 147, 214, 0.3)';
                speedBtn.style.borderColor = 'rgba(107, 147, 214, 0.5)';
                speedBtn.style.color = 'white';
            }
            speedBtn.addEventListener('mouseenter', () => {
                speedBtn.style.background = 'rgba(255, 255, 255, 0.15)';
                speedBtn.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            });
            speedBtn.addEventListener('mouseleave', () => {
                if (window.universeState.timeScale === speed) {
                    speedBtn.style.background = 'rgba(107, 147, 214, 0.3)';
                    speedBtn.style.borderColor = 'rgba(107, 147, 214, 0.5)';
                    speedBtn.style.color = 'white';
                } else {
                    speedBtn.style.background = 'rgba(255, 255, 255, 0.05)';
                    speedBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    speedBtn.style.color = 'rgba(255, 255, 255, 0.7)';
                }
            });
            speedBtn.addEventListener('click', () => setSpeed(speed));
            speedContainer.appendChild(speedBtn);
        });
        const asteroidBtn = document.createElement('button');

asteroidBtn.id = 'asteroid-toggle-btn';

asteroidBtn.innerHTML = '☄️';

asteroidBtn.style.cssText = `
    width: ${buttonSize}px;
    height: ${buttonSize}px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.1);
    color: white;
    font-size: ${fontSize}px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
`;

asteroidBtn.addEventListener('mouseenter', () => {
    asteroidBtn.style.background = 'rgba(255,255,255,0.2)';
    asteroidBtn.style.borderColor = 'rgba(255,255,255,0.5)';
});

asteroidBtn.addEventListener('mouseleave', () => {
    asteroidBtn.style.background = 'rgba(255,255,255,0.1)';
    asteroidBtn.style.borderColor = 'rgba(255,255,255,0.3)';
});

asteroidBtn.addEventListener('click', () => {
    window.toggleAsteroids();
});
        controlPanel.appendChild(asteroidBtn);
        controlPanel.appendChild(playPauseBtn);
        controlPanel.appendChild(speedContainer);
        document.body.appendChild(controlPanel);
    }
    function togglePlayPause() {
        window.universeState.isPaused = !window.universeState.isPaused;
        const btn = document.getElementById('play-pause-btn');
        if (window.universeState.isPaused) {
            btn.innerHTML = '▶️';
        } else {
            btn.innerHTML = '⏸️';
        }
    }
    function setSpeed(speed) {
        window.universeState.timeScale = speed;
        const speedBtns = document.querySelectorAll('[data-speed]');
        speedBtns.forEach(btn => {
            const btnSpeed = parseFloat(btn.dataset.speed);
            if (btnSpeed === speed) {
                btn.style.background = 'rgba(107, 147, 214, 0.3)';
                btn.style.borderColor = 'rgba(107, 147, 214, 0.5)';
                btn.style.color = 'white';
            } else {
                btn.style.background = 'rgba(255, 255, 255, 0.05)';
                btn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                btn.style.color = 'rgba(255, 255, 255, 0.7)';
            }
        });
    }
    createTimeControlUI();
    console.log('⏱️ Controle de tempo do universo inicializado!');
    console.log('💡 Use os controles para pausar ou alterar a velocidade do tempo');
});
