const params = new URLSearchParams(window.location.search);

const p1 = params.get("p1");
const p2 = params.get("p2");
const hp1 = Number(params.get("hp1"));
const hp2 = Number(params.get("hp2"));
const df1 = Number(params.get("df1"));
const df2 = Number(params.get("df2"));
const winner = params.get("w");
const avatar1 = params.get("a1");
const avatar2 = params.get("a2");

document.getElementById("avatar1").src = avatar1;
document.getElementById("avatar2").src = avatar2;

const car1 = document.getElementById("car1");
const car2 = document.getElementById("car2");
const lapsDiv = document.getElementById("laps");

let lap = 1;
let progress1 = 0;
let progress2 = 0;

function lapTime(hp, df) {
  return 120 - hp * 0.3 - df * 0.2 + Math.random() * 5;
}

function runLap() {
  if (lap > 3) {
    document.getElementById("result").textContent =
      winner === "1"
        ? `🏆 Ganador: ${p1}`
        : `🏆 Ganador: ${p2}`;
    return;
  }

  const t1 = lapTime(hp1, df1);
  const t2 = lapTime(hp2, df2);

  const steps = 100;
  let step = 0;

  const interval = setInterval(() => {
    step++;

    if (!(winner === "1" && lap === 3)) {
      progress1 += 1 / steps;
      car1.style.offsetDistance = `${progress1 * 100}%`;
    }

    if (!(winner === "2" && lap === 3)) {
      progress2 += 1 / steps;
      car2.style.offsetDistance = `${progress2 * 100}%`;
    }

    if (step >= steps) {
      clearInterval(interval);

      lapsDiv.innerHTML += `
        <p>Vuelta ${lap}: ${p1} ⏱️ ${t1.toFixed(2)}s | ${p2} ⏱️ ${t2.toFixed(2)}s</p>
      `;

      lap++;
      runLap();
    }
  }, 20);
}

runLap();
