const BASE_URL = "https://accident-prediction-backend.onrender.com";


// 🔐 SIGNUP
async function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Enter username and password");
    return;
  }

  const res = await fetch(BASE_URL + "/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    alert("Signup failed");
    return;
  }

  const data = await res.text();
  alert(data);

  // 👉 Go to login page
  window.location.href = "index.html";
}


// 🔒 PROTECT DASHBOARD PAGE
if (window.location.pathname.includes("graph.html")) {
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
  }
}


// 🔐 LOGIN
async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Enter username and password");
    return;
  }

  const res = await fetch(BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    alert("User does not exist or wrong password");
    return;
  }

  const data = await res.json();

  // 🔥 Store token
  localStorage.setItem("token", data.token);

  // 👉 Go to predict page
  window.location.href = "dashboard.html";
}


// 📊 PREDICT
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

  if (!res.ok) {
    alert("Prediction failed");
    return;
  }

  // 🔥 Get result text (HIGH / LOW)
  const resultText = await res.text();

  // 🔥 Store result for dashboard
  localStorage.setItem("prediction", JSON.stringify({
    prediction: resultText
  }));

  // 👉 Go to dashboard
  window.location.href = "graph.html";
}


// 🔓 LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
