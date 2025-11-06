document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    if (!form) return;

    const identifierInput = document.getElementById("input-identifier-login");
    const passwordInput = document.getElementById("password-login");

    const showPopup = (icon, title, text, callback = null) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: false,
            timer: 900,
            timerProgressBar: true,
            didClose: () => { if (callback) callback(); },
        });
    };

    const showError = (input, msg) => {
        const errEl = input.parentElement.querySelector(".error-message");
        if (errEl) { errEl.textContent = msg;
            errEl.style.display = "block"; }
        input.classList.add("input-error");
        input.classList.remove("input-success");
    };

    const clearError = (input) => {
        const errEl = input.parentElement.querySelector(".error-message");
        if (errEl) { errEl.textContent = "";
            errEl.style.display = "none"; }
        input.classList.remove("input-error");
        input.classList.remove("input-success");
    };

    const authenticateUser = (identifier, password) => {
        const userList = JSON.parse(localStorage.getItem("userList")) || [];
        const matched = userList.find(u => (u.email === identifier || u.userName === identifier) && u.password === password) || null;
        if (!matched) {
            const legacy = JSON.parse(localStorage.getItem('customers')) || [];
            return legacy.find(u => (u.email === identifier || u.userName === identifier) && u.password === password) || null;
        }
        return matched;
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearError(identifierInput);
        clearError(passwordInput);

        const id = identifierInput.value.trim();
        const pwd = passwordInput.value;
        if (!id) { showError(identifierInput, "Vui lòng nhập tên đăng nhập hoặc email."); return; }
        if (!pwd) { showError(passwordInput, "Vui lòng nhập mật khẩu."); return; }

        const user = authenticateUser(id, pwd);
        if (user) {
            const isLocked = user.locked === true || user.status === 'blocked';
            if (isLocked) {
                showPopup('warning', 'Tài khoản bị khóa', 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị để mở khóa.');
                return;
            }
            // Lưu currentUser
            const currentUser = {
                userName: user.userName,
                email: user.email,
                password: user.password,
                avatar: user.avatar || "./assets/img/Avatar/avtuser.jpg",
                address: user.address || "",
                phone: user.phone || ""
            };
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            showPopup("success", "Đăng nhập thành công!", "Chào mừng " + user.userName, () => {
                // Cập nhật header ngay lập tức
                if (typeof window.updateHeaderUI === "function") window.updateHeaderUI();
                if (typeof window.navigateTo === "function") window.navigateTo("home");
            });

            form.reset();
        } else {
            const msg = "Tên đăng nhập/Email hoặc mật khẩu không đúng.";
            showError(identifierInput, msg);
            showError(passwordInput, msg);
            showPopup("error", "Đăng nhập thất bại!", "Vui lòng kiểm tra lại thông tin.");
        }
    });

    identifierInput.addEventListener("input", () => clearError(identifierInput));
    passwordInput.addEventListener("input", () => clearError(passwordInput));
});