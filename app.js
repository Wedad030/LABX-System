// إعداد الحسابات
const accounts = {
  admin: {
    password: "labx2026",
    roleText: "مدير النظام — وصول كامل"
  },
  stats: {
    password: "Wedad20",
    roleText: "تقارير وإحصائيات فقط"
  }
};

// هل نحن في صفحة الداشبورد أم صفحة تسجيل الدخول؟
const isDashboard = document.querySelector(".main-card") !== null;
const logoutBtn = document.getElementById("logoutBtn");

function setHeaderFromUser() {
  const userNameSpan = document.getElementById("userName");
  const roleLabel = document.getElementById("roleLabel");
  const current = localStorage.getItem("labxUser");

  if (!current) return;

  if (userNameSpan) userNameSpan.textContent = current;
  if (roleLabel && accounts[current]) roleLabel.textContent = accounts[current].roleText;
}

// تسجيل خروج
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("labxUser");
    window.location.href = "index.html";
  });
}

// حماية الصفحات الفرعية (لا تفتح بدون تسجيل دخول)
(function protectPages() {
  const currentPath = window.location.pathname;
  const file = currentPath.split("/").pop() || "index.html";
  const user = localStorage.getItem("labxUser");

  const isLoginPage = file === "index.html";

  if (!isLoginPage && !user) {
    window.location.href = "index.html";
  }

  if (!isLoginPage) {
    setHeaderFromUser();
  }
})();

// لو كنتِ تستخدمين صفحة login سابقة فيها inputs user/pass
// هذا فنكشن تسجيل الدخول (نستعمله في index القديم أو لو رجعناه لاحقًا)
function login() {
  let user = document.getElementById("user").value.trim();
  let pass = document.getElementById("pass").value.trim();
  let err = document.getElementById("err");

  if (!accounts[user] || accounts[user].password !== pass) {
    if (err) err.innerText = "بيانات الدخول غير صحيحة ❌";
    return;
  }

  localStorage.setItem("labxUser", user);
  window.location.href = "index.html";
}
