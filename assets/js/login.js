document.addEventListener("DOMContentLoaded", () => {
    const formDangNhap = document.getElementById("login-form");
    if (!formDangNhap) return;

    const inputTaiKhoan = document.getElementById("input-identifier-login");
    const inputMatKhau = document.getElementById("password-login");

    // Hiển thị popup
    const hienThiPopup = (icon, tieuDe, noiDung, callback = null) => {
        Swal.fire({
            icon,
            title: tieuDe,
            text: noiDung,
            showConfirmButton: false,
            timer: 900,
            timerProgressBar: true,
            didClose: () => { if (callback) callback(); },
        });
    };

    // Hiển thị / xóa lỗi
    const hienThiLoi = (input, thongBao) => {
        const errEl = input.parentElement.querySelector(".error-message");
        if (errEl) {
            errEl.textContent = thongBao;
            errEl.style.display = thongBao ? "block" : "none";
        }
        input.classList.toggle("input-error", !!thongBao);
        input.classList.toggle("input-success", !thongBao);
    };

    // Xác thực người dùng
    const xacThucUser = (taiKhoan, matKhau) => {
        const danhSach = [
            ...(JSON.parse(localStorage.getItem("userList")) || []),
            ...(JSON.parse(localStorage.getItem("customers")) || [])
        ];
        return danhSach.find(u => (u.email === taiKhoan || u.userName === taiKhoan) && u.password === matKhau) || null;
    };

    // Xử lý submit form
    formDangNhap.addEventListener("submit", e => {
        e.preventDefault();
        hienThiLoi(inputTaiKhoan, "");
        hienThiLoi(inputMatKhau, "");

        const taiKhoan = inputTaiKhoan.value.trim();
        const matKhau = inputMatKhau.value;

        if (!taiKhoan) { hienThiLoi(inputTaiKhoan, "Vui lòng nhập tên đăng nhập hoặc email."); return; }
        if (!matKhau) { hienThiLoi(inputMatKhau, "Vui lòng nhập mật khẩu."); return; }

        const user = xacThucUser(taiKhoan, matKhau);

        if (user) {
            const biKhoa = user.locked === true || user.status === 'blocked';
            if (biKhoa) {
                hienThiPopup('warning', 'Tài khoản bị khóa', 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị.');
                return;
            }

            const currentUser = {
                ...user,
                avatar: user.avatar || "./assets/img/Avatar/avtuser.jpg",
                addresses: user.addresses || [],
                address: user.address || "",
                phone: user.phone || ""
            };

            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            hienThiPopup("success", "Đăng nhập thành công!", `Chào mừng ${user.userName}`, () => {
                if (typeof window.updateHeaderUI === "function") window.updateHeaderUI();
                if (typeof window.navigateTo === "function") window.navigateTo("home");
            });

            formDangNhap.reset();
        } else {
            const msg = "Tên đăng nhập/Email hoặc mật khẩu không đúng.";
            hienThiLoi(inputTaiKhoan, msg);
            hienThiLoi(inputMatKhau, msg);
            hienThiPopup("error", "Đăng nhập thất bại!", "Vui lòng kiểm tra lại thông tin.");
        }
    });

    // Xóa lỗi khi nhập
    inputTaiKhoan.addEventListener("input", () => hienThiLoi(inputTaiKhoan, ""));
    inputMatKhau.addEventListener("input", () => hienThiLoi(inputMatKhau, ""));
});
