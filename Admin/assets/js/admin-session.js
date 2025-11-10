// Admin Session Management
class AdminSession {
    constructor() {
        this.sessionKey = 'adminLoggedIn';
        this.usernameKey = 'adminUsername';
        this.loginTimeKey = 'loginTime';
        this.sessionTimeout = 24 * 60 * 60 * 1000; // 24 giờ
    }

    // Kiểm tra xem admin đã đăng nhập chưa
    isLoggedIn() {
        const loggedIn = sessionStorage.getItem(this.sessionKey);
        const loginTime = sessionStorage.getItem(this.loginTimeKey);

        if (!loggedIn || loggedIn !== 'true') {
            return false;
        }

        // Kiểm tra thời gian hết hạn session
        if (loginTime) {
            const loginDate = new Date(loginTime);
            const now = new Date();
            const timeDiff = now - loginDate;

            if (timeDiff > this.sessionTimeout) {
                this.logout();
                return false;
            }
        }

        return true;
    }

    // Lấy thông tin admin hiện tại
    getCurrentAdmin() {
        if (!this.isLoggedIn()) {
            return null;
        }

        return {
            username: sessionStorage.getItem(this.usernameKey),
            loginTime: sessionStorage.getItem(this.loginTimeKey)
        };
    }

    // Đăng xuất
    logout() {
        sessionStorage.removeItem(this.sessionKey);
        sessionStorage.removeItem(this.usernameKey);
        sessionStorage.removeItem(this.loginTimeKey);
    }

    // Chuyển hướng đến trang đăng nhập
    redirectToLogin() {
        window.location.href = 'DangNhap_Admin.html';
    }

    // Kiểm tra và chuyển hướng nếu chưa đăng nhập
    requireLogin() {
        if (!this.isLoggedIn()) {
            this.redirectToLogin();
            return false;
        }
        return true;
    }

    // Ẩn thông báo yêu cầu đăng nhập
    // (Removed notification UI methods: showLoginRequired / hideLoginRequired)
}

// Tạo instance global
const adminSession = new AdminSession();

// Auto-check session khi trang load
document.addEventListener('DOMContentLoaded', function() {
    // Nếu đang ở trang đăng nhập thì không cần kiểm tra session
    if (window.location.pathname.includes('DangNhap_Admin.html')) {
        return;
    }

    // Nếu chưa đăng nhập, chuyển hướng ngay tới trang đăng nhập.
    // Điều này ngăn truy cập trực tiếp vào TrangChu_Admin.html mà không đi qua DangNhap_Admin.html
    if (!adminSession.isLoggedIn()) {
        adminSession.redirectToLogin();
    }
});

// Export để sử dụng trong các file khác
window.AdminSession = AdminSession;
window.adminSession = adminSession;