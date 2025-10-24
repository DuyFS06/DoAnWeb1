document.addEventListener("DOMContentLoaded", () => {
    // Lấy form đăng nhập từ DOM
    const form = document.getElementById("login-form");

    // Lấy các trường input. ID đã được thay đổi trong HTML
    const identifierInput = document.getElementById("input-identifier"); 
    const passwordInput = document.getElementById("password");
    

    /**
     * Hàm hiển thị popup SweetAlert2. (Giống DangKy.js)
     */
    const showPopup = (icon, title, text, callback = null) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: false,
            timer: 1200, 
            timerProgressBar: true,
            didClose: () => {
                if (callback) callback();
            },
        });
    };
    

    /**
     * Hiển thị thông báo lỗi ngay dưới trường input.
     */
    const showError = (input, message) => {
        const errorEl = input.parentElement.querySelector(".error-message"); 
        
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = "block";
        }
        input.classList.add("input-error"); 
        input.classList.remove("input-success");
    };

    /**
     * Xóa thông báo lỗi và đặt lại viền input.
     */
    const clearError = (input) => {
        const errorEl = input.parentElement.querySelector(".error-message");
        if (errorEl) {
             errorEl.textContent = "";
             errorEl.style.display = "none";
        }
        // Xóa class lỗi
        input.classList.remove("input-error"); 
        input.classList.remove("input-success");
    };

    /**
     * Kiểm tra xem người dùng có tồn tại và mật khẩu có khớp không.
     */
    const authenticateUser = (inputIdentifier, password) => {
        const userList = JSON.parse(localStorage.getItem("userList")) || [];
        
        // Tìm người dùng theo email HOẶC username
        const user = userList.find(
            (u) => u.email === inputIdentifier || u.userName === inputIdentifier
        );

        if (user && user.password === password) {
            return user; // Đăng nhập thành công
        }
        return null; // Thất bại
    };

    // --- EVENT LISTENERS ---

    // 1. Xử lý sự kiện gửi form
    form.addEventListener("submit", (e) => {
        e.preventDefault(); 

        // Xóa tất cả lỗi cũ
        clearError(identifierInput);
        clearError(passwordInput);

        const emailOrUsername = identifierInput.value.trim();
        const password = passwordInput.value;
        let isValid = true;

        // Validation cơ bản
        if (emailOrUsername === "") {
            showError(identifierInput, "Vui lòng nhập tên đăng nhập hoặc email.");
            isValid = false;
        }

        if (password === "") {
            showError(passwordInput, "Vui lòng nhập mật khẩu.");
            isValid = false;
        }

        if (!isValid) return;

        // 2. Xác thực người dùng
        const user = authenticateUser(emailOrUsername, password);

        if (user) {
            // Giả lập lưu trạng thái đăng nhập
            sessionStorage.setItem("loggedInUser", JSON.stringify({
                userName: user.userName,
                email: user.email,
            }));

            // BÁO CÁO THÀNH CÔNG bằng SweetAlert2
            showPopup("success", "Đăng nhập thành công!", "Chào mừng " + user.userName + "...", () => {
                // Chuyển hướng sau khi pop-up đóng(sang trang chủ)
                window.location.href = form.action; 
            });
            
            form.reset(); 
        } else {
            // Hiển thị lỗi chung cho cả 2 trường
            const errorMessage = "Tên đăng nhập/Email hoặc mật khẩu không đúng.";
            showError(identifierInput, errorMessage);
            showError(passwordInput, errorMessage);

            showPopup("error", "Đăng nhập thất bại!", "Vui lòng kiểm tra lại thông tin.");
        }
    });

    // 2. Xóa lỗi khi người dùng bắt đầu nhập lại
    identifierInput.addEventListener("input", () => clearError(identifierInput));
    passwordInput.addEventListener("input", () => clearError(passwordInput));
});