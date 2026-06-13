//space.events.js
document.addEventListener("DOMContentLoaded", () => {
  const spaceEventsContainer = document.createElement("div");
  spaceEventsContainer.id = "space-events";
  spaceEventsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
        overflow: hidden;
    `;
  document.body.appendChild(spaceEventsContainer);
  function createMeteor() {
    if (window.asteroidState && !window.asteroidState.enabled) {
      return;
    }
    const meteor = document.createElement("div");
    meteor.className = "meteor";
    const startSide = Math.random() > 0.5 ? "top" : "left";
    let startX, startY;
    if (startSide === "top") {
      startX = Math.random() * window.innerWidth;
      startY = -50;
    } else {
      startX = -50;
      startY = Math.random() * window.innerHeight * 0.5;
    }
    const size = Math.random() * 3 + 2;
    const duration = Math.random() * 3 + 2;
    const angle = Math.random() * 30 + 30;
    const totalDistance = window.innerWidth + 300;
    meteor.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size * 4}px;
            background: linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0));
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            left: ${startX}px;
            top: ${startY}px;
            transform: rotate(${angle}deg);
            box-shadow: 0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4);
            opacity: 0;
        `;
    spaceEventsContainer.appendChild(meteor);
    const trail = document.createElement("div");
    trail.style.cssText = `
            position: absolute;
            width: 0;
            height: ${size}px;
            background: linear-gradient(to left, transparent, rgba(255,255,255,0.3), rgba(255,255,255,0.6));
            right: ${size}px;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 50%;
            filter: blur(1px);
        `;
    meteor.appendChild(trail);
    meteor.animate(
      [
        {
          opacity: 0,
          transform: `rotate(${angle}deg) translateX(0)`,
          offset: 0,
        },
        {
          opacity: 0.5,
          transform: `rotate(${angle}deg) translateX(${totalDistance * 0.1}px)`,
          offset: 0.15,
        },
        {
          opacity: 1,
          transform: `rotate(${angle}deg) translateX(${totalDistance * 0.4}px)`,
          offset: 0.3,
        },
        {
          opacity: 1,
          transform: `rotate(${angle}deg) translateX(${totalDistance * 0.7}px)`,
          offset: 0.5,
        },
        {
          opacity: 0.7,
          transform: `rotate(${angle}deg) translateX(${totalDistance * 0.85}px)`,
          offset: 0.75,
        },
        {
          opacity: 0,
          transform: `rotate(${angle}deg) translateX(${totalDistance}px)`,
          offset: 1,
        },
      ],
      {
        duration: duration * 1000,
        easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    ).onfinish = () => {
      meteor.remove();
    };
    trail.animate(
      [
        { width: "0px", opacity: 0 },
        { width: `${size * 8}px`, opacity: 0.6, offset: 0.2 },
        { width: `${size * 12}px`, opacity: 0.8, offset: 0.4 },
        { width: `${size * 8}px`, opacity: 0.4, offset: 0.7 },
        { width: "0px", opacity: 0 },
      ],
      {
        duration: duration * 1000,
        easing: "ease-in-out",
      },
    );
  }
  function createComet() {
    if (window.asteroidState && !window.asteroidState.enabled) {
      return;
    }
    const comet = document.createElement("div");
    comet.className = "comet";
    const startX = Math.random() * window.innerWidth;
    const startY = -100;
    const size = Math.random() * 8 + 6;
    const duration = Math.random() * 4 + 3;
    const colors = ["#00ffff", "#87ceeb", "#ffffff", "#add8e6"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    comet.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, ${color}, rgba(0,0,0,0));
            border-radius: 50%;
            left: ${startX}px;
            top: ${startY}px;
            box-shadow: 0 0 20px ${color}, 0 0 40px ${color}, 0 0 60px ${color};
            opacity: 0;
        `;
    const trail = document.createElement("div");
    trail.className = "comet-trail";
    trail.style.cssText = `
            position: absolute;
            width: ${size * 3}px;
            height: ${size}px;
            background: linear-gradient(to right, transparent, ${color}33, ${color}66);
            border-radius: 50%;
            right: ${size}px;
            top: 50%;
            transform: translateY(-50%);
            filter: blur(2px);
        `;
    comet.appendChild(trail);
    spaceEventsContainer.appendChild(comet);
    const angle = Math.random() * 20 + 70;
    comet.animate(
      [
        {
          opacity: 0,
          transform: `rotate(${angle}deg) translateX(0) scale(0.5)`,
        },
        {
          opacity: 1,
          offset: 0.1,
        },
        {
          opacity: 1,
          offset: 0.7,
        },
        {
          opacity: 0,
          transform: `rotate(${angle}deg) translateX(${window.innerHeight + 200}px) scale(0.3)`,
        },
      ],
      {
        duration: duration * 1000,
        easing: "ease-in-out",
      },
    ).onfinish = () => {
      comet.remove();
    };
  }
  function createShootingStar() {
    if (window.asteroidState && !window.asteroidState.enabled) {
      return;
    }
    const star = document.createElement("div");
    star.className = "shooting-star";
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.3;
    star.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            left: ${startX}px;
            top: ${startY}px;
            box-shadow: 0 0 15px white, 0 0 30px white, 0 0 45px rgba(255,255,255,0.5);
        `;
    const trail = document.createElement("div");
    trail.style.cssText = `
            position: absolute;
            width: 150px;
            height: 2px;
            background: linear-gradient(to left, transparent, rgba(255,255,255,0.8), white);
            right: 4px;
            top: 50%;
            transform: translateY(-50%);
        `;
    star.appendChild(trail);
    spaceEventsContainer.appendChild(star);
    const angle = Math.random() * 45 + 25;
    star.animate(
      [
        {
          opacity: 0,
          transform: `rotate(${angle}deg) translateX(0)`,
        },
        {
          opacity: 1,
          offset: 0.05,
        },
        {
          opacity: 0,
          transform: `rotate(${angle}deg) translateX(300px)`,
        },
      ],
      {
        duration: 800,
        easing: "ease-out",
      },
    ).onfinish = () => {
      star.remove();
    };
  }
  function spawnSpaceEvents() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const multiplier = isMobile ? 2 : 1;
    
    setInterval(() => {
      if (Math.random() > 0.7) {
        createMeteor();
      }
    }, 5000 * multiplier);
    setInterval(() => {
      if (Math.random() > 0.8) {
        createComet();
      }
    }, 12000 * multiplier);
    setInterval(() => {
      if (Math.random() > 0.85) {
        createShootingStar();
      }
    }, 8000 * multiplier);
    setInterval(() => {
      const eventType = Math.random();
      if (eventType < 0.15) {
        createMeteor();
      } else if (eventType < 0.25) {
        createShootingStar();
      }
    }, 6000 * multiplier);
  }
  spawnSpaceEvents();
  console.log("🌠 Eventos espaciais inicializados!");
});
