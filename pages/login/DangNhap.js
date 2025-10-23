document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // --- SweetAlert2 popup ---
  const showPopup = (icon, title, text, callback = null) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 1300,
      timerProgressBar: true,
      didClose: () => {
        if (callback) callback();
      },
    });
  };

  // --- Lấy danh sách user ---
  let userList = JSON.parse(localStorage.getItem("userList")) || [];

  // --- Kiểm tra xem có ai đang đăng nhập không ---
  const activeUser = userList.find((u) => u.isLoggedIn === true);
  if (activeUser) {
    showPopup("info", "Xin chào " + activeUser.userName + "!", "Bạn đã đăng nhập rồi, chuyển hướng đến Trang chủ...", () => {
      window.location.href = "TrangChu.html";
    });
    return;
  }

  // --- Xác thực người dùng ---
  const authenticateUser = (identifier, password) => {
    return (
      userList.find(
        (user) =>
          (user.email === identifier || user.userName === identifier) &&
          user.password === password
      ) || null
    );
  };

  // --- Xử lý khi bấm nút Đăng nhập ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const identifier = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!identifier || !password) {
      showPopup("warning", "Thiếu thông tin", "Vui lòng nhập đầy đủ tài khoản và mật khẩu.");
      return;
    }

    const user = authenticateUser(identifier, password);

    if (user) {
      // Gán trạng thái đăng nhập
      userList = userList.map((u) => ({
        ...u,
        isLoggedIn: u.email === user.email || u.userName === user.userName,
      }));

      // Cập nhật lại localStorage
      localStorage.setItem("userList", JSON.stringify(userList));

      // Hiện popup thành công
      showPopup("success", "Đăng nhập thành công!", "Chào mừng " + user.userName + " quay lại!", () => {
        window.location.href = "TrangChu.html";
      });

      form.reset();
    } else {
      showPopup("error", "Đăng nhập thất bại!", "Tên đăng nhập hoặc mật khẩu không đúng.");
    }
  });
});
