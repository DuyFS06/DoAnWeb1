document.addEventListener("DOMContentLoaded", () => {
  const sectionHoso = document.getElementById("section-hoso");
  if (!sectionHoso) return;

  /** Hiển thị thông tin hồ sơ người dùng */
  function hienHoSo(user) {
    if (!user) return;

    // Sidebar 
    const sideAvatar = document.getElementById("sideAvatar-hoso");
    const sideUsername = document.getElementById("sideUsername-hoso");
    if (sideAvatar) sideAvatar.src = user.avatar || "./assets/img/Avatar/avtuser.jpg";
    if (sideUsername) sideUsername.textContent = user.userName || "Người dùng";

    //Nội dung trang hồ sơ
    const usernameDisplay = document.getElementById("usernameDisplay-hoso");
    const emailDisplay = document.getElementById("emailDisplay-hoso");
    const phoneDisplay = document.getElementById("phoneDisplay-hoso");
    const addressDisplay = document.getElementById("addressDisplay-hoso");

    if (usernameDisplay) usernameDisplay.textContent = user.userName || "";
    if (emailDisplay) emailDisplay.textContent = user.email || "";
    if (phoneDisplay) phoneDisplay.textContent = user.phone || "Chưa có số điện thoại";
    if (addressDisplay) addressDisplay.textContent = user.address || "Chưa có địa chỉ";
  }

  /** Mở trang hồ sơ, kiểm tra đăng nhập */
  function moHoSo() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      baoDangNhap();
      return;
    }
    sectionHoso.style.display = "block";
    hienHoSo(user);
  }

  /** Thông báo cần đăng nhập */
  function baoDangNhap() {
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
  }

  /** Chờ header tải xong rồi cập nhật */
  function doiHeader() {
    const cho = setInterval(() => {
      const navLogin = document.querySelector(".nav-login");
      const userAvatar = document.getElementById("userAvatar");
      if (!navLogin || !userAvatar) return; // header chưa load

      clearInterval(cho);
      capNhatHeader();
    }, 100);
  }

  /** Cập nhật giao diện header */
  function capNhatHeader() {
    const navLogin = document.querySelector(".nav-login");
    const userAvatar = document.getElementById("userAvatar");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      if (navLogin) navLogin.style.display = "none";
      if (userAvatar) userAvatar.style.display = "inline-block";
      hienHoSo(currentUser);
    } else {
      if (navLogin) navLogin.style.display = "inline-block";
      if (userAvatar) userAvatar.style.display = "none";
    }
  }

  /** Tự động hiển thị hồ sơ khi đã đăng nhập */
  function tuDongHoSo() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) hienHoSo(user);
  }


  // Gán global để router có thể gọi
  window.moHoSo = moHoSo;

  // Khởi chạy
  doiHeader();
  tuDongHoSo();
});
