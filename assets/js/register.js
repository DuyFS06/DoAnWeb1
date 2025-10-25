document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirmPassword");
    const addressInput = document.getElementById("address");
    const ruleLength = document.getElementById("rule-length");
    const ruleLower = document.getElementById("rule-lower");
    const ruleUpper = document.getElementById("rule-upper");
    const ruleNumber = document.getElementById("rule-number");
    const passwordRules = document.getElementById("password-rules");


    // Lấy tất cả các thẻ span hiển thị lỗi
    const errorSpans = {
        username: document.getElementById("username-error"),
        email: document.getElementById("email-error"),
        password: document.getElementById("password-error"),
        confirmPassword: document.getElementById("confirmPassword-error"),
        address: document.getElementById("address-error"),
    };

        const defaultUsers = [
    {
        userName: "admin",
        email: "admin@example.com",
        password: "Admin123",
        address: "Hà Nội",
        isLoggedIn: false,
    },
    {
        userName: "demo",
        email: "demo@example.com",
        password: "Demo1234",
        address: "TP. Hồ Chí Minh",
        isLoggedIn: false,
    },
    {
        userName: "john",
        email: "john@example.com",
        password: "John1234",
        address: "Đà Nẵng",
        isLoggedIn: false,
    },
    ];

    let userList = JSON.parse(localStorage.getItem("userList")) || [];

    // Thêm các user mặc định nếu chưa có
    defaultUsers.forEach((du) => {
    const exists = userList.some(
        (u) => u.email.toLowerCase() === du.email.toLowerCase()
    );
    if (!exists) {
        userList.push(du);
    }
    });

    // Lưu lại
    localStorage.setItem("userList", JSON.stringify(userList));
    
    // Hàm hiển thị pop-up SweetAlert2
    const showPopup = (icon, title, text, callback = null) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: false,
            timer: 1000, 
            timerProgressBar: true,
            didClose: () => {
                if (callback) callback();
            },
        });
    };

    // Hàm hiển thị lỗi dưới trường input
    const displayError = (inputElement, errorSpan, message) => {
        inputElement.classList.add("input-error"); 
        inputElement.classList.remove("input-success"); 
        errorSpan.textContent = message;
        errorSpan.style.display = "block";
    };

    // Hàm xóa lỗi
    const clearError = (inputElement, errorSpan) => {
        inputElement.classList.remove("input-error");
        inputElement.classList.add("input-success");
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
    };

    // --- Hàm Kiểm tra  ---

    // Kiểm tra tên đăng nhập (độ dài, trùng lặp)
    const validateUsername = (username) => {
        if (!username) return "Tên đăng nhập không được để trống.";
        if (username.length < 3) return "Tên đăng nhập phải có ít nhất 3 ký tự.";
        if (userList.some((u) => u.userName === username)) return "Tên đăng nhập đã tồn tại!";
        return null;
    };

    // Kiểm tra email (định dạng, trùng lặp)
    const validateEmail = (email) => {
        if (!email) return "Email không được để trống.";
        // Regex kiểm tra định dạng email cơ bản
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!emailRegex.test(email)) return "Định dạng email không hợp lệ.";
        if (userList.some((u) => u.email === email)) return "Email đã tồn tại!";
        return null;
    };

    // Kiểm tra mật khẩu (độ mạnh) - Bỏ phần này thay bằng ở dưới
    const validatePassword = (password) => {
        if (!password) return "Mật khẩu không được để trống.";
        if (password.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự.";
        // Kiểm tra độ mạnh: Cần có chữ hoa, chữ thường và số
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!strongRegex.test(password)) return "Mật khẩu phải chứa chữ hoa, chữ thường và số.";
        return null;
    };

    // Kiểm tra nhập lại mật khẩu
    const validateConfirmPassword = (password, confirmPassword) => {
        if (!confirmPassword) return "Vui lòng nhập lại mật khẩu.";
        if (password !== confirmPassword) return "Mật khẩu nhập lại không khớp.";
        return null;
    };
    
    // Kiểm tra địa chỉ
    const validateAddress = (address) => {
        if (!address) return "Địa chỉ không được để trống.";
        if (address.length < 10) return "Vui lòng nhập địa chỉ chi tiết hơn (ít nhất 10 ký tự).";
        return null;
    };
    // -- (Event Listeners) --

    // Kiểm tra email ngay khi người dùng rời khỏi ô nhập
    emailInput.addEventListener("blur", () => {
        const emailError = validateEmail(emailInput.value.trim());
        if (emailError) {
            displayError(emailInput, errorSpans.email, emailError);
        } else {
            clearError(emailInput, errorSpans.email);
        }
    });
    
    // Xóa lỗi khi người dùng bắt đầu nhập (focus)
    [usernameInput, emailInput, passwordInput, confirmInput, addressInput].forEach(input => {
        input.addEventListener('focus', () => {
            const id = input.id;
            if (errorSpans[id]) {
                 clearError(input, errorSpans[id]);
            }
        });
    });


    // Xử lý khi nhấn nút Đăng ký
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        userList = JSON.parse(localStorage.getItem("userList")) || [];

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmInput.value.trim();
        const address = addressInput.value.trim();

        // Chạy tất cả các kiểm tra
        let isValid = true;

        const checks = [
            { value: username, validator: validateUsername, input: usernameInput, error: errorSpans.username },
            { value: email, validator: validateEmail, input: emailInput, error: errorSpans.email },
            { value: password, validator: validatePassword, input: passwordInput, error: errorSpans.password },
            // Kiểm tra Confirm Password cần truyền cả password gốc
            { value: confirmPassword, validator: (v) => validateConfirmPassword(password, v), input: confirmInput, error: errorSpans.confirmPassword },
            { value: address, validator: validateAddress, input: addressInput, error: errorSpans.address },
        ];

        checks.forEach(check => {
            const message = check.validator(check.value);
            if (message) {
                displayError(check.input, check.error, message);
                isValid = false;
            } else {
                clearError(check.input, check.error);
            }
        });

        // Nếu có lỗi, dừng lại
        if (!isValid) {
            showPopup("error", "Lỗi dữ liệu!", "Vui lòng kiểm tra lại các trường bị lỗi.");
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

        // Hiển thị thông báo và chuyển hướng
        showPopup("success", "Đăng ký thành công!", "Chuyển hướng đến đăng nhập...", () => {
            window.location.href = "DangNhap.html";
        });
        
        form.reset(); // Xóa form sau khi đăng ký thành công
    });

    //Xử lý hiện thông báo yêu cầu của mật khẩu đăng nhập
    // Khi nhập mật khẩu
    passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;

    // Nếu chưa nhập gì → ẩn danh sách
    if (password === "") {
        passwordRules.style.display = "none";
        return;
    }

    // Hiện danh sách nếu người dùng bắt đầu nhập
    passwordRules.style.display = "block";

    const conditions = [
        { valid: password.length >= 8, element: ruleLength },
        { valid: /[a-z]/.test(password), element: ruleLower },
        { valid: /[A-Z]/.test(password), element: ruleUpper },
        { valid: /[0-9]/.test(password), element: ruleNumber },
    ];

    conditions.forEach(({ valid, element }) => {
        const text = element.textContent.replace("✅ ", "").replace("❌ ", "");
        element.textContent = (valid ? "✅ " : "❌ ") + text;
        element.classList.toggle("valid", valid);
    });
    });

    // Khi rời khỏi ô, nếu chưa nhập gì thì ẩn luôn
    passwordInput.addEventListener("blur", () => {
    if (passwordInput.value.trim() === "") {
        passwordRules.style.display = "none";
    }
    });
    
    // Ngăn không cho nhập Confirm nếu mật khẩu trống
    confirmInput.addEventListener("focus", () => {
    if (passwordInput.value.trim() === "") {
        displayError(confirmInput, errorSpans.confirmPassword, "Vui lòng nhập mật khẩu trước.");
        confirmInput.blur(); // tự động rời khỏi ô
    }
    });

    // Kiểm tra khớp mật khẩu khi người dùng nhập lại
    confirmInput.addEventListener("input", () => {
    const password = passwordInput.value.trim();
    const confirmPassword = confirmInput.value.trim();

    // Nếu mật khẩu chính chưa có thì không kiểm tra gì
    if (password === "") return;

    if (confirmPassword === "") {
        errorSpans.confirmPassword.style.display = "none";
        confirmInput.classList.remove("input-error", "input-success");
        return;
    }

    // Nếu khớp
    if (password === confirmPassword) {
        errorSpans.confirmPassword.style.display = "block";
        errorSpans.confirmPassword.textContent = "✅ Mật khẩu khớp!";
        errorSpans.confirmPassword.style.color = "green";
        confirmInput.classList.remove("input-error");
        confirmInput.classList.add("input-success");
    } else {
        // Không khớp
        errorSpans.confirmPassword.style.display = "block";
        errorSpans.confirmPassword.textContent = "Mật khẩu nhập lại không khớp.";
        errorSpans.confirmPassword.style.color = "red";
        confirmInput.classList.add("input-error");
        confirmInput.classList.remove("input-success");
    }
    });
});