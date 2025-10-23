document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("confirmPassword");
  const addressInput = document.getElementById("address");

  // Hàm hiển thị popup SweetAlert2
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

  let userList = JSON.parse(localStorage.getItem("userList")) || [];

  // Kiểm tra email trùng khi rời khỏi ô nhập
  emailInput.addEventListener("blur", () => {
    const email = emailInput.value.trim();
    if (!email) return;

    const exists = userList.some((u) => u.email === email);
    if (exists) {
      showPopup("error", "Email đã tồn tại!", "Vui lòng sử dụng email khác.");
      emailInput.style.border = "2px solid red";
    } else {
      emailInput.style.border = "2px solid #4caf50";
    }
  });

  // Xử lý khi nhấn Đăng ký
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmInput.value.trim();
    const address = addressInput.value.trim();

    userList = JSON.parse(localStorage.getItem("userList")) || [];

    //  Kiểm tra rỗng từng trường
    if (!username || !email || !password || !confirmPassword || !address) {
      showPopup("warning", "Thiếu thông tin!", "Vui lòng điền đầy đủ tất cả các trường, bao gồm địa chỉ.");
      return;
    }

    //  Kiểm tra địa chỉ hợp lệ (ít nhất 5 ký tự)
    if (address.length < 5) {
      showPopup("warning", "Địa chỉ không hợp lệ!", "Vui lòng nhập địa chỉ chi tiết hơn.");
      return;
    }

    //  Kiểm tra email trùng
    if (userList.some((u) => u.email === email)) {
      showPopup("error", "Email đã tồn tại!", "Vui lòng dùng email khác.");
      return;
    }

    //  Kiểm tra tên đăng nhập trùng
    if (userList.some((u) => u.userName === username)) {
      showPopup("error", "Tên đăng nhập đã tồn tại!", "Vui lòng chọn tên khác.");
      return;
    }

    //  Kiểm tra mật khẩu khớp
    if (password !== confirmPassword) {
      showPopup("error", "Mật khẩu không khớp!", "Vui lòng nhập lại.");
      return;
    }

    // Lưu thông tin user vào localStorage
    const newUser = {
      userName: username,
      email: email,
      password: password,
      address: address,
      isLoggedIn: false,
    };

    userList.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userList));

    //  Hiển thị thông báo thành công và chuyển hướng
    showPopup("success", "Đăng ký thành công!", "Chuyển hướng đến trang đăng nhập...", () => {
      window.location.href = "DangNhap.html";
    });

    form.reset();
  });
});
