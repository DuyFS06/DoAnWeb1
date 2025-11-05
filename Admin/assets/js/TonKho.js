// ========== QUẢN LÝ TỒN KHO ==========

// --- Hàm lấy dữ liệu từ localStorage ---
function getLocalProducts() {
    try {
        const data = localStorage.getItem("productsLocal");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error getting products from localStorage:", error);
        return [];
    }
}

// --- Cấu hình ---
const TK_itemsPerPage = 10;
let TK_currentPage = 1;
let TK_productsLocal = []; // Dữ liệu từ localStorage
let TK_mangDaLoc = []; // Mảng tạm sau khi lọc

document.addEventListener("DOMContentLoaded", function() {
    try {
        TK_khoiTaoTrang();
        TK_productsLocal = getLocalProducts() || [];
        TK_mangDaLoc = TK_productsLocal;
        TK_ganSuKien();
        TK_veBangTonKho(TK_mangDaLoc);
    } catch (error) {
        console.error("Error initializing inventory management:", error);
        TK_productsLocal = [];
        TK_mangDaLoc = [];
        TK_veBangTonKho([]);
    }
});

// tự reaload lại dữ liệu khi nghe thấy thay đổi
window.addEventListener("productsUpdated", () => {
    TK_productsLocal = getLocalProducts();
    TK_mangDaLoc = TK_productsLocal;
    TK_ganSuKien(); // Cập nhật lại danh mục và số lượng
    TK_veBangTonKho(TK_mangDaLoc);
});

// ======== HÀM KHỞI TẠO =========
function TK_khoiTaoTrang() {
    console.log("Inventory Management initialized");

    // Kiểm tra và khởi tạo products nếu chưa có trong localStorage
    if (!localStorage.getItem("productsLocal")) {
        console.log("Initializing products in localStorage...");
        localStorage.setItem("productsLocal", JSON.stringify([]));
    }

    // Cập nhật thông tin admin
    if (typeof adminSession !== "undefined" && adminSession.isLoggedIn()) {
        const adminInfo = adminSession.getCurrentAdmin();
        if (adminInfo && adminInfo.username) {
            const adminNameElement = document.getElementById("adminName");
            if (adminNameElement) {
                adminNameElement.textContent = adminInfo.username;
            }
        }
    }
}
// --- Hàm render bảng ---
function TK_veBangTonKho(data) {
    const tbody = document.getElementById("TK_table-content");
    if (!tbody) {
        console.error("Table body element not found");
        return;
    }
    tbody.innerHTML = "";

    const start = (TK_currentPage - 1) * TK_itemsPerPage;
    const end = start + TK_itemsPerPage;
    const pageData = data.slice(start, end);

    // Dòng tổng (chỉ hiện ở trang đầu)
    if (TK_currentPage === 1 && data.length > 0) {
        let tongSoLuong = 0;
        let tongGiaTri = 0;
        data.forEach((sp) => {
            tongSoLuong += sp.quantity;
            tongGiaTri += sp.priceValue * sp.quantity;
        });
        const trTong = document.createElement("tr");
        trTong.classList.add("row-total");
        trTong.innerHTML = `
      <td><strong>Tổng</strong></td>
      <td colspan="3"></td>
      <td><strong>${tongSoLuong}</strong></td>
      <td></td><td></td>
      <td><strong>${tongGiaTri.toLocaleString()}₫</strong></td>
    `;
        tbody.appendChild(trTong);
    }

    // Dòng sản phẩm
    pageData.forEach((sp, index) => {
        const stt = start + index + 1;
        const giaTriTon = sp.priceValue * sp.quantity;

        // Trạng thái
        let statusClass = "TK_status-normal";
        let statusText = "Bình thường";
        if (sp.quantity === 0) {
            statusClass = "TK_status-out";
            statusText = "Hết hàng";
        } else if (sp.quantity < 10) {
            statusClass = "TK_status-low";
            statusText = "Sắp hết hàng";
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${stt}</td>
      <td>${
        sp.id
      }<br><span class="TK_status-tag ${statusClass}">${statusText}</span></td>
      <td><img src="${
        sp.image.startsWith("http") ? sp.image : "../" + sp.image
      }" 
               onerror="this.onerror=null; this.src='../assets/img/no-image.png';" 
               alt="${
                 sp.name
               }" style="width:50px;height:50px;border-radius:6px;object-fit:cover;"></td>
      <td>${sp.name}</td>
      <td>${sp.quantity}</td>
      <td>${sp.importPrice.toLocaleString()}₫</td>
      <td>${sp.priceValue.toLocaleString()}₫</td>
      <td>${giaTriTon.toLocaleString()}₫</td>
    `;
        tbody.appendChild(tr);
    });

    // Cập nhật phân trang
    const totalPages = Math.ceil(data.length / TK_itemsPerPage) || 1;
    const pageInfo = document.getElementById("TK_pageInfo");
    const prevBtn = document.getElementById("TK_prevPage");
    const nextBtn = document.getElementById("TK_nextPage");

    if (pageInfo) pageInfo.textContent = `Trang ${TK_currentPage} / ${totalPages}`;
    if (prevBtn) prevBtn.disabled = TK_currentPage === 1;
    if (nextBtn) nextBtn.disabled = TK_currentPage === totalPages;
}

// --- Chuyển trang ---
function TK_nextPage() {
    const totalPages = Math.ceil(TK_mangDaLoc.length / TK_itemsPerPage);
    if (TK_currentPage < totalPages) {
        TK_currentPage++;
        TK_veBangTonKho(TK_mangDaLoc);
    }
}

function TK_prevPage() {
    if (TK_currentPage > 1) {
        TK_currentPage--;
        TK_veBangTonKho(TK_mangDaLoc);
    }
}

// --- Gán sự kiện ---
function TK_ganSuKien() {
    // Previous page button
    const prevBtn = document.getElementById("TK_prevPage");
    if (prevBtn) {
        prevBtn.addEventListener("click", TK_prevPage);
    }

    // Next page button
    const nextBtn = document.getElementById("TK_nextPage");
    if (nextBtn) {
        nextBtn.addEventListener("click", TK_nextPage);
    }

    // Lọc danh mục
    const locDanhMucSelect = document.getElementById("TK_locDanhMuc");
    if (locDanhMucSelect) {
        // Xóa tất cả options cũ
        locDanhMucSelect.innerHTML = '<option value="all">Tất cả sản phẩm</option>';

        // Tạo map để đếm số lượng theo danh mục
        const categoryCount = new Map();
        TK_productsLocal.forEach(product => {
            const catalog = product.catalog;
            const count = categoryCount.get(catalog) || 0;
            categoryCount.set(catalog, count + product.quantity);
        });

        // Thêm options mới với số lượng tồn kho
        categoryCount.forEach((quantity, catalog) => {
            const option = document.createElement('option');
            option.value = catalog;
            option.textContent = `${catalog} (${quantity} sản phẩm)`;
            locDanhMucSelect.appendChild(option);
        });

        locDanhMucSelect.addEventListener("change", TK_locTheoDanhMuc);
    }

    // Tìm kiếm theo mã khi nhấn Enter
    const timInput = document.querySelector(".TK_boLoc input[type='text']");
    if (timInput) {
        timInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                TK_timTheoMa();
                this.value = ""; // reset sau khi tìm
            }
        });
    }

    // Tab trạng thái
    const statusButtons = document.querySelectorAll(".TK_tab-status button");
    if (statusButtons.length > 0) {
        statusButtons.forEach((btn) => {
            btn.addEventListener("click", function() {
                statusButtons.forEach((b) => b.classList.remove("TK_active"));
                this.classList.add("TK_active");
                TK_locTheoTrangThai(this.getAttribute("data-type"));
            });
        });
    }
}

// --- Lọc theo danh mục ---
function TK_locTheoDanhMuc() {
    const selected = document.getElementById("TK_locDanhMuc").value;
    if (selected === "all" || selected === "Danh mục") {
        TK_mangDaLoc = TK_productsLocal;
    } else {
        TK_mangDaLoc = TK_productsLocal.filter(
            (sp) => sp.catalog.toUpperCase() === selected.toUpperCase()
        );
    }
    currentPage = 1;
    TK_veBangTonKho(TK_mangDaLoc);
}

// --- Lọc theo trạng thái ---
function TK_locTheoTrangThai(type) {
    switch (type) {
        case "sapHetHang":
            TK_mangDaLoc = TK_productsLocal.filter(
                (sp) => sp.quantity > 0 && sp.quantity < 10
            );
            break;
        case "hetHang":
            TK_mangDaLoc = TK_productsLocal.filter((sp) => sp.quantity === 0);
            break;
        case "binhThuong":
            TK_mangDaLoc = TK_productsLocal.filter((sp) => sp.quantity >= 10);
            break;
        default:
            TK_mangDaLoc = TK_productsLocal;
    }
    currentPage = 1;
    TK_veBangTonKho(TK_mangDaLoc);
}

//Tìm theo mã
function TK_timTheoMa() {
    const searchInput = document.querySelector(".TK_boLoc input[type='text']");
    const searchValue = searchInput.value.trim().toLowerCase();
    const selectedCatalog = document.getElementById("TK_locDanhMuc").value;

    TK_mangDaLoc = TK_productsLocal.filter((sp) => {
        const matchId = sp.id.toLowerCase().includes(searchValue);
        const matchCatalog =
            selectedCatalog === "all" ||
            selectedCatalog === "Danh mục" ||
            sp.catalog.toUpperCase() === selectedCatalog.toUpperCase();
        return matchId && matchCatalog;
    });

    currentPage = 1;
    TK_veBangTonKho(TK_mangDaLoc);
    searchInput.focus();
}

// Nghe thay đổi localStorage từ tab khác
window.addEventListener("storage", (event) => {
    if (event.key === "productsLocal") {
        window.dispatchEvent(new Event("productsUpdated"));
    }
});