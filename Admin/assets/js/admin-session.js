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

    // Hiển thị thông báo yêu cầu đăng nhập
    showLoginRequired() {
        const notification = document.createElement('div');
        notification.className = 'login-required-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 12l2 2 4-4"></path>
                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                        <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path>
                        <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path>
                    </svg>
                </div>
                <h2>Yêu cầu đăng nhập</h2>
                <p>Bạn cần đăng nhập để truy cập chức năng này.</p>
                <div class="notification-actions">
                    <button onclick="window.location.href='DangNhap_Admin.html'" class="btn-login">Đăng nhập</button>
                    <button onclick="window.location.href='TrangChu_Admin.html'" class="btn-cancel">Về trang chủ</button>
                </div>
            </div>
        `;

        // Thêm CSS cho notification
        const style = document.createElement('style');
        style.textContent = `
            .login-required-notification {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }

            .notification-content {
                background: white;
                padding: 40px;
                border-radius: 12px;
                text-align: center;
                max-width: 400px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                animation: slideIn 0.3s ease;
            }

            .notification-icon {
                color: #ff6b6b;
                margin-bottom: 20px;
            }

            .notification-content h2 {
                color: #333;
                margin-bottom: 15px;
                font-size: 24px;
            }

            .notification-content p {
                color: #666;
                margin-bottom: 30px;
                font-size: 16px;
            }

            .notification-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
            }

            .btn-login, .btn-cancel {
                padding: 12px 24px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.3s ease;
            }

            .btn-login {
                background: #007bff;
                color: white;
            }

            .btn-login:hover {
                background: #0056b3;
                transform: translateY(-2px);
            }

            .btn-cancel {
                background: #6c757d;
                color: white;
            }

            .btn-cancel:hover {
                background: #545b62;
                transform: translateY(-2px);
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideIn {
                from { 
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(notification);
    }
}

// Tạo instance global
const adminSession = new AdminSession();

// Auto-check session khi trang load
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra nếu đang ở trang đăng nhập thì không cần kiểm tra session
    if (window.location.pathname.includes('DangNhap_Admin.html')) {
        return;
    }

    // Kiểm tra session cho tất cả các trang admin khác
    if (!adminSession.isLoggedIn()) {
        adminSession.showLoginRequired();
    }
});

// Export để sử dụng trong các file khác
window.AdminSession = AdminSession;
window.adminSession = adminSession;