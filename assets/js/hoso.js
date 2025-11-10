// assets/js/hoso.js
document.addEventListener("DOMContentLoaded", () => {
  const sectionHoso = document.getElementById("section-hoso");
  if (!sectionHoso) return; // Nếu không có section thì thoát

  // Hàm: cập nhật sidebar / nội dung hồ sơ
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

  // Header - update UI (chỉ ẩn avatar nếu chưa login)
  const waitForHeader = setInterval(() => {
    const navLogin = document.querySelector(".nav-login");
    const userAvatar = document.getElementById("userAvatar");

    if (!navLogin || !userAvatar) return; // Header chưa load -> chờ tiếp
    clearInterval(waitForHeader);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      // Đã đăng nhập
      if (navLogin) navLogin.style.display = "none";
      if (userAvatar) userAvatar.style.display = "inline-block";
      renderHoso(currentUser);
    } else {
      // Chưa đăng nhập
      if (navLogin) navLogin.style.display = "inline-block";
      if (userAvatar) userAvatar.style.display = "none";
    }
  }, 100);

  // Khi người dùng muốn vào hồ sơ, kiểm tra login
  window.showHosoSection = function () {
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

  // Tự động render hồ sơ nếu đã login
  const autoRender = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) renderHoso(user);
  };

  autoRender();
});
