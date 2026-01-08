// ==============================
// LECTURA DE PARAMETROS
// ==============================
const params = new URLSearchParams(window.location.search);

const p1 = params.get("p1") || "Jugador 1";
const p2 = params.get("p2") || "Jugador 2";

const hp1 = Number(params.get("hp1")) || 50;
const hp2 = Number(params.get("hp2")) || 50;

const df1 = Number(params.get("df1")) || 50;
const df2 = Number(params.get("df2")) || 50;

const a1 = params.get("a1");
const a2 = params.get("a2");

const winner = params.get("w") || "1";

// ==============================
// DOM
// ==============================
document.getElementById("name1").textContent = p1;
document.getElementById("name2").textContent = p2;

if (a1) document.getElementById("avatar1").src = a1;
if (a2) document.getElementById("avatar2").src = a2;

const car1 = document.getElementById("car1");
const car2 = document.getElementById("car2");
const track = document.getElementById("track");
const lapsDiv = document.getElementById("laps");
const resultDiv = document.getElementById("result");

// ==============================
// TRACK SVG
// ==============================
const path = document.getElementById("track-path");
const pathLength = path.getTotalLength();

// ==============================
// ESTADO DE CARRERA
// ==============================
let progress1 = 0;
let progress2 = 0;

let lap1 = 1;
let lap2 = 1;

const totalLaps = 3;
let finished = false;

// ==============================
// VELOCIDAD (BALANCEADA)
// ==============================
const speed1 = hp1 * 0.018 + df1 * 0.012;
const speed2 = hp2 * 0.018 + df2 * 0.012;

// ==============================
// FUNCIONES
// ==============================
function moveCar(car, progress) {
  const point = path.getPointAtLength(progress);
  car.style.left = `${point.x}px`;
  car.style.top = `${point.y}px`;
}

let camX = 0;

function updateCamera() {
  const leaderProgress =
    progress1 > progress2 ? progress1 : progress2;

  const leaderPoint = path.getPointAtLength(leaderProgress);

  // Centro de cámara (ajústalo si quieres)
  const targetX = 700 - leaderPoint.x;

  camX += (targetX - camX) * 0.08;
  track.style.transform = `translateX(${camX}px)`;
}

function lapTime(hp, df) {
  return (120 - hp * 0.3 - df * 0.2 + Math.random() * 4).toFixed(2);
}

function finishRace() {
  finished = true;

  const winCar = winner === "1" ? car1 : car2;
  winCar.style.filter = "drop-shadow(0 0 14px gold)";

  resultDiv.textContent =
    winner === "1"
      ? `🏆 Ganador: ${p1}`
      : `🏆 Ganador: ${p2}`;
}

// ==============================
// LOOP PRINCIPAL
// ==============================
function tick() {
  if (finished) return;

  progress1 += speed1;
  progress2 += speed2;

  moveCar(car1, progress1);
  moveCar(car2, progress2);
  updateCamera();

  // -------- VUELTAS JUGADOR 1 --------
  if (progress1 >= pathLength) {
    progress1 -= pathLength;

    const t1 = lapTime(hp1, df1);
    lapsDiv.innerHTML += `<p>Vuelta ${lap1}: ${p1} ⏱️ ${t1}s</p>`;
    lap1++;
  }

  // -------- VUELTAS JUGADOR 2 --------
  if (progress2 >= pathLength) {
    progress2 -= pathLength;

    const t2 = lapTime(hp2, df2);
    lapsDiv.innerHTML += `<p>Vuelta ${lap2}: ${p2} ⏱️ ${t2}s</p>`;
    lap2++;
  }

  // -------- FIN DE CARRERA --------
  if (lap1 > totalLaps && lap2 > totalLaps) {
    finishRace();
    return;
  }

  requestAnimationFrame(tick);
}

// ==============================
// START
// ==============================
requestAnimationFrame(tick);
