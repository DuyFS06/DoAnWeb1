document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("change-password-form");
    const oldPassInput = document.getElementById("old-password");
    const newPassInput = document.getElementById("new-password");
    const confirmPassInput = document.getElementById("confirm-password");
    
    // ĐƯỜNG DẪN TƯƠNG ĐỐI
    const LOGIN_PAGE_PATH = "../../DangNhap.html"; 
    const PROFILE_PAGE_PATH = "ThongTinCaNhan.html"; 

    // Cần tải SweetAlert2 trong HTML
    if (typeof Swal === 'undefined') {
         console.error("SweetAlert2 library not loaded. Please include the script tag.");
         const alertFallback = (title, text) => alert(title + '\n' + text);
         var Swal = { fire: (options) => alertFallback(options.title, options.text || '') };
    }

    // 1. KIỂM TRA TRẠNG THÁI VÀ TẢI DỮ LIỆU USER
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        // Chuyển hướng nếu chưa đăng nhập
        window.location.href = LOGIN_PAGE_PATH; 
        return;
    }
    
    let userList = JSON.parse(localStorage.getItem("userList")) || [];
    const detailedUser = userList.find(u => u.userName === loggedInUser.userName || u.email === loggedInUser.email);

    if (!detailedUser) {
        Swal.fire('Lỗi', 'Không tìm thấy thông tin tài khoản. Vui lòng đăng nhập lại.', 'error');
        return;
    }

    // --- Các hàm tiện ích ---

    const showPopup = (icon, title, text, callback = null) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: false,
            timer: 1500, 
            timerProgressBar: true,
            didClose: () => {
                if (callback) callback();
            },
        });
    };

    const showError = (inputElement, message) => {
        const errorSpan = document.getElementById(inputElement.id + "-error");
        inputElement.classList.add("input-error");
        inputElement.classList.remove("input-success");
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.display = "block";
        }
    };

    const clearError = (inputElement) => {
        const errorSpan = document.getElementById(inputElement.id + "-error");
        inputElement.classList.remove("input-error");
        inputElement.classList.remove("input-success");
        if (errorSpan) {
            errorSpan.textContent = "";
            errorSpan.style.display = "none";
        }
    };

    // --- LOGIC XỬ LÝ FORM ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const oldPass = oldPassInput.value;
        const newPass = newPassInput.value;
        const confirmPass = confirmPassInput.value;
        let isValid = true;
        
        // Xóa lỗi cũ
        [oldPassInput, newPassInput, confirmPassInput].forEach(clearError);

        // 1. Kiểm tra Mật khẩu cũ
        if (oldPass !== detailedUser.password) {
            showError(oldPassInput, "Mật khẩu cũ không đúng.");
            isValid = false;
        }

        // 2. Kiểm tra Mật khẩu mới
        if (newPass.length < 8) {
            showError(newPassInput, "Mật khẩu phải có ít nhất 8 ký tự.");
            isValid = false;
        }
        
        // Kiểm tra độ mạnh: Cần có chữ hoa, chữ thường và số
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!strongRegex.test(newPass)) {
            showError(newPassInput, "Mật khẩu phải chứa chữ hoa, chữ thường và số.");
            isValid = false;
        }

        // 3. Kiểm tra Xác nhận mật khẩu
        if (newPass !== confirmPass) {
            showError(confirmPassInput, "Mật khẩu mới và xác nhận không khớp.");
            isValid = false;
        }
        
        // 4. Kiểm tra Mật khẩu mới có trùng với mật khẩu cũ không (Chỉ kiểm tra nếu mật khẩu cũ đúng)
        if (oldPass === detailedUser.password && newPass === oldPass) {
             showError(newPassInput, "Mật khẩu mới không được trùng với mật khẩu cũ.");
             isValid = false;
        }


        if (!isValid) {
             showPopup("error", "Lỗi dữ liệu!", "Vui lòng kiểm tra lại các trường bị lỗi.");
             return;
        }

        // 5. CẬP NHẬT MẬT KHẨU
        const updatedUserList = userList.map(u => {
            if (u.userName === detailedUser.userName) {
                // Cập nhật mật khẩu
                return { ...u, password: newPass };
            }
            return u;
        });

        // Lưu lại userList mới vào localStorage
        localStorage.setItem("userList", JSON.stringify(updatedUserList));

        // Cập nhật mật khẩu trong detailedUser để không cần tải lại trang
        detailedUser.password = newPass;

        // Thông báo thành công và chuyển hướng
        showPopup("success", "Thành công!", "Mật khẩu của bạn đã được thay đổi.", () => {
            // Chuyển hướng về trang tài khoản (ThongTinCaNhan.html)
            window.location.href = PROFILE_PAGE_PATH; 
        });
        
        form.reset();
    });
});