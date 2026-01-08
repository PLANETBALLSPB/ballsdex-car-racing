// ==============================
// VALIDACIÓN DE PARAMS
// ==============================
const params = new URLSearchParams(window.location.search);

const required = ["p1", "p2", "hp1", "hp2", "df1", "df2", "w"];
const missing = required.filter(p => !params.has(p));

if (missing.length > 0) {
  document.body.innerHTML = `
    <div style="text-align:center;margin-top:60px;font-family:sans-serif;">
      <h2>🚫 Carrera no válida</h2>
      <p>Esta simulación debe abrirse desde el bot de Discord.</p>
    </div>
  `;
  throw new Error("Missing race params: " + missing.join(", "));
}

// ==============================
// DATOS DESDE EL BOT
// ==============================
const p1 = params.get("p1");
const p2 = params.get("p2");

const hp1 = Number(params.get("hp1"));
const hp2 = Number(params.get("hp2"));

const df1 = Number(params.get("df1"));
const df2 = Number(params.get("df2"));

const winner = params.get("w"); // "1" o "2"

// ==============================
// ELEMENTOS DOM
// ==============================
const car1 = document.getElementById("car1");
const car2 = document.getElementById("car2");
const lapsDiv = document.getElementById("laps");
const resultDiv = document.getElementById("result");

document.getElementById("p1-name").textContent = p1;
document.getElementById("p2-name").textContent = p2;

document.getElementById("p1-hp").textContent = hp1;
document.getElementById("p2-hp").textContent = hp2;

document.getElementById("p1-df").textContent = df1;
document.getElementById("p2-df").textContent = df2;

// ==============================
// SIMULACIÓN
// ==============================
let lap = 1;
const TOTAL_LAPS = 3;

function lapTime(hp, df) {
  return (120 - hp * 0.3 - df * 0.2 + Math.random() * 5).toFixed(2);
}

function runLap() {
  if (lap > TOTAL_LAPS) {
    resultDiv.textContent =
      winner === "1"
        ? `🏆 Ganador: ${p1}`
        : `🏆 Ganador: ${p2}`;
    return;
  }

  const t1 = lapTime(hp1, df1);
  const t2 = lapTime(hp2, df2);

  // Animación
  car1.style.left = "85%";
  car2.style.left = "85%";

  lapsDiv.innerHTML += `
    <p>
      🏁 Vuelta ${lap} —
      ${p1}: ⏱️ ${t1}s |
      ${p2}: ⏱️ ${t2}s
    </p>
  `;

  setTimeout(() => {
    car1.style.left = "10px";
    car2.style.left = "10px";
    lap++;
    runLap();
  }, 2000);
}

// ==============================
// START
// ==============================
setTimeout(runLap, 800);
