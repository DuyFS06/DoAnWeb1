// assets/js/hoso.js
document.addEventListener("DOMContentLoaded", () => {
  const sectionHoso = document.getElementById("section-hoso");
  if (!sectionHoso) return; // Nếu không có section thì thoát


  // function: cập nhật sidebar / nội dung hồ sơ
  function renderHoso(user) {
  if (!user) return;

  // Sidebar
  const sideAvatar = document.getElementById("sideAvatar-hoso");
  const sideUsername = document.getElementById("sideUsername-hoso");

  if (sideAvatar) sideAvatar.src = user.avatar || "./assets/img/Avatar/avtuser.jpg";
  if (sideUsername) sideUsername.textContent = user.userName || "Người dùng";

  // Nội dung trang
  const usernameDisplay = document.getElementById("usernameDisplay-hoso");
  const emailDisplay = document.getElementById("emailDisplay-hoso");
  const addressDisplay = document.getElementById("addressDisplay-hoso");
  const phoneDisplay = document.getElementById("phoneDisplay-hoso"); 

  if (usernameDisplay) usernameDisplay.textContent = user.userName || "";
  if (emailDisplay) emailDisplay.textContent = user.email || "";
  if (phoneDisplay) phoneDisplay.textContent = user.phone || "Chưa có số điện thoại"; 
  if (addressDisplay) addressDisplay.textContent = user.address || "Chưa có địa chỉ";
}


  // Header - update UI
  const waitForHeader = setInterval(() => {
    const navCart = document.querySelector(".nav-cart");
    const navHistory = document.querySelector(".nav-history");
    const navLogin = document.querySelector(".nav-login");
    const userAvatar = document.getElementById("userAvatar");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const avatarDropdown = document.getElementById("avatarDropdown");
    const logoutBtn = document.getElementById("logoutBtn");

    if (!navCart || !logoutBtn || !userAvatar) return; // Header chưa load -> chờ tiếp
    clearInterval(waitForHeader);

    const DEFAULT_AVATAR = "./assets/img/Avatar/avtuser.jpg";
    const avatarImg = userAvatar.querySelector("img");

    // Lấy trực tiếp currentUser từ localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      // Đã đăng nhập
      navCart.style.display = "inline-block";
      navHistory.style.display = "inline-block";
      navLogin.style.display = "none";
      userAvatar.style.display = "inline-block";
      if (usernameDisplay) usernameDisplay.textContent = currentUser.userName || "";
      if (avatarImg) avatarImg.src = currentUser.avatar || DEFAULT_AVATAR;

      // Toggle dropdown avatar
      userAvatar.addEventListener("click", () => {
        if (avatarDropdown) avatarDropdown.classList.toggle("show");
      });

      // Đăng xuất
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        localStorage.removeItem("currentUser");
        if (typeof window.updateHeaderUI === "function") window.updateHeaderUI();
        if (typeof window.navigateTo === "function") {
          window.navigateTo("home");
        } else {
          window.location.href = "./index.html";
        }
      });

      // Nếu đang ở hồ sơ, render nội dung
      renderHoso(currentUser);

    } else {
      // Chưa đăng nhập
      navCart.style.display = "none";
      navHistory.style.display = "none";
      navLogin.style.display = "inline-block";
      userAvatar.style.display = "none";
    }
  }, 100);

  // Khi người dùng muốn vào hồ sơ, kiểm tra login
  window.showHosoSection = function () {
    // Lấy trực tiếp currentUser khi muốn render hồ sơ
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Cần đăng nhập",
        text: "Bạn phải đăng nhập để xem hồ sơ.",
        confirmButtonText: "Đăng nhập",
      }).then(() => {
        if (typeof window.navigateTo === "function") {
          window.navigateTo("login");
        } else {
          window.location.href = "#login";
        }
      });
      return;
    }

    // Hiển thị section hồ sơ
    sectionHoso.style.display = "block";
    renderHoso(user);
  };

  // Tự động render hồ sơ khi vừa đăng nhập xong
  const autoRender = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) renderHoso(user);
  };

  autoRender(); // Gọi khi DOM đã load
});
