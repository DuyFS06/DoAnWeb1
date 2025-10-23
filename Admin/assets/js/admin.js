// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo dashboard
    initializeDashboard();

    // Cập nhật thông tin admin
    updateAdminInfo();

    // Khởi tạo các sự kiện
    initializeEvents();

    // Khôi phục tab từ localStorage hoặc URL params
    restoreCurrentTab();
});

// Khôi phục tab hiện tại
async function restoreCurrentTab() {
    // Thử lấy tab từ URL params
    const urlParams = new URLSearchParams(window.location.search);
    const urlTab = urlParams.get('tab');

    // Hoặc từ localStorage
    const savedTab = localStorage.getItem('adminCurrentTab');

    // Ưu tiên tab trong URL, sau đó là savedTab
    const tabToRestore = urlTab || savedTab || 'dashboard';

    // Tìm link tương ứng với tab
    const targetLink = document.querySelector(`.nav-link[data-tab="${tabToRestore}"]`);
    if (targetLink) {
        const pagePath = targetLink.getAttribute('data-page');
        if (pagePath) {
            console.debug('Restoring tab:', tabToRestore);
            await changeTab(tabToRestore, pagePath);
        }
    }
}

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

// State quản lý tab hiện tại
let currentTab = 'dashboard';

// Khởi tạo sidebar
function initializeSidebar() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();

            // Lấy thông tin tab và page
            const newTab = this.getAttribute('data-tab');
            const pagePath = this.getAttribute('data-page');

            if (pagePath) {
                await changeTab(newTab, pagePath);
            }
        });
    });
}

// Hàm xử lý chuyển tab
async function changeTab(newTab, pagePath) {
    console.debug('Changing tab:', currentTab, '->', newTab);

    try {
        // Cập nhật UI trước khi load content
        updateTabUI(newTab);

        // Load content mới
        if (pagePath) {
            await loadContent(pagePath);

            // Cập nhật state sau khi load thành công
            currentTab = newTab;

            // Lưu tab hiện tại vào localStorage
            localStorage.setItem('adminCurrentTab', newTab);

            // Update URL mà không reload page
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('tab', newTab);
            window.history.pushState({ tab: newTab }, '', newUrl);
        }
    } catch (error) {
        console.error('Error changing tab:', error);
        showNotification('Không thể chuyển tab: ' + error.message, 'error');
    }
}

// Hàm cập nhật UI khi chuyển tab
function updateTabUI(newTab) {
    // Xóa active class từ tất cả nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Thêm active class cho tab mới
    const newNavItem = document.querySelector(`.nav-link[data-tab="${newTab}"]`);
    if (newNavItem) {
        newNavItem.closest('.nav-item').classList.add('active');
    }

    // Cập nhật tiêu đề trang nếu cần
    updatePageTitle(newTab);
}

// Hàm cập nhật tiêu đề trang
function updatePageTitle(tab) {
    const titles = {
        'dashboard': 'Dashboard - Admin',
        'customers': 'Quản lý khách hàng - Admin',
        'categories': 'Quản lý loại sản phẩm - Admin',
        'products': 'Quản lý sản phẩm - Admin',
        'orders': 'Quản lý đơn hàng - Admin',
        'inventory': 'Quản lý tồn kho - Admin',
        'pricing': 'Quản lý giá bán - Admin',
        'reports': 'Báo cáo doanh thu - Admin'
    };

    document.title = titles[tab] || 'Admin Dashboard';
}

// Hàm load nội dung vào container
async function loadContent(pagePath) {
    try {
        // Hiển thị loading
        const contentContainer = document.getElementById('content-container');
        showLoading(contentContainer);

        // Debug log
        console.debug('Loading content:', pagePath);

        if (pagePath === 'dashboard') {
            // Lấy nội dung gốc từ biến global
            contentContainer.innerHTML = window.originalDashboardContent ||
                document.querySelector('main.admin-main').innerHTML;
            hideLoading(contentContainer);

            // Thêm lại event listeners cho quick action cards
            document.querySelectorAll('.action-card').forEach(card => {
                card.addEventListener('click', async(e) => {
                    e.preventDefault();
                    const page = card.getAttribute('data-page');
                    if (page) {
                        await changeTab(page);
                    }
                });
            });
            return;
        }

        // Load script tương ứng với trang
        const scripts = getPageScripts(pagePath);
        if (scripts.length > 0) {
            console.debug('Loading page scripts:', scripts);
            await Promise.all(scripts.map(src => ensureScriptLoaded(src)));
        }

        // Tải nội dung HTML tương ứng
        switch (pagePath) {
            case 'QuanLyKhachHang.html':
                await loadCustomersContent(contentContainer);
                break;
            case 'QuanLyLoaiSanPham.html':
                await loadCategoriesContent(contentContainer);
                break;
                // Thêm các case khác tương ứng với từng trang
            default:
                throw new Error('Không tìm thấy nội dung cho trang này');
        }

        // Ẩn loading và hiển thị thông báo
        hideLoading(contentContainer);
        showNotification('Tải trang thành công', 'success');

    } catch (error) {
        console.error('Error loading content:', error);
        showNotification('Có lỗi khi tải trang: ' + error.message, 'error');
        hideLoading(document.getElementById('content-container'));
    }
}

// Lấy danh sách script cần load cho mỗi trang
function getPageScripts(pagePath) {
    const scripts = [];
    switch (pagePath) {
        case 'QuanLyKhachHang.html':
            scripts.push('assets/js/quanlynguoidung.js');
            break;
        case 'QuanLyLoaiSanPham.html':
            scripts.push('assets/js/quanlyloaisanpham.js');
            break;
            // Thêm các case khác cho từng trang
    }
    return scripts;
}

// Load script nếu chưa được load
function ensureScriptLoaded(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve(); // Script đã load rồi
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    // Lưu nội dung dashboard gốc vào biến global
    window.originalDashboardContent = document.querySelector('main.admin-main').innerHTML;
    console.log('Saved original dashboard content');

    // Thêm event listener cho các link trong sidebar
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page) {
                console.log('Nav link clicked:', page);
                await changeTab(page);
            }
        });
    });

    // Khôi phục tab từ URL nếu có
    const params = new URLSearchParams(window.location.search);
    const currentTab = params.get('tab') || 'dashboard';
    console.log('Initial tab:', currentTab);
    changeTab(currentTab);
});

// Hàm chuyển tab
async function changeTab(page) {
    // Cập nhật URL
    const url = new URL(window.location.href);
    url.searchParams.set('tab', page);
    window.history.pushState({}, '', url);

    // Cập nhật active state trong sidebar
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.page === page) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });

    // Load nội dung
    await loadContent(page);
}

// Load nội dung trang Quản lý khách hàng
container.innerHTML = `
        <div class="page-header">
            <h1>Bảng điều khiển</h1>
            <p>Xem tổng quan về hoạt động của cửa hàng</p>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon orders">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                </div>
                <div class="stat-data">
                    <h3>Đơn hàng hôm nay</h3>
                    <p class="stat-number">25</p>
                    <span class="stat-change positive">+12.5%</span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon revenue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                </div>
                <div class="stat-data">
                    <h3>Doanh thu hôm nay</h3>
                    <p class="stat-number">12.5M</p>
                    <span class="stat-change positive">+8.3%</span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon users">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div class="stat-data">
                    <h3>Khách hàng mới</h3>
                    <p class="stat-number">48</p>
                    <span class="stat-change positive">+22.4%</span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon products">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                </div>
                <div class="stat-data">
                    <h3>Sản phẩm</h3>
                    <p class="stat-number">857</p>
                    <span class="stat-change">+5 mới</span>
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="charts-row">
            <div class="chart-container">
                <h3>Doanh thu theo tháng</h3>
                <div id="revenueChart">
                    <!-- Chart sẽ được load bằng JavaScript -->
                </div>
            </div>
            <div class="chart-container">
                <h3>Top sản phẩm bán chạy</h3>
                <div id="productsChart">
                    <!-- Chart sẽ được load bằng JavaScript -->
                </div>
            </div>
        </div>

        <!-- Recent Orders Table -->
        <div class="recent-orders">
            <h3>Đơn hàng gần đây</h3>
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Khách hàng</th>
                            <th>Sản phẩm</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#ORD001</td>
                            <td>Nguyễn Văn A</td>
                            <td>iPhone 13 Pro</td>
                            <td>25,990,000đ</td>
                            <td><span class="status success">Đã giao</span></td>
                            <td>2 giờ trước</td>
                        </tr>
                        <tr>
                            <td>#ORD002</td>
                            <td>Trần Thị B</td>
                            <td>Samsung S21</td>
                            <td>18,890,000đ</td>
                            <td><span class="status pending">Đang giao</span></td>
                            <td>3 giờ trước</td>
                        </tr>
                        <tr>
                            <td>#ORD003</td>
                            <td>Lê Văn C</td>
                            <td>Macbook Air M1</td>
                            <td>28,990,000đ</td>
                            <td><span class="status processing">Đang xử lý</span></td>
                            <td>5 giờ trước</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

// TODO: Initialize charts here if needed
// initCharts();


// Load nội dung trang Quản lý khách hàng
async function loadCustomersContent(container) {
    container.innerHTML = `
        <div class="page-header">
            <h1>Quản lý khách hàng</h1>
            <p>Quản lý tài khoản khách hàng, reset mật khẩu và khóa/mở khóa tài khoản</p>
        </div>

        <!-- Action Bar -->
        <div class="action-bar">
            <div class="action-left">
                <button class="btn btn-secondary" onclick="exportCustomers()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7,10 12,15 17,10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Xuất Excel
                </button>
            </div>
            <div class="action-right">
                <div class="search-box">
                    <input type="text" placeholder="Tìm kiếm khách hàng..." id="searchInput">
                    <button onclick="searchCustomers()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Customer Table -->
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái tài khoản</th>
                        <th>Ngày tạo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody id="customersTableBody">
                    <!-- Dữ liệu sẽ được load bằng JavaScript -->
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="pagination">
            <button class="btn btn-outline" onclick="previousPage()">Trước</button>
            <span class="page-info">Trang 1 / 10</span>
            <button class="btn btn-outline" onclick="nextPage()">Sau</button>
        </div>
    `;
}

// Load nội dung trang Quản lý loại sản phẩm
async function loadCategoriesContent(container) {
    container.innerHTML = `
        <div class="page-header">
            <h1>Quản lý loại sản phẩm</h1>
            <p>Quản lý danh mục loại sản phẩm, thêm/sửa/xóa/ẩn loại sản phẩm</p>
        </div>

        <!-- Action Bar -->
        <div class="action-bar">
            <div class="action-left">
                <button class="btn btn-primary" onclick="showAddCategoryModal()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Thêm loại sản phẩm
                </button>
                <button class="btn btn-secondary" onclick="exportCategories()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7,10 12,15 17,10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Xuất Excel
                </button>
            </div>
            <div class="action-right">
                <div class="search-box">
                    <input type="text" placeholder="Tìm kiếm loại sản phẩm..." id="searchInput">
                    <button onclick="searchCategories()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Category Table -->
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên loại</th>
                        <th>Mô tả</th>
                        <th>Số sản phẩm</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody id="categoriesTableBody">
                    <!-- Dữ liệu sẽ được load bằng JavaScript -->
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="pagination">
            <button class="btn btn-outline" onclick="previousPage()">Trước</button>
            <span class="page-info">Trang 1 / 5</span>
            <button class="btn btn-outline" onclick="nextPage()">Sau</button>
        </div>

        <!-- Modal Thêm/Sửa Loại Sản Phẩm -->
        <div id="categoryModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modalTitle">Thêm loại sản phẩm</h2>
                    <button class="modal-close" onclick="closeCategoryModal()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="categoryForm">
                        <div class="form-group">
                            <label for="categoryName">Tên loại sản phẩm *</label>
                            <input type="text" id="categoryName" name="categoryName" required>
                        </div>
                        <div class="form-group">
                            <label for="categoryDescription">Mô tả</label>
                            <textarea id="categoryDescription" name="categoryDescription" rows="4"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="categoryStatus">Trạng thái</label>
                            <select id="categoryStatus" name="categoryStatus">
                                <option value="active">Hiển thị</option>
                                <option value="hidden">Ẩn</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeCategoryModal()">Hủy</button>
                    <button type="button" class="btn btn-primary" onclick="saveCategory()">Lưu</button>
                </div>
            </div>
        </div>
    `;
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

// Khởi tạo stats cards và quick actions
function initializeStatsCards() {
    // Stats cards hover effect
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Quick actions AJAX loading
    const actionCards = document.querySelectorAll('.action-card[data-page]');
    actionCards.forEach(card => {
        card.addEventListener('click', async function(e) {
            e.preventDefault();
            const pagePath = this.getAttribute('data-page');
            if (pagePath) {
                await loadContent(pagePath);
            }
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