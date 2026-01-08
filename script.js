const params = new URLSearchParams(window.location.search);

// Datos desde el bot
const p1 = params.get("p1") || "Jugador 1";
const p2 = params.get("p2") || "Jugador 2";
const hp1 = Number(params.get("hp1")) || 50;
const hp2 = Number(params.get("hp2")) || 50;
const df1 = Number(params.get("df1")) || 50;
const df2 = Number(params.get("df2")) || 50;
const a1 = params.get("a1");
const a2 = params.get("a2");
const winner = params.get("w");

document.getElementById("name1").textContent = p1;
document.getElementById("name2").textContent = p2;
if (a1) document.getElementById("avatar1").src = a1;
if (a2) document.getElementById("avatar2").src = a2;

const car1 = document.getElementById("car1");
const car2 = document.getElementById("car2");
const track = document.getElementById("track");
const lapsDiv = document.getElementById("laps");
const resultDiv = document.getElementById("result");

// Path SVG
const path = document.getElementById("track-path");
const pathLength = path.getTotalLength();

// Estados
let progress1 = 0;
let progress2 = 0;
let lap = 1;
const totalLaps = 3;

// Velocidad basada en stats
const speed1 = hp1 * 0.02 + df1 * 0.01;
const speed2 = hp2 * 0.02 + df2 * 0.01;

function moveCar(car, progress) {
  const point = path.getPointAtLength(progress);
  car.style.left = `${point.x}px`;
  car.style.top = `${point.y}px`;
}

function updateCamera() {
  const leaderProgress = Math.max(progress1, progress2);
  const cameraX = Math.min(
    0,
    300 - leaderProgress
  );
  track.style.transform = `translateX(${cameraX}px)`;
}

function lapTime(hp, df) {
  return (120 - hp * 0.3 - df * 0.2 + Math.random() * 5).toFixed(2);
}

function tick() {
  if (lap > totalLaps) {
    resultDiv.textContent =
      winner === "1"
        ? `🏆 Ganador: ${p1}`
        : `🏆 Ganador: ${p2}`;
    return;
  }

  progress1 += speed1;
  progress2 += speed2;

  moveCar(car1, progress1);
  moveCar(car2, progress2);
  updateCamera();

  if (progress1 >= pathLength && progress2 >= pathLength) {
    const t1 = lapTime(hp1, df1);
    const t2 = lapTime(hp2, df2);

    lapsDiv.innerHTML += `
      <p>Vuelta ${lap}: ${p1} ⏱️ ${t1}s | ${p2} ⏱️ ${t2}s</p>
    `;

    progress1 = 0;
    progress2 = 0;
    lap++;
  }

  requestAnimationFrame(tick);
}

// Inicio
requestAnimationFrame(tick);
