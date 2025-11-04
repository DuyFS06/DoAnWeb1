// Quản lý loại sản phẩm JavaScript
// Ensure initialization runs whether DOMContentLoaded already fired or not
function onReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

onReady(function() {
    // Khởi tạo trang quản lý loại sản phẩm
    initializeCategoryManagement();

    // Load dữ liệu loại sản phẩm
    loadCategories();

    // Khởi tạo các sự kiện
    initializeCategoryEvents();
});

// Khởi tạo quản lý loại sản phẩm
function initializeCategoryManagement() {
    console.log('Category Management initialized');

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

// Dữ liệu mẫu loại sản phẩm
const sampleCategories = [{
        id: 1,
        name: 'Đồng hồ nam',
        description: 'Các loại đồng hồ dành cho nam giới',
        productCount: 15,
        status: 'active',
        createdAt: '2024-01-15'
    },
    {
        id: 2,
        name: 'Đồng hồ nữ',
        description: 'Các loại đồng hồ dành cho nữ giới',
        productCount: 12,
        status: 'active',
        createdAt: '2024-01-20'
    },
    {
        id: 3,
        name: 'Đồng hồ trẻ em',
        description: 'Các loại đồng hồ dành cho trẻ em',
        productCount: 8,
        status: 'hidden',
        createdAt: '2024-01-25'
    },
    {
        id: 4,
        name: 'Đồng hồ thể thao',
        description: 'Đồng hồ chuyên dụng cho thể thao',
        productCount: 20,
        status: 'active',
        createdAt: '2024-02-01'
    },
    {
        id: 5,
        name: 'Đồng hồ cao cấp',
        description: 'Đồng hồ cao cấp, sang trọng',
        productCount: 5,
        status: 'active',
        createdAt: '2024-02-05'
    }
];

// Load danh sách loại sản phẩm
function loadCategories() {
    // Lấy dữ liệu từ localStorage hoặc sử dụng dữ liệu mẫu
    let categories = JSON.parse(localStorage.getItem('categories')) || sampleCategories;

    // scope tbody to the categories page section so duplicate IDs elsewhere won't interfere
    const section = document.getElementById('page-categories');
    const tbody = section ? section.querySelector('#categoriesTableBody') : document.getElementById('categoriesTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    categories.forEach(category => {
        const row = createCategoryRow(category);
        tbody.appendChild(row);
    });
}

// Tạo row cho bảng loại sản phẩm
function createCategoryRow(category) {
    const row = document.createElement('tr');

    const statusClass = category.status === 'active' ? 'status-active' : 'status-hidden';
    const statusText = category.status === 'active' ? 'Hiển thị' : 'Ẩn';

    row.innerHTML = `
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td>${category.description}</td>
        <td>${category.productCount}</td>
        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        <td>${formatDate(category.createdAt)}</td>
        <td>
            <div class="action-buttons">
                <button class="btn-icon btn-edit" onclick="editCategory(${category.id})" title="Sửa">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="btn-icon btn-toggle" onclick="toggleCategoryStatus(${category.id})" title="${category.status === 'active' ? 'Ẩn' : 'Hiện'}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${category.status === 'active' ? 
                            '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>' :
                            '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>'
                        }
                    </svg>
                </button>
                <button class="btn-icon btn-delete" onclick="deleteCategory(${category.id})" title="Xóa">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                    </svg>
                </button>
            </div>
        </td>
    `;

    return row;
}

// Khởi tạo các sự kiện
function initializeCategoryEvents() {
    // Sự kiện tìm kiếm - scope to page so other pages' search inputs don't collide
    const section = document.getElementById('page-categories');
    const searchInput = section ? section.querySelector('#searchInput-categories') : document.getElementById('searchInput-categories');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchCategories();
        });
    }

    // If categoriesTableBody exists we might want to re-render on certain events in future
}

// Tìm kiếm loại sản phẩm
function searchCategories() {
    const section = document.getElementById('page-categories');
    const searchInput = section ? section.querySelector('#searchInput-categories') : document.getElementById('searchInput-categories');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const tbody = section ? section.querySelector('#categoriesTableBody') : document.getElementById('categoriesTableBody');

    if (!tbody) return;

    const rows = tbody.querySelectorAll('tr');

    rows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        const description = row.cells[2].textContent.toLowerCase();

        if (name.includes(searchTerm) || description.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Hiển thị modal thêm loại sản phẩm
function showAddCategoryModal() {
    const modal = document.getElementById('categoryModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('categoryForm');

    modalTitle.textContent = 'Thêm loại sản phẩm';
    form.reset();
    form.dataset.mode = 'add';
    form.dataset.id = '';

    // show modal with smooth transition
    modal.style.display = 'flex';
    // allow layout then add show class to start animation
    setTimeout(() => modal.classList.add('show'), 10);
}

// Đóng modal
function closeCategoryModal() {
    const modal = document.getElementById('categoryModal');
    // remove show class to animate out, then hide after transition
    modal.classList.remove('show');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

// Sửa loại sản phẩm
function editCategory(id) {
    const categories = JSON.parse(localStorage.getItem('categories')) || sampleCategories;
    const category = categories.find(cat => cat.id === id);

    if (!category) return;

    const modal = document.getElementById('categoryModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('categoryForm');

    modalTitle.textContent = 'Sửa loại sản phẩm';
    form.dataset.mode = 'edit';
    form.dataset.id = id;

    // Điền dữ liệu vào form
    document.getElementById('categoryName').value = category.name;
    document.getElementById('categoryDescription').value = category.description;
    document.getElementById('categoryStatus').value = category.status;

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Lưu loại sản phẩm
function saveCategory() {
    const form = document.getElementById('categoryForm');
    const mode = form.dataset.mode;
    const id = form.dataset.id;

    const name = document.getElementById('categoryName').value.trim();
    const description = document.getElementById('categoryDescription').value.trim();
    const status = document.getElementById('categoryStatus').value;

    if (!name) {
        if (typeof AdminDashboard !== 'undefined') {
            AdminDashboard.showNotification('Vui lòng nhập tên loại sản phẩm', 'error');
        }
        return;
    }

    let categories = JSON.parse(localStorage.getItem('categories')) || sampleCategories;

    if (mode === 'add') {
        // Thêm mới
        const newId = categories.length ? Math.max(...categories.map(cat => cat.id)) + 1 : 1;
        const newCategory = {
            id: newId,
            name: name,
            description: description,
            productCount: 0,
            status: status,
            createdAt: new Date().toISOString().split('T')[0]
        };

        categories.push(newCategory);

        if (typeof AdminDashboard !== 'undefined') {
            AdminDashboard.showNotification('Thêm loại sản phẩm thành công', 'success');
        }
    } else {
        // Sửa
        const categoryIndex = categories.findIndex(cat => cat.id === parseInt(id));
        if (categoryIndex !== -1) {
            categories[categoryIndex].name = name;
            categories[categoryIndex].description = description;
            categories[categoryIndex].status = status;

            if (typeof AdminDashboard !== 'undefined') {
                AdminDashboard.showNotification('Cập nhật loại sản phẩm thành công', 'success');
            }
        }
    }

    // Lưu vào localStorage
    localStorage.setItem('categories', JSON.stringify(categories));

    // Reload danh sách
    loadCategories();

    // Đóng modal
    closeCategoryModal();
}

// Toggle trạng thái hiển thị/ẩn
function toggleCategoryStatus(id) {
    const categories = JSON.parse(localStorage.getItem('categories')) || sampleCategories;
    const categoryIndex = categories.findIndex(cat => cat.id === id);

    if (categoryIndex !== -1) {
        categories[categoryIndex].status = categories[categoryIndex].status === 'active' ? 'hidden' : 'active';

        localStorage.setItem('categories', JSON.stringify(categories));
        loadCategories();

        const statusText = categories[categoryIndex].status === 'active' ? 'hiện' : 'ẩn';
        if (typeof AdminDashboard !== 'undefined') {
            AdminDashboard.showNotification(`Đã ${statusText} loại sản phẩm`, 'success');
        }
    }
}

// Xóa loại sản phẩm
function deleteCategory(id) {
    if (confirm('Bạn có chắc chắn muốn xóa loại sản phẩm này?')) {
        const categories = JSON.parse(localStorage.getItem('categories')) || sampleCategories;
        const filteredCategories = categories.filter(cat => cat.id !== id);

        localStorage.setItem('categories', JSON.stringify(filteredCategories));
        loadCategories();

        if (typeof AdminDashboard !== 'undefined') {
            AdminDashboard.showNotification('Đã xóa loại sản phẩm', 'success');
        }
    }
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