document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const DEFAULT_AVATAR = "./assets/img/Avatar/avtuser.jpg";

  // Chờ đến khi header được include xong
  const waitForHeader = setInterval(() => {
    const navLogin = document.querySelector(".nav-login");
    const navCart = document.querySelector(".nav-cart");
    const navHistory = document.querySelector(".nav-history");
    const userAvatar = document.getElementById("userAvatar");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const avatarDropdown = document.getElementById("avatarDropdown");
    const logoutBtn = document.getElementById("logoutBtn");

    // Nếu header chưa gắn vào DOM thì tiếp tục chờ
    if (!userAvatar || !navLogin || !logoutBtn) return;

    clearInterval(waitForHeader); // header đã load

    const avatarImg = userAvatar.querySelector("img");

    if (currentUser) {
      // --- Đã đăng nhập ---
      navLogin.style.display = "none";
      navCart.style.display = "inline-block";
      navHistory.style.display = "inline-block";
      userAvatar.style.display = "inline-flex";
      usernameDisplay.textContent = currentUser.userName;
      avatarImg.src = currentUser.avatar || DEFAULT_AVATAR;

      // Toggle dropdown
      userAvatar.addEventListener("click", () => {
        avatarDropdown.classList.toggle("show");
      });

      // Đăng xuất
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "./index.html";
      });
    } else {
      // --- Chưa đăng nhập ---
      navLogin.style.display = "inline-block";
      navCart.style.display = "none";
      navHistory.style.display = "none";
      userAvatar.style.display = "none";
    }
  }, 120);
});
