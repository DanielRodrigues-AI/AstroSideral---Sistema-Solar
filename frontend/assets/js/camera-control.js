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
    
    // Touch support variables
    let isTouching = false;
    let touchStart = { x: 0, y: 0 };
    let touchCameraStart = { x: 0, y: 0 };
    let initialPinchDistance = 0;
    let initialScale = 1;
    let isPinching = false;
    
    // Mobile detection
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const sensitivityMultiplier = isMobile ? 0.7 : 1;
    const zoomMultiplier = isMobile ? 0.5 : 1;
    
    const solarSystem = document.querySelector('.solar-system');
    
    // Set smaller initial scale for mobile
    if (isMobile) {
        camera.scale = 0.7;
    }
    function applyCameraTransform() {
        solarSystem.style.transform = `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})`;
        solarSystem.style.transformOrigin = 'center center';
        const transition = isDragging || isTouching ? 'none' : 'transform 0.1s ease-out';
        solarSystem.style.transition = transition;
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
        const newScale = Math.max(camera.minScale, Math.min(camera.maxScale, camera.scale + delta * zoomMultiplier));
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
    
    // Touch support - one finger pan
    solarSystem.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            if (e.target.classList.contains('planet') || e.target.classList.contains('sun')) {
                return;
            }
            isTouching = true;
            touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            touchCameraStart = { x: camera.x, y: camera.y };
            solarSystem.style.transition = 'none';
        }
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        if (isTouching && e.touches.length === 1) {
            e.preventDefault();
            const deltaX = (e.touches[0].clientX - touchStart.x) * sensitivityMultiplier;
            const deltaY = (e.touches[0].clientY - touchStart.y) * sensitivityMultiplier;
            camera.x = touchCameraStart.x + deltaX;
            camera.y = touchCameraStart.y + deltaY;
            applyCameraTransform();
        }
    }, { passive: false });
    
    document.addEventListener('touchend', (e) => {
        if (isTouching && e.touches.length === 0) {
            isTouching = false;
            solarSystem.style.transition = 'transform 0.1s ease-out';
        }
    });
    
    // Touch support - two finger pinch zoom
    solarSystem.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            isPinching = true;
            initialPinchDistance = getDistance(e.touches[0], e.touches[1]);
            initialScale = camera.scale;
            solarSystem.style.transition = 'none';
        }
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        if (isPinching && e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = getDistance(e.touches[0], e.touches[1]);
            const scaleRatio = currentDistance / initialPinchDistance;
            const newScale = Math.max(
                camera.minScale,
                Math.min(camera.maxScale, initialScale * scaleRatio * zoomMultiplier)
            );
            if (newScale !== camera.scale) {
                camera.scale = newScale;
                applyCameraTransform();
            }
        }
    }, { passive: false });
    
    document.addEventListener('touchend', (e) => {
        if (isPinching && e.touches.length < 2) {
            isPinching = false;
            solarSystem.style.transition = 'transform 0.1s ease-out';
        }
    });
    
    // Helper function to calculate distance between two touches
    function getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    // Double tap for zoom in
    let lastTap = 0;
    solarSystem.addEventListener('touchend', (e) => {
        if (e.target.classList.contains('planet') || e.target.classList.contains('sun')) {
            return;
        }
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            // Double tap detected
            const newScale = Math.min(camera.maxScale, camera.scale * 1.5);
            camera.scale = newScale;
            applyCameraTransform();
            e.preventDefault();
        }
        lastTap = currentTime;
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
