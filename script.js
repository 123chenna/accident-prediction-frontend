const BASE_URL = "https://accident-prediction-backend.onrender.com";

// 🔐 Signup
async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("https://accident-prediction-backend.onrender.com/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await res.text();
  alert(data);
   window.location.href = "index.html";
}


// Protect predict page
if (window.location.pathname.includes("dashboard.html.html")) {
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html.html";
  }
}

// LOGIN
async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Enter username and password");
    return;
  }

  const res = await fetch(BASE_URL + "/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    alert("User Doesnot Exixts");
    return;
  }

  const data = await res.json();
  localStorage.setItem("token", data.token);

  window.location.href = "dashboard.html";
}

// PREDICT
async function predict() {

  const speed = document.getElementById("speed").value;

  if (!speed) {
    alert("Enter speed");
    return;
  }

  const data = {
    speed: parseInt(speed),
    weather: document.getElementById("weather").value,
    roadType: document.getElementById("roadType").value,
    trafficDensity: document.getElementById("traffic").value,
    timeOfDay: document.getElementById("time").value
  };

  const res = await fetch(BASE_URL + "/api/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify(data)
  });

  const result = await res.text();
  const box = document.getElementById("result");

  if (result.toLowerCase().includes("high")) {
    box.className = "danger";
  } else {
    box.className = "safe";
  }

  box.innerText = result;
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
