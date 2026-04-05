const BASE_URL = "https://accident-prediction-backend.onrender.com";

// 🔐 Signup
async function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // ✅ Validation
  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  const res = await fetch(BASE_URL + "/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    alert("Registered Successfully");
  } else {
    alert("Signup failed");
  }
}// 🔑 Login
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
    alert("Login failed");
    return;
  }

  const data = await res.json();
  localStorage.setItem("token", data.token);

  window.location.href = "predict.html";
}// 📊 Predict 
async function predict() {

  const speed = document.getElementById("speed").value;

  if (!speed) {
    alert("Please enter speed");
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
  alert("Please Drive Carefully");
  const resultText = await res.text();
document.getElementById("result").innerText = resultText;
}
// 🚪 Logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html"; // ✅ FIXED
}
