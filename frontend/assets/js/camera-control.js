//camera-controls.js
document.addEventListener('DOMContentLoaded', () => {
    const camera = {
        x: 0,
        y: 0,
        scale: 1,
        minScale: 0.3,
        maxScale: 2.5
    };
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let cameraStart = { x: 0, y: 0 };
    const solarSystem = document.querySelector('.solar-system');
    function applyCameraTransform() {
        solarSystem.style.transform = `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})`;
        solarSystem.style.transformOrigin = 'center center';
        solarSystem.style.transition = isDragging ? 'none' : 'transform 0.1s ease-out';
    }
    applyCameraTransform();
    solarSystem.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('planet') || e.target.classList.contains('sun')) {
            return;
        }
        isDragging = true;
        dragStart = { x: e.clientX, y: e.clientY };
        cameraStart = { x: camera.x, y: camera.y };
        solarSystem.style.cursor = 'grabbing';
        solarSystem.style.transition = 'none';
    });
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        camera.x = cameraStart.x + deltaX;
        camera.y = cameraStart.y + deltaY;
        applyCameraTransform();
    });
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            solarSystem.style.cursor = 'grab';
            solarSystem.style.transition = 'transform 0.1s ease-out';
        }
    });
    document.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            return;
        }
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newScale = Math.max(camera.minScale, Math.min(camera.maxScale, camera.scale + delta));
        if (newScale !== camera.scale) {
            camera.scale = newScale;
            applyCameraTransform();
        }
    }, { passive: false });
    solarSystem.style.cursor = 'grab';
    solarSystem.addEventListener('dblclick', (e) => {
        if (e.target.classList.contains('planet') || e.target.classList.contains('sun')) {
            return;
        }
        camera.x = 0;
        camera.y = 0;
        camera.scale = 1;
        applyCameraTransform();
        console.log('📷 Câmera resetada para posição inicial');
    });
    window.cameraState = camera;
    window.resetCamera = function() {
        camera.x = 0;
        camera.y = 0;
        camera.scale = 1;
        applyCameraTransform();
    };
    window.setCameraScale = function(scale) {
        camera.scale = Math.max(camera.minScale, Math.min(camera.maxScale, scale));
        applyCameraTransform();
    };
    window.setCameraPosition = function(x, y) {
        camera.x = x;
        camera.y = y;
        applyCameraTransform();
    };
    console.log('📷 Sistema de câmera interativa inicializado!');
    console.log('💡 Arraste para mover (pan), scroll para zoom');
    console.log('💡 Duplo clique para resetar câmera');
    console.log('💡 Ctrl+scroll mantém zoom atual');
});
