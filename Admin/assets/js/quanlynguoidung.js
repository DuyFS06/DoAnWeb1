// Quản lý người dùng JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo trang quản lý người dùng
    initializeCustomerManagement();

    // Load dữ liệu khách hàng
    loadCustomers();

    // Khởi tạo các sự kiện
    initializeCustomerEvents();
});

// Khởi tạo quản lý khách hàng
function initializeCustomerManagement() {
    console.log('Customer Management initialized');

    // Cập nhật thông tin admin
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

// Dữ liệu mẫu khách hàng
const sampleCustomers = [{
        id: 1,
        name: 'Nguyễn Văn An',
        email: 'nguyenvanan@email.com',
        phone: '0123456789',
        status: 'active',
        createdAt: '2024-01-15'
    },
    {
        id: 2,
        name: 'Trần Thị Bình',
        email: 'tranthibinh@email.com',
        phone: '0987654321',
        status: 'active',
        createdAt: '2024-01-20'
    },
    {
        id: 3,
        name: 'Lê Văn Cường',
        email: 'levancuong@email.com',
        phone: '0369258147',
        status: 'blocked',
        createdAt: '2024-01-25'
    },
    {
        id: 4,
        name: 'Phạm Thị Dung',
        email: 'phamthidung@email.com',
        phone: '0741852963',
        status: 'active',
        createdAt: '2024-02-01'
    },
    {
        id: 5,
        name: 'Hoàng Văn Em',
        email: 'hoangvanem@email.com',
        phone: '0852741963',
        status: 'blocked',
        createdAt: '2024-02-05'
    }
];

// Load danh sách khách hàng
function loadCustomers() {
    // Lấy dữ liệu từ localStorage hoặc sử dụng dữ liệu mẫu
    let customers = JSON.parse(localStorage.getItem('customers')) || sampleCustomers;

    const tbody = document.getElementById('customersTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    customers.forEach(customer => {
        const row = createCustomerRow(customer);
        tbody.appendChild(row);
    });
}

// Tạo row cho bảng khách hàng
function createCustomerRow(customer) {
    const row = document.createElement('tr');

    const statusClass = customer.status === 'active' ? 'status-active' : 'status-blocked';
    const statusText = customer.status === 'active' ? 'Hoạt động' : 'Bị khóa';

    row.innerHTML = `
        <td>${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td>
        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        <td>${formatDate(customer.createdAt)}</td>
        <td>
            <div class="action-buttons">
                <button class="btn-icon btn-reset" onclick="resetPassword(${customer.id})" title="Reset mật khẩu">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                        <path d="M21 3v5h-5"></path>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                        <path d="M3 21v-5h5"></path>
                    </svg>
                </button>
                <button class="btn-icon btn-toggle" onclick="toggleCustomerStatus(${customer.id})" title="${customer.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${customer.status === 'active' ? 
                            '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>' :
                            '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><circle cx="12" cy="16" r="1"></circle><path d="M7 11V7a5 5 0 0 1 9.9-1"></path>'
                        }
                    </svg>
                </button>
            </div>
        </td>
    `;

    return row;
}

// Khởi tạo các sự kiện
function initializeCustomerEvents() {
    // Sự kiện tìm kiếm
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchCustomers();
        });
    }
}

// Tìm kiếm khách hàng
function searchCustomers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const tbody = document.getElementById('customersTableBody');

    if (!tbody) return;

    const rows = tbody.querySelectorAll('tr');

    rows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        const email = row.cells[2].textContent.toLowerCase();
        const phone = row.cells[3].textContent.toLowerCase();

        if (name.includes(searchTerm) || email.includes(searchTerm) || phone.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Reset mật khẩu khách hàng
function resetPassword(id) {
    if (confirm('Bạn có chắc chắn muốn reset mật khẩu cho khách hàng này?')) {
        const customers = JSON.parse(localStorage.getItem('customers')) || sampleCustomers;
        const customerIndex = customers.findIndex(customer => customer.id === id);

        if (customerIndex !== -1) {
            // Tạo mật khẩu mới ngẫu nhiên
            const newPassword = generateRandomPassword();

            // Lưu mật khẩu mới (trong thực tế sẽ gửi email cho khách hàng)
            customers[customerIndex].tempPassword = newPassword;
            customers[customerIndex].passwordReset = true;
            customers[customerIndex].resetDate = new Date().toISOString();

            localStorage.setItem('customers', JSON.stringify(customers));

            if (typeof AdminDashboard !== 'undefined') {
                AdminDashboard.showNotification(`Đã reset mật khẩu. Mật khẩu mới: ${newPassword}`, 'success');
            }
        }
    }
}

// Toggle trạng thái khóa/mở khóa tài khoản
function toggleCustomerStatus(id) {
    const customers = JSON.parse(localStorage.getItem('customers')) || sampleCustomers;
    const customerIndex = customers.findIndex(customer => customer.id === id);

    if (customerIndex !== -1) {
        const currentStatus = customers[customerIndex].status;
        const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
        const action = newStatus === 'active' ? 'mở khóa' : 'khóa';

        if (confirm(`Bạn có chắc chắn muốn ${action} tài khoản này?`)) {
            customers[customerIndex].status = newStatus;
            customers[customerIndex].statusChangedDate = new Date().toISOString();

            localStorage.setItem('customers', JSON.stringify(customers));
            loadCustomers();

            if (typeof AdminDashboard !== 'undefined') {
                AdminDashboard.showNotification(`Đã ${action} tài khoản khách hàng`, 'success');
            }
        }
    }
}

// Tạo mật khẩu ngẫu nhiên
function generateRandomPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}



// Phân trang
function previousPage() {
    if (typeof AdminDashboard !== 'undefined') {
        AdminDashboard.showNotification('Chuyển về trang trước', 'info');
    }
}

function nextPage() {
    if (typeof AdminDashboard !== 'undefined') {
        AdminDashboard.showNotification('Chuyển đến trang sau', 'info');
    }
}

// Format ngày
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}