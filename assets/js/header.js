document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const waitForHeader = setInterval(() => {
    const navCart = document.querySelector(".nav-cart");
    const navHistory = document.querySelector(".nav-history");
    const navLogin = document.querySelector(".nav-login");
    const userAvatar = document.getElementById("userAvatar");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const avatarDropdown = document.getElementById("avatarDropdown");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!navCart || !logoutBtn) return; // Header chưa load -> chờ tiếp
    clearInterval(waitForHeader);

    // 👉 Ảnh mặc định
    const DEFAULT_AVATAR = "../assets/img/Avatar/ava4.jpg";
    const avatarImg = userAvatar.querySelector("img"); 

    if (currentUser) {
      // --- Khi đã đăng nhập ---
      navCart.style.display = "inline-block";
      navHistory.style.display = "inline-block";
      navLogin.style.display = "none";
      userAvatar.style.display = "inline-block";
      usernameDisplay.textContent = currentUser.userName;

      // ✅ Cập nhật avatar theo user hoặc dùng mặc định
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
      // --- Khi chưa đăng nhập ---
      navCart.style.display = "none";
      navHistory.style.display = "none";
      navLogin.style.display = "inline-block";
      userAvatar.style.display = "none";
    }
  }, 100);
});
