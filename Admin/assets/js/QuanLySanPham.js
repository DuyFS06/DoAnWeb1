// ==================== CẤU HÌNH BAN ĐẦU ====================
const itemsPerPage = 10;
let currentPage = 1;
let productsLocal = [];
let mangDaLoc = [];

// ==================== KHI LOAD TRANG ====================
document.addEventListener("DOMContentLoaded", function () {
  productsLocal = getLocalProducts();
  mangDaLoc = productsLocal;
  // Khởi tạo trang quản lý sản phẩm
  khoiTaoTrang();
  // Load dữ liệu  sản phẩm
  veBangSanPham(productsLocal);
  // Khởi tạo các sự kiện
  ganSuKien();
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

// ======== HÀM XỬ LÍ SỰ KIỆN =========
function ganSuKien() {
  // Tim theo danh muc
  document
    .getElementById("locDanhMuc")
    .addEventListener("change", locTheoDanhMuc);
  // Gắn sự kiện tìm kiếm theo ID
  document
    .getElementById("timId")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        timTheoMa();
      }
    });
}

// ======== HÀM TẠO BẢNG SẢN PHẨM =========
function veBangSanPham(productName) {
  const tableContent = document.querySelector(".table-content");
  tableContent.innerHTML = "";

  let table = document.createElement("table");
  table.classList.add("admin-table");

  let tbody = document.createElement("tbody");

  // Tính vị trí dữ liệu cần hiển thị
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const productsToShow = productName.slice(start, end);
  // Kiểm tra link ảnh vì lúc thêm sản phẩm mới link sẽ coppy từ gg khác link ảnh lấy từ thư mục test
  productsToShow.forEach((sp, index) => {
    const stt = start + index + 1;
    let tr = document.createElement("tr");
    const imgSrc = sp.image.startsWith("http") ? sp.image : `../${sp.image}`;
    tr.innerHTML = `
          <td>${stt}</td>
          <td>${sp.id}</td>
          <td>${sp.name}</td>
          <td>${sp.catalog}</td>
          <td>${sp.desc}</td>
          <td>${sp.price}</td>
          <td><img src="${imgSrc}" alt="${sp.name}" style="width:50px;height:50px;border-radius:5px;"></td>
          <td>    
              <button class="btn-sua">Sửa</button>
              <button class="btn-xoa">Xóa</button>
          </td>
      `;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  tableContent.appendChild(table);

  // ======== CẬP NHẬT PHÂN TRANG =========
  const totalPages = Math.ceil(productName.length / itemsPerPage);
  document.getElementById(
    "pageInfo"
  ).textContent = `Trang ${currentPage} / ${totalPages}`;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;

  // Gắn sự kiện bấm nút phân trang
  document.getElementById("prevPage").onclick = function () {
    prevPage();
  };
  document.getElementById("nextPage").onclick = function () {
    nextPage();
  };
}

function nextPage() {
  const totalPages = Math.ceil(mangDaLoc.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    veBangSanPham(mangDaLoc);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    veBangSanPham(mangDaLoc);
  }
}

// ========== Modal Thêm Sản Phẩm ==========
const modal = document.getElementById("modalThemSP");
const btnThemMoi = document.getElementById("btnThemMoiSP");
const btnClose = document.getElementById("btnCloseModal");
const btnCancel = document.getElementById("btnCancelSP");
const formThemSP = document.getElementById("formThemSP");
const preview = document.getElementById("previewImage");
const inputImage = document.getElementById("spImage");

// Mở modal
btnThemMoi.addEventListener("click", () => {
  modal.style.display = "flex";
});
// Đóng modal
btnClose.addEventListener("click", closeModal);
btnCancel.addEventListener("click", closeModal);
function closeModal() {
  modal.style.display = "none";
  formThemSP.reset();
  preview.innerHTML = "";
}

// ================== XỬ LÝ THÊM SẢN PHẨM ===========
// Hiển thị ảnh xem trước
inputImage.addEventListener("input", () => {
  const url = inputImage.value.trim();
  preview.innerHTML = url ? `<img src="${url}" alt="Ảnh sản phẩm" >` : "";
});
formThemSP.addEventListener("submit", function (e) {
  e.preventDefault();
  let dsSanPham = getLocalProducts();
  const id = document.getElementById("spId");
  const idValue = id.value.trim();
  if (dsSanPham.some((sp) => sp.id.toLowerCase() === idValue.toLowerCase())) {
    alert("Mã sản phẩm đã tồn tại!");
    id.focus();
  }

  // Lấy giá trị số, bỏ ký tự không phải số
  const priceInput = document.getElementById("spPrice").value.trim();
  const priceValue = parseFloat(priceInput.replace(/[^\d]/g, "")) || 0;

  // Định dạng lại tiền
  const formattedPrice = priceValue.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const spMoi = {
    id: idValue,
    catalog: document.getElementById("spCatalog").value,
    name: document.getElementById("spName").value.trim(),
    gender: document.getElementById("spGender").value,
    desc: document.getElementById("spDesc").value.trim(),
    color: document.getElementById("spColor").value.trim(),
    glass: document.getElementById("spGlass").value,
    strap: document.getElementById("spStrap").value,
    importPrice:
      parseFloat(document.getElementById("spImportPrice").value) || 0,
    priceValue: priceValue || 0,
    quantity: 0,
    image: document.getElementById("spImage").value.trim(),
    price: formattedPrice,
  };
  dsSanPham.push(spMoi);
  saveLocalProducts(dsSanPham);
  productsLocal = dsSanPham;
  mangDaLoc = dsSanPham;
  veBangSanPham(mangDaLoc);
  closeModal();
  alert("Đã thêm sản phẩm thành công!");
});

// ================== SỬA SẢN PHẨM ==================

// Khi nhấn nút "Sửa" và "Xóa"
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-sua")) {
    const row = e.target.closest("tr");
    const productId = row.children[1].textContent; // Cột ID
    const product = productsLocal.find((p) => p.id === productId);

    if (product) {
      openEditModal(product);
    }
  }
  if (e.target.classList.contains("btn-xoa")) {
    const row = e.target.closest("tr");
    const productID = row.children[1].textContent.trim();
    if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      mangDaLoc = productsLocal.filter((sp) => sp.id !== productID);
      productsLocal = mangDaLoc;
      saveLocalProducts(productsLocal);
      veBangSanPham(productsLocal);
      alert("Xóa sản phẩm thành công");
    }
  }
});

// Hiển thị modal sửa với dữ liệu sẵn
function openEditModal(product) {
  const modal = document.getElementById("modalSuaSP");
  modal.style.display = "flex";

  // Gán dữ liệu sản phẩm vào form
  document.getElementById("editId").value = product.id;
  document.getElementById("editCatalog").value = product.catalog;
  document.getElementById("editName").value = product.name;
  document.getElementById("editGender").value = product.gender;
  document.getElementById("editDesc").value = product.desc;
  document.getElementById("editColor").value = product.color;
  document.getElementById("editGlass").value = product.glass;
  document.getElementById("editStrap").value = product.strap;
  document.getElementById("editPrice").value = product.priceValue;
  document.getElementById("editImage").value = product.image;
  document.getElementById("previewEditImg").src = product.image;
}
// ================== CẬP NHẬT ẢNH XEM TRƯỚC ==================
document.getElementById("editImage").addEventListener("input", function () {
  const link = this.value.trim();
  document.getElementById("previewEditImg").src = link;
});

document.getElementById("btnUpdateSP").addEventListener("click", function () {
  const id = document.getElementById("editId").value.trim();
  let dsSanPham = getLocalProducts();

  // Tìm vị trí sản phẩm trong mảng
  const index = dsSanPham.findIndex((sp) => sp.id === id);
  if (index === -1) {
    alert("Không tìm thấy sản phẩm cần sửa!");
    return;
  }

  // Lấy giá trị số, bỏ ký tự không phải số
  const priceInput = document.getElementById("editPrice").value.trim();
  const priceValue = parseFloat(priceInput.replace(/[^\d]/g, "")) || 0;

  // Định dạng lại tiền
  const formattedPrice = priceValue.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  // Cập nhật dữ liệu mới
  dsSanPham[index] = {
    ...dsSanPham[index],
    catalog: document.getElementById("editCatalog").value.toUpperCase(),
    name: document.getElementById("editName").value.trim(),
    gender: document.getElementById("editGender").value,
    desc: document.getElementById("editDesc").value.trim(),
    color: document.getElementById("editColor").value.trim(),
    glass: document.getElementById("editGlass").value,
    strap: document.getElementById("editStrap").value,
    priceValue: priceValue || 0,
    price: formattedPrice,
    image: document.getElementById("editImage").value.trim(),
  };

  // Lưu lại LocalStorage
  saveLocalProducts(dsSanPham);

  // Cập nhật hiển thị
  mangDaLoc = dsSanPham;
  productsLocal = mangDaLoc;
  veBangSanPham(mangDaLoc);
  closeEditModal();
  alert("Đã cập nhật sản phẩm thành công!");
});

// Đóng modal sửa
document
  .getElementById("btnCloseModalSua")
  .addEventListener("click", closeEditModal);
document
  .getElementById("btnCancelEdit")
  .addEventListener("click", closeEditModal);

function closeEditModal() {
  document.getElementById("modalSuaSP").style.display = "none";
}

// ==================== HÀM LỌC DANH MỤC ====================
function locTheoDanhMuc() {
  const danhMuc = document.getElementById("locDanhMuc").value;
  if (danhMuc === "all") {
    mangDaLoc = productsLocal;
  } else {
    mangDaLoc = productsLocal.filter(
      (sp) => sp.catalog.toUpperCase() === danhMuc.toUpperCase()
    );
  }
  currentPage = 1;
  veBangSanPham(mangDaLoc);
}
function timTheoMa() {
  const searchInput = document.getElementById("timId");
  const searchValue = searchInput.value.trim().toLowerCase();
  const selectedCatalog = document.getElementById("locDanhMuc").value;

  mangDaLoc = productsLocal.filter((sp) => {
    const idStr = sp.id;
    const matchId = idStr.toLowerCase().includes(searchValue);

    let catalogValue = sp.catalog;
    const matchCatalog =
      selectedCatalog === "all" ||
      catalogValue.toUpperCase() === selectedCatalog.toUpperCase();

    return matchId && matchCatalog;
  });

  currentPage = 1;
  veBangSanPham(mangDaLoc);
  // Đưa con trỏ lại vào ô tìm
  searchInput.value = "";
  searchInput.focus();
}
