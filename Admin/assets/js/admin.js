// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo dashboard
    initializeDashboard();

    // Cập nhật thông tin admin
    updateAdminInfo();

    // Khởi tạo các sự kiện
    initializeEvents();
});

// Khởi tạo dashboard
function initializeDashboard() {
    console.log('Admin Dashboard initialized');

    // Kiểm tra session
    if (typeof adminSession !== 'undefined' && adminSession.isLoggedIn()) {
        console.log('Admin is logged in');
    } else {
        console.log('Admin not logged in');
    }
}

// Cập nhật thông tin admin
function updateAdminInfo() {
    if (typeof adminSession !== 'undefined' && adminSession.isLoggedIn()) {
        const adminInfo = adminSession.getCurrentAdmin();
        if (adminInfo && adminInfo.username) {
            const adminNameElement = document.getElementById('adminName');
            if (adminNameElement) {
                adminNameElement.textContent = adminInfo.username;
            }
        }
    }
}

// Khởi tạo các sự kiện
function initializeEvents() {
    // Sự kiện cho sidebar
    initializeSidebar();

    // Sự kiện cho responsive
    initializeResponsive();

    // Sự kiện cho stats cards
    initializeStatsCards();
}

// Khởi tạo sidebar
function initializeSidebar() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Xóa active class từ tất cả nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });

            // Thêm active class cho nav item hiện tại
            this.closest('.nav-item').classList.add('active');
        });
    });
}

// Khởi tạo responsive
function initializeResponsive() {
    // Toggle sidebar trên mobile
    const sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    `;

    // Thêm CSS cho toggle button
    const style = document.createElement('style');
    style.textContent = `
        .sidebar-toggle {
            display: none;
            position: fixed;
            top: 15px;
            left: 15px;
            z-index: 1001;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 6px;
            padding: 8px;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
            .sidebar-toggle {
                display: block;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(sidebarToggle);

    sidebarToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.admin-sidebar');
        sidebar.classList.toggle('open');
    });

    // Đóng sidebar khi click bên ngoài
    document.addEventListener('click', function(e) {
        const sidebar = document.querySelector('.admin-sidebar');
        const toggle = document.querySelector('.sidebar-toggle');

        if (window.innerWidth <= 768 &&
            !sidebar.contains(e.target) &&
            !toggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
}

// Khởi tạo stats cards
function initializeStatsCards() {
    const statCards = document.querySelectorAll('.stat-card');

    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Hàm utility để format số
function formatNumber(num) {
    return new Intl.NumberFormat('vi-VN').format(num);
}

// Hàm utility để format tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Hàm utility để format ngày
function formatDate(date) {
    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Hàm hiển thị thông báo
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : type === 'warning' ? '⚠' : 'ℹ'}
            </div>
            <div class="notification-message">${message}</div>
        </div>
    `;

    // Thêm CSS cho notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 80px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
        }
        
        .notification-icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
        }
        
        .notification-success .notification-icon {
            background: #d4edda;
            color: #155724;
        }
        
        .notification-error .notification-icon {
            background: #f8d7da;
            color: #721c24;
        }
        
        .notification-warning .notification-icon {
            background: #fff3cd;
            color: #856404;
        }
        
        .notification-info .notification-icon {
            background: #d1ecf1;
            color: #0c5460;
        }
        
        .notification-message {
            flex: 1;
            font-size: 14px;
            color: #333;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;

    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Tự động ẩn sau 5 giây
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Hàm loading
function showLoading(element) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }

    if (element) {
        element.style.position = 'relative';
        element.style.pointerEvents = 'none';

        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <div class="loading-text">Đang tải...</div>
            </div>
        `;

        // Thêm CSS cho loading
        const style = document.createElement('style');
        style.textContent = `
            .loading-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            
            .loading-spinner {
                text-align: center;
            }
            
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #667eea;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 10px;
            }
            
            .loading-text {
                color: #666;
                font-size: 14px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;

        if (!document.querySelector('style[data-loading]')) {
            style.setAttribute('data-loading', 'true');
            document.head.appendChild(style);
        }

        element.appendChild(loader);
    }
}

function hideLoading(element) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }

    if (element) {
        const loader = element.querySelector('.loading-overlay');
        if (loader) {
            loader.remove();
        }
        element.style.pointerEvents = 'auto';
    }
}

// Export functions để sử dụng trong các file khác
window.AdminDashboard = {
    showNotification,
    showLoading,
    hideLoading,
    formatNumber,
    formatCurrency,
    formatDate
};