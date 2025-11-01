// ========== QUẢN LÝ TỒN KHO ==========

// --- Cấu hình ---
const itemsPerPage = 10;
let currentPage = 1;
let productsLocal = []; // Dữ liệu từ localStorage
let mangDaLoc = []; // Mảng tạm sau khi lọc

document.addEventListener("DOMContentLoaded", function () {
  khoiTaoTrang();
  productsLocal = getLocalProducts();
  mangDaLoc = productsLocal;
  ganSuKien();
  veBangTonKho(mangDaLoc);
});

// ======== HÀM KHỞI TẠO =========
function khoiTaoTrang() {
  console.log("Category Management initialized");

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
function veBangTonKho(data) {
  const tbody = document.getElementById("table-content");
  tbody.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = data.slice(start, end);

  // Dòng tổng (chỉ hiện ở trang đầu)
  if (currentPage === 1 && data.length > 0) {
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
    let statusClass = "status-normal";
    let statusText = "Bình thường";
    if (sp.quantity === 0) {
      statusClass = "status-out";
      statusText = "Hết hàng";
    } else if (sp.quantity < 10) {
      statusClass = "status-low";
      statusText = "Sắp hết hàng";
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${stt}</td>
      <td>${
        sp.id
      }<br><span class="status-tag ${statusClass}">${statusText}</span></td>
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
  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;
  document.getElementById(
    "pageInfo"
  ).textContent = `Trang ${currentPage} / ${totalPages}`;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

// --- Chuyển trang ---
function nextPage() {
  const totalPages = Math.ceil(mangDaLoc.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    veBangTonKho(mangDaLoc);
  }
}
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    veBangTonKho(mangDaLoc);
  }
}

// --- Gán sự kiện ---
function ganSuKien() {
  document.getElementById("prevPage").addEventListener("click", prevPage);
  document.getElementById("nextPage").addEventListener("click", nextPage);

  // Lọc danh mục
  document
    .getElementById("locDanhMuc")
    .addEventListener("change", locTheoDanhMuc);
  // Tìm kiếm theo mã khi nhấn Enter
  const timInput = document.querySelector(".boLoc input[type='text']");
  timInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      timTheoMa();
      this.value = ""; // reset sau khi tìm
    }
  });
  // Tab trạng thái
  document.querySelectorAll(".tab-status button").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".tab-status button")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      locTheoTrangThai(this.getAttribute("data-type"));
    });
  });
}

// --- Lọc theo danh mục ---
function locTheoDanhMuc() {
  const selected = document.getElementById("locDanhMuc").value;
  if (selected === "all" || selected === "Danh mục") {
    mangDaLoc = productsLocal;
  } else {
    mangDaLoc = productsLocal.filter(
      (sp) => sp.catalog.toUpperCase() === selected.toUpperCase()
    );
  }
  currentPage = 1;
  veBangTonKho(mangDaLoc);
}

// --- Lọc theo trạng thái ---
function locTheoTrangThai(type) {
  switch (type) {
    case "sapHetHang":
      mangDaLoc = productsLocal.filter(
        (sp) => sp.quantity > 0 && sp.quantity < 10
      );
      break;
    case "hetHang":
      mangDaLoc = productsLocal.filter((sp) => sp.quantity === 0);
      break;
    case "binhThuong":
      mangDaLoc = productsLocal.filter((sp) => sp.quantity >= 10);
      break;
    default:
      mangDaLoc = productsLocal;
  }
  currentPage = 1;
  veBangTonKho(mangDaLoc);
}

//Tìm theo mã
function timTheoMa() {
  const searchInput = document.querySelector(".boLoc input[type='text']");
  const searchValue = searchInput.value.trim().toLowerCase();
  const selectedCatalog = document.getElementById("locDanhMuc").value;

  mangDaLoc = productsLocal.filter((sp) => {
    const matchId = sp.id.toLowerCase().includes(searchValue);
    const matchCatalog =
      selectedCatalog === "all" ||
      selectedCatalog === "Danh mục" ||
      sp.catalog.toUpperCase() === selectedCatalog.toUpperCase();
    return matchId && matchCatalog;
  });

  currentPage = 1;
  veBangTonKho(mangDaLoc);
  searchInput.focus();
}
