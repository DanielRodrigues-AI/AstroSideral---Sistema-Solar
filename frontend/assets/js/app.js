//app.js
document.addEventListener("DOMContentLoaded", () => {
  const planets = document.querySelectorAll(".planet");
  const infoPanel = document.getElementById("infoPanel");
  const closeBtn = document.getElementById("closePanel");
  const planetName = document.getElementById("planetName");
  const planetType = document.getElementById("planetType");
  const planetSize = document.getElementById("planetSize");
  const planetDistance = document.getElementById("planetDistance");
  const planetInfo = document.getElementById("planetInfo");
  const planetVisual = document.getElementById("planetVisual");
  const solarSystem = document.querySelector(".solar-system");
  let selectedPlanet = null;
  let planetArrow = null;
  const fallbackPlanets = {
    sun: {
      name: "Sol",
      type: "estrela",
      size: 109,
      distance: 0,
      info: "Estrela central do Sistema Solar, composta principalmente de hidrogênio e hélio. Sua temperatura na superfície é de aproximadamente 5.500°C.",
      color: "#ffd700",
      orbitSpeed: 0,
      orbitRadius: 0,
    },
    mercury: {
      name: "Mercúrio",
      type: "rochoso",
      size: 0.38,
      distance: 57.9,
      info: "Planeta mais próximo do Sol, com temperaturas extremas variando de -180°C a 430°C.",
      color: "#b5b5b5",
      orbitSpeed: 4.1,
      orbitRadius: 0.167,
    },
    venus: {
      name: "Vênus",
      type: "rochoso",
      size: 0.95,
      distance: 108.2,
      info: "O planeta mais quente do sistema solar, com uma atmosfera densa de dióxido de carbono.",
      color: "#e6c87a",
      orbitSpeed: 1.6,
      orbitRadius: 0.238,
    },
    earth: {
      name: "Terra",
      type: "rochoso",
      size: 1.0,
      distance: 149.6,
      info: "Nosso lar, o único planeta conhecido com vida e água líquida em sua superfície.",
      color: "#6b93d6",
      orbitSpeed: 1.0,
      orbitRadius: 0.333,
    },
    mars: {
      name: "Marte",
      type: "rochoso",
      size: 0.53,
      distance: 227.9,
      info: "Conhecido como Planeta Vermelho, possui o maior vulcão do sistema solar.",
      color: "#c1440e",
      orbitSpeed: 0.53,
      orbitRadius: 0.429,
    },
    jupiter: {
      name: "Júpiter",
      type: "Gasoso",
      size: 11.2,
      distance: 778.5,
      info: "O maior planeta do sistema solar, com uma Grande Mancha Vermelha que é uma tempestade gigante.",
      color: "#d8ca9d",
      orbitSpeed: 0.08,
      orbitRadius: 0.571,
    },
    saturn: {
      name: "Saturno",
      type: "Gasoso",
      size: 9.45,
      distance: 1434,
      info: "Famoso por seus anéis espetaculares feitos de gelo e rocha.",
      color: "#f4d59e",
      orbitSpeed: 0.05,
      orbitRadius: 0.714,
    },
    uranus: {
      name: "Urano",
      type: "Gasoso",
      size: 4.0,
      distance: 2871,
      info: "Gira de lado, com seu eixo inclinado quase 90 graus em relação ao plano orbital.",
      color: "#d1e7e7",
      orbitSpeed: 0.01,
      orbitRadius: 0.857,
    },
    neptune: {
      name: "Netuno",
      type: "Gasoso",
      size: 3.88,
      distance: 4495,
      info: "O planeta mais distante do Sol, com ventos que chegam a 2.100 km/h.",
      color: "#5b5ddf",
      orbitSpeed: 0.006,
      orbitRadius: 1.0,
    },
  };
  let planetData = [];
  let animationId = null;
  let universeScale = 1;
  
  function calculateUniverseScale() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const minDimension = Math.min(viewportWidth, viewportHeight);
    universeScale = minDimension * 0.45;
    return universeScale;
  }
  
  function updateOrbitSizes() {
    const scale = calculateUniverseScale();
    planetData.forEach(planet => {
      planet.scaledOrbitRadius = planet.orbitRadius * scale;
    });
    
    // Update CSS orbit sizes
    const orbits = document.querySelectorAll('.orbit');
    const orbitClasses = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
    orbitClasses.forEach((orbitClass, index) => {
      const orbitElement = document.querySelector(`.orbit-${orbitClass}`);
      if (orbitElement) {
        const planet = planetData.find(p => p.id === orbitClass);
        if (planet) {
          const diameter = planet.scaledOrbitRadius * 2;
          orbitElement.style.width = `${diameter}px`;
          orbitElement.style.height = `${diameter}px`;
        }
      }
    });
  }
  async function fetchAllPlanetsData() {
    try {
      const apiPath = "./data/planets.json";
      const response = await fetch(apiPath);
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Usando dados locais:", error);
      return Object.entries(fallbackPlanets).map(([id, planet]) => ({
        id,
        ...planet,
      }));
    }
  }
  async function initializePlanetMovement() {
    const apiData = await fetchAllPlanetsData();
    const fixedAngles = {
      mercury: 0,
      venus: Math.PI / 4,
      earth: Math.PI / 2,
      mars: Math.PI * 0.75,
      jupiter: Math.PI,
      saturn: Math.PI * 1.25,
      uranus: Math.PI * 1.5,
      neptune: Math.PI * 1.75,
    };
    planetData = apiData.map((planet) => {
      const fallback = fallbackPlanets[planet.id];
      return {
        id: planet.id,
        name: planet.name,
        type: planet.type,
        size: planet.size,
        distance: planet.distance,
        info: planet.info,
        color: planet.color,
        orbitSpeed: planet.orbitSpeed || fallback.orbitSpeed,
        orbitRadius: planet.orbitRadius || fallback.orbitRadius,
        angle: fixedAngles[planet.id] || 0,
      };
    });
    updateOrbitSizes();
    startPlanetAnimation();
  }
  function startPlanetAnimation() {
    function animate() {
      const centerX = solarSystem.offsetWidth / 2;
      const centerY = solarSystem.offsetHeight / 2;
      const isPaused = window.universeState && window.universeState.isPaused;
      const timeScale = window.universeState
        ? window.universeState.timeScale
        : 1;
      planetData.forEach((planet) => {
        if (!isPaused) {
          planet.angle += planet.orbitSpeed * 0.001 * timeScale;
        }
        const x = centerX + Math.cos(planet.angle) * planet.scaledOrbitRadius;
        const y = centerY + Math.sin(planet.angle) * planet.scaledOrbitRadius;
        const planetElement = document.querySelector(`.planet-${planet.id}`);
        if (planetElement) {
          planetElement.style.left = `${x}px`;
          planetElement.style.top = `${y}px`;
          planetElement.style.transform = "translate(-50%, -50%)";
        }
      });
      animationId = requestAnimationFrame(animate);
    }
    animate();
  }
  async function fetchPlanetData(planetId) {
    try {
      const apiPath = "./data/planets.json";
      const response = await fetch(apiPath);
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }
      const data = await response.json();
      const planet = data.find((p) => p.id === planetId);
      return planet || fallbackPlanets[planetId];
    } catch (error) {
      console.log("Usando dados locais:", error);
      return fallbackPlanets[planetId];
    }
  }
  function createPlanetDomeOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "planet-dome-overlay";
    overlay.id = "planetDomeOverlay";
    const dome = document.createElement("div");
    dome.className = "planet-dome";
    dome.id = "planetDome";
    const closeBtn = document.createElement("button");
    closeBtn.className = "planet-dome-close";
    closeBtn.innerHTML = "×";
    closeBtn.onclick = closePlanetDome;
    const infoContainer = document.createElement("div");
    infoContainer.className = "planet-dome-info fixed-info";
    infoContainer.id = "planetDomeInfo";
    dome.appendChild(closeBtn);
    overlay.appendChild(dome);
    document.body.appendChild(overlay);
    document.body.appendChild(infoContainer);
    return overlay;
  }
  async function showPlanetDome(planetId, planetElement) {
    const planet = await fetchPlanetData(planetId);
    if (!planet) return;
    let overlay = document.getElementById("planetDomeOverlay");
    if (!overlay) {
      overlay = createPlanetDomeOverlay();
    }
    const dome = document.getElementById("planetDome");
    let infoContainer = document.getElementById("planetDomeInfo");

if (!infoContainer) {
  const overlay = document.getElementById("planetDomeOverlay");
  if (overlay) {
    infoContainer = createPlanetDomeOverlay().querySelector("#planetDomeInfo");
  } else {
    createPlanetDomeOverlay();
    infoContainer = document.getElementById("planetDomeInfo");
  }
}

if (!infoContainer) return;

dome.style.setProperty("--dome-color", planet.color);

infoContainer.innerHTML = `
<div class="dome-side left">

    <div class="planet-dome-info-box">
        <h3>Nome</h3>
        <p class="planet-highlight-name" style="color:${planet.color}">
            ${planet.name}
        </p>
    </div>

    <div class="planet-dome-info-box">
        <h3>Tipo</h3>
        <p class="planet-highlight-name" style="color:${planet.color}">
            ${planet.type}
        </p>
    </div>

</div>

<div class="dome-side right">

    <div class="planet-dome-info-box">
        <h3>Tamanho</h3>
        <p class="planet-highlight-name" style="color:${planet.color}">
            ${planet.size}x Terra
        </p>
    </div>

    <div class="planet-dome-info-box">
        <h3>Distância</h3>
        <p class="planet-highlight-name" style="color:${planet.color}">
            ${planet.distance} MI km
        </p>
    </div>

</div>
`;
    //
    overlay.classList.add("active");
    solarSystem.classList.add("planet-selected");
    document
      .querySelectorAll(".planet")
      .forEach((p) => p.classList.remove("selected-planet"));
    planetElement.classList.add("selected-planet");
    createPlanetArrow(planetElement);
    selectedPlanet = planetId;
  }
  function createPlanetArrow(planetElement) {
    if (planetArrow) {
      planetArrow.remove();
    }
    planetArrow = document.createElement("div");
    planetArrow.className = "planet-arrow active";
    planetElement.appendChild(planetArrow);
  }
function closePlanetDome() {
  const overlay = document.getElementById("planetDomeOverlay");

  if (overlay) {
    overlay.remove(); // destrói tudo de uma vez
  }
  const infoContainer = document.getElementById("planetDomeInfo");
  if (infoContainer) {
    infoContainer.remove();
  }
  solarSystem.classList.remove("planet-selected");
  document.querySelectorAll(".planet").forEach((p) =>
    p.classList.remove("selected-planet")
  );
  if (planetArrow) {
    planetArrow.remove();
    planetArrow = null;
  }
  selectedPlanet = null;
}
  async function updateInfoPanel(planetId) {
    const planet = await fetchPlanetData(planetId);
    if (planet) {
      planetName.textContent = planet.name;
      planetType.textContent = planet.type;
      planetSize.textContent = `${planet.size}x Terra`;
      planetDistance.textContent = `${planet.distance} MI km`;
      planetInfo.textContent = planet.info;
      planetVisual.style.setProperty("--accent-color", planet.color);
      planetName.style.color = planet.color;
      infoPanel.classList.add("active");
    }
  }
  planets.forEach((planet) => {
    planet.addEventListener("click", (e) => {
      e.stopPropagation();
      const planetId = planet.getAttribute("data-planet");
      showPlanetDome(planetId, planet);
    });
  });
  const sun = document.querySelector(".sun");
  if (sun) {
    sun.addEventListener("click", (e) => {
      e.stopPropagation();
      const sunId = sun.getAttribute("data-planet");
      showPlanetDome(sunId, sun);
    });
  }
  closeBtn.addEventListener("click", () => {
    infoPanel.classList.remove("active");
  });
  document.addEventListener("click", (e) => {
    if (
      !infoPanel.contains(e.target) &&
      !e.target.classList.contains("planet") &&
      !e.target.classList.contains("sun")
    ) {
      infoPanel.classList.remove("active");
    }
  });
  
  // Swipe down to close info panel on mobile
  let touchStartY = 0;
  let touchEndY = 0;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  
  if (isMobile) {
    infoPanel.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    infoPanel.addEventListener('touchmove', (e) => {
      touchEndY = e.touches[0].clientY;
      const deltaY = touchEndY - touchStartY;
      
      // If swiping down and panel is active
      if (deltaY > 50 && infoPanel.classList.contains('active')) {
        infoPanel.classList.remove('active');
        touchStartY = 0;
        touchEndY = 0;
      }
    }, { passive: true });
  }
  initializePlanetMovement();
  
  // Window resize listener to recalculate universe scale
  window.addEventListener('resize', () => {
    updateOrbitSizes();
  });
  
  function createStars() {
    const starsContainer = document.querySelector(".stars");
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const numberOfStars = isMobile ? 50 : 100;
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement("div");
      star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3}px;
                height: ${Math.random() * 3}px;
                background: white;
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.8 + 0.2};
                animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
      starsContainer.appendChild(star);
    }
  }
  createStars();
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const stars = document.querySelector(".stars");
    stars.style.transform = `translateY(${scrolled * 0.3}px)`;
  });
  console.log("🚀 AstroSideral inicializado com sucesso!");
  console.log(
    "💡 Use o sistema de câmera: arraste para mover, scroll para zoom",
  );
});
