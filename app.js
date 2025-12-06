function login() {
  let user = document.getElementById("user").value.trim();
  let pass = document.getElementById("pass").value.trim();
  let err = document.getElementById("err");

  const accounts = {
    admin: "labx2026",
    stats: "Wedad20"
  };

  if (!accounts[user] || accounts[user] !== pass) {
    err.innerText = "بيانات الدخول غير صحيحة ❌";
    return;
  }

  // Save user inside browser
  localStorage.setItem("labxUser", user);

  // Switch screen
  document.getElementById("login").style.display = "none";
  document.getElementById("dash").style.display = "block";

  document.getElementById("welcome").innerText = `مرحبًا ${user} 👋`;

  document.getElementById("role").innerText =
    user === "admin"
      ? "مدير النظام — وصول كامل"
      : "عرض الإحصائيات فقط";
}

function logout() {
  localStorage.removeItem("labxUser");
  document.getElementById("dash").style.display = "none";
  document.getElementById("login").style.display = "block";
}