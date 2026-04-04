const BASE_URL = "https://accident-backend.onrender.com";

// 🔐 Signup
async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(BASE_URL + "/api/signup", {   // ✅ FIXED
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  alert(await res.text());
  window.location.href = "index.html"; // ✅ FIXED
}

// 🔑 Login
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(BASE_URL + "/api/login", {   // ✅ FIXED
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    alert("Login request failed");
    return;
  }

  const data = await res.json();

  if (data.error) {
    alert("Login Failed");
  } else {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  }
}

// 📊 Predict (already correct)
async function predict() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  const data = {
    speed: parseInt(document.getElementById("speed").value),
    weather: document.getElementById("weather").value,
    roadType: document.getElementById("roadType").value,
    trafficDensity: document.getElementById("traffic").value,
    timeOfDay: document.getElementById("time").value
  };

  const res = await fetch(BASE_URL + "/api/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(data)
  });

  const text = await res.text();
  document.getElementById("result").innerText = "Risk Level: " + text;
}

// 🚪 Logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html"; // ✅ FIXED
}
