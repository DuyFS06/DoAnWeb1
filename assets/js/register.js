document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");
    if (!form) return;

    const usernameInput = document.getElementById("username-register");
    const emailInput = document.getElementById("email-register");
    const phoneInput = document.getElementById("phone-register");
    const passwordInput = document.getElementById("password-register");
    const confirmInput = document.getElementById("confirmPassword-register");
    const addressInput = document.getElementById("address-register");
    const ruleLength = document.getElementById("rule-length");
    const passwordRules = document.getElementById("password-rules");

    const errorSpans = {
        username: document.getElementById("username-error"),
        email: document.getElementById("email-error"),
        phone: document.getElementById("phone-error"),
        password: document.getElementById("password-error"),
        confirmPassword: document.getElementById("confirmPassword-error"),
        address: document.getElementById("address-error"),
    };

    // map id input -> key in errorSpans
    const idMap = {
        "username-register": "username",
        "email-register": "email",
        "phone-register": "phone",
        "password-register": "password",
        "confirmPassword-register": "confirmPassword",
        "address-register": "address"
    };

    let userList = JSON.parse(localStorage.getItem("userList")) || [];

    const showPopup = (icon, title, text, callback = null) => {
        Swal.fire({
            icon,
            title,
            text,
            showConfirmButton: false,
            timer: 900,
            timerProgressBar: true,
            didClose: () => { if (callback) callback(); }
        });
    };

    const displayError = (inputElement, errorSpan, message) => {
        if (!inputElement || !errorSpan) return;
        inputElement.classList.add("input-error");
        inputElement.classList.remove("input-success");
        errorSpan.textContent = message;
        errorSpan.style.display = "block";
        if (errorSpan === errorSpans.confirmPassword) errorSpan.style.color = "";
    };

    const clearError = (inputElement, errorSpan) => {
        if (!inputElement || !errorSpan) return;
        inputElement.classList.remove("input-error");
        inputElement.classList.add("input-success");
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
        errorSpan.style.color = "";
    };

    // validators
    const validateUsername = (username) => {
        if(userList.some((u) => u.username === username)) return "Tên đăng ký đã tồn tại!";
        if (!username) return "Tên đăng nhập không được để trống.";
        if (username.length < 3) return "Tên đăng nhập phải có ít nhất 3 ký tự.";
        if (userList.some((u) => u.userName === username)) return "Tên đăng nhập đã tồn tại!";
        return null;
    };

    const validateEmail = (email) => {
        if (!email) return "Email không được để trống.";
        if (userList.some((u) => u.email === email)) return "Email đã tồn tại!";
        return null;
    };
    const validatePhone = (phone) => {
    if (!phone) return "Số điện thoại không được để trống.";

    if (isNaN(phone)) return "Số điện thoại chỉ được chứa các chữ số.";

    if (!phone.startsWith("0") || phone.length !== 10)
        return "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.";

    if (userList.some(u => u.phone === phone)) return "Số điện thoại đã được đăng ký!";

    return null;
    };


    const validatePassword = (password) => {
        if (!password) return "Mật khẩu không được để trống.";
        if (password.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự.";
        return null;
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        if (!confirmPassword) return "Vui lòng nhập lại mật khẩu.";
        if (password !== confirmPassword) return "Mật khẩu nhập lại không khớp.";
        return null;
    };

    const validateAddress = (address) => {
        if (!address) return "Địa chỉ không được để trống.";
        if (address.length < 10) return "Vui lòng nhập địa chỉ chi tiết hơn (ít nhất 10 ký tự).";
        return null;
    };

    // blur validations
    emailInput && emailInput.addEventListener("blur", () => {
        const emailError = validateEmail(emailInput.value.trim());
        if (emailError) displayError(emailInput, errorSpans.email, emailError);
        else clearError(emailInput, errorSpans.email);
    });

    phoneInput && phoneInput.addEventListener("blur", () => {
        const phoneError = validatePhone(phoneInput.value.trim());
        if (phoneError) displayError(phoneInput, errorSpans.phone, phoneError);
        else clearError(phoneInput, errorSpans.phone);
    });

    // clear on focus 
    [usernameInput, emailInput, phoneInput, passwordInput, confirmInput, addressInput].forEach(input => {
        if (!input) return;
        input.addEventListener('focus', () => {
            const key = idMap[input.id];
            if (key && errorSpans[key]) clearError(input, errorSpans[key]);
        });
    });

    // submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        userList = JSON.parse(localStorage.getItem("userList")) || [];

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmInput.value.trim();
        const address = addressInput.value.trim();

        let isValid = true;

        const checks = [
            { value: username, validator: validateUsername, input: usernameInput, error: errorSpans.username },
            { value: email, validator: validateEmail, input: emailInput, error: errorSpans.email },
            { value: phone, validator: validatePhone, input: phoneInput, error: errorSpans.phone },
            { value: password, validator: validatePassword, input: passwordInput, error: errorSpans.password },
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

        if (!isValid) {
            showPopup("error", "Lỗi dữ liệu!", "Vui lòng kiểm tra lại các trường bị lỗi.");
            return;
        }

        const newUser = {
            userName: username,
            email,
            phone,
            password,
            address,
            isLoggedIn: false
        };

        userList.push(newUser);
        localStorage.setItem("userList", JSON.stringify(userList));

        showPopup("success", "Đăng ký thành công!", "Chuyển hướng đến đăng nhập...", () => {
            if (typeof window.navigateTo === 'function') window.navigateTo('login');
            else window.location.href = "#login";
        });

        form.reset();
        // ẩn và reset trạng thái password rules & confirm message
        if (passwordRules) passwordRules.style.display = "none";
        if (errorSpans.confirmPassword) {
            errorSpans.confirmPassword.style.color = "";
            errorSpans.confirmPassword.style.display = "none";
        }
        // reset success classes
        [usernameInput, emailInput, phoneInput, passwordInput, confirmInput, addressInput].forEach(i => {
            if (i) i.classList.remove("input-success", "input-error");
        });
    });

    // password live rules
    if (passwordInput && passwordRules) {
        passwordInput.addEventListener("input", () => {
            const password = passwordInput.value;
            if (password === "") {
                passwordRules.style.display = "none";
                return;
            }
            passwordRules.style.display = "block";
            const conditions = [
                { valid: password.length >= 8, element: ruleLength },
            ];
            conditions.forEach(({ valid, element }) => {
                if (!element) return;
                const text = element.textContent.replace("✅ ", "").replace("❌ ", "");
                element.textContent = (valid ? "✅ " : "❌ ") + text;
                element.classList.toggle("valid", valid);
            });
        });

        passwordInput.addEventListener("blur", () => {
            if (passwordInput.value.trim() === "") passwordRules.style.display = "none";
        });
    }

    // confirm input realtime
    if (confirmInput) {
        confirmInput.addEventListener("focus", () => {
            if (passwordInput.value.trim() === "") {
                displayError(confirmInput, errorSpans.confirmPassword, "Vui lòng nhập mật khẩu trước.");
                confirmInput.blur();
            }
        });

        confirmInput.addEventListener("input", () => {
            const password = passwordInput.value.trim();
            const confirmPassword = confirmInput.value.trim();
            if (password === "") return;
            if (confirmPassword === "") {
                errorSpans.confirmPassword.style.display = "none";
                confirmInput.classList.remove("input-error", "input-success");
                return;
            }
            if (password === confirmPassword) {
                errorSpans.confirmPassword.style.display = "block";
                errorSpans.confirmPassword.textContent = "✅ Mật khẩu khớp!";
                errorSpans.confirmPassword.style.color = "green";
                confirmInput.classList.remove("input-error");
                confirmInput.classList.add("input-success");
            } else {
                errorSpans.confirmPassword.style.display = "block";
                errorSpans.confirmPassword.textContent = "Mật khẩu nhập lại không khớp.";
                errorSpans.confirmPassword.style.color = "red";
                confirmInput.classList.add("input-error");
                confirmInput.classList.remove("input-success");
            }
        });
    }
});
