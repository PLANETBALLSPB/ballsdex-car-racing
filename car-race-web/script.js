const params = new URLSearchParams(window.location.search);

// Datos del bot
const p1 = params.get("p1") ?? "Jugador 1";
const p2 = params.get("p2") ?? "Jugador 2";

const hp1 = Number(params.get("hp1")) || 0;
const hp2 = Number(params.get("hp2")) || 0;

const df1 = Number(params.get("df1")) || 0;
const df2 = Number(params.get("df2")) || 0;

const avatar1 = params.get("a1");
const avatar2 = params.get("a2");

const winner = params.get("w"); // 1 o 2

// UI
document.getElementById("p1-name").textContent = p1;
document.getElementById("p2-name").textContent = p2;

document.getElementById("p1-hp").textContent = hp1;
document.getElementById("p2-hp").textContent = hp2;

document.getElementById("p1-df").textContent = df1;
document.getElementById("p2-df").textContent = df2;

if (avatar1) document.getElementById("p1-avatar").src = avatar1;
if (avatar2) document.getElementById("p2-avatar").src = avatar2;

const car1 = document.getElementById("car1");
const car2 = document.getElementById("car2");
const lapsDiv = document.getElementById("laps");

let lap = 1;

function lapTime(hp, df) {
  return (120 - hp * 0.3 - df * 0.2 + Math.random() * 5).toFixed(2);
}

function runLap() {
  if (lap > 3) {
    const result = document.getElementById("result");
    result.textContent =
      winner === "1"
        ? `🏆 Ganador: ${p1}`
        : `🏆 Ganador: ${p2}`;
    return;
  }

  const t1 = lapTime(hp1, df1);
  const t2 = lapTime(hp2, df2);

  car1.style.left = "85%";
  car2.style.left = "85%";

  lapsDiv.innerHTML += `
    <p>Vuelta ${lap}: 
    ${p1} ⏱️ ${t1}s | 
    ${p2} ⏱️ ${t2}s
    </p>
  `;

  setTimeout(() => {
    car1.style.left = "10px";
    car2.style.left = "10px";
    lap++;
    runLap();
  }, 2000);
}

setTimeout(runLap, 800);
