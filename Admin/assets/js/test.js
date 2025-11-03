// ==================== CẤU HÌNH BAN ĐẦU ====================
const thinh_itemsPerPage = 10;
let thinh_currentPage = 1;
let thinh_productsLocal = [];
let thinh_mangDaLoc = [];

// ==================== KHI LOAD TRANG ====================
document.addEventListener("DOMContentLoaded", function () {
  thinh_productsLocal = getLocalProducts();
  thinh_mangDaLoc = thinh_productsLocal;
  thinh_khoiTaoTrang();
  thinh_veBangSanPham(thinh_productsLocal);
  thinh_ganSuKien();
});

// ======== HÀM KHỞI TẠO =========
function thinh_khoiTaoTrang() {
  console.log("Quản lý sản phẩm initialized");
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

// ======== HÀM GẮN SỰ KIỆN =========
function thinh_ganSuKien() {
  document
    .getElementById("thinh_locDanhMuc")
    .addEventListener("change", thinh_locTheoDanhMuc);

  document
    .getElementById("thinh_timId")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        thinh_timTheoMa();
      }
    });
}

// ======== HÀM VẼ BẢNG =========
function thinh_veBangSanPham(ds) {
  const tableContent = document.querySelector(".thinh_table-content");
  tableContent.innerHTML = "";

  let table = document.createElement("table");
  table.classList.add("admin-table");

  let tbody = document.createElement("tbody");

  const start = (thinh_currentPage - 1) * thinh_itemsPerPage;
  const end = start + thinh_itemsPerPage;
  const productsToShow = ds.slice(start, end);

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
        <button class="thinh_btn-sua">Sửa</button>
        <button class="thinh_btn-xoa">Xóa</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  tableContent.appendChild(table);

  const totalPages = Math.ceil(ds.length / thinh_itemsPerPage);
  document.getElementById(
    "thinh_pageInfo"
  ).textContent = `Trang ${thinh_currentPage} / ${totalPages}`;
  document.getElementById("thinh_prevPage").disabled = thinh_currentPage === 1;
  document.getElementById("thinh_nextPage").disabled =
    thinh_currentPage === totalPages;

  document.getElementById("thinh_prevPage").onclick = thinh_prevPage;
  document.getElementById("thinh_nextPage").onclick = thinh_nextPage;
}

function thinh_nextPage() {
  const totalPages = Math.ceil(thinh_mangDaLoc.length / thinh_itemsPerPage);
  if (thinh_currentPage < totalPages) {
    thinh_currentPage++;
    thinh_veBangSanPham(thinh_mangDaLoc);
  }
}

function thinh_prevPage() {
  if (thinh_currentPage > 1) {
    thinh_currentPage--;
    thinh_veBangSanPham(thinh_mangDaLoc);
  }
}

// ================== MODAL THÊM ==================
const thinh_modal = document.getElementById("thinh_modalThemSP");
const thinh_btnThemMoi = document.getElementById("thinh_btnThemMoiSP");
const thinh_btnClose = document.getElementById("thinh_btnCloseModal");
const thinh_btnCancel = document.getElementById("thinh_btnCancelSP");
const thinh_formThemSP = document.getElementById("thinh_formThemSP");
const thinh_preview = document.getElementById("thinh_previewImage");
const thinh_inputImage = document.getElementById("thinh_spImage");

thinh_btnThemMoi.addEventListener("click", () => {
  thinh_modal.style.display = "flex";
});
thinh_btnClose.addEventListener("click", thinh_closeModal);
thinh_btnCancel.addEventListener("click", thinh_closeModal);

function thinh_closeModal() {
  thinh_modal.style.display = "none";
  thinh_formThemSP.reset();
  thinh_preview.innerHTML = "";
}

// ================== THÊM SẢN PHẨM ==================
thinh_inputImage.addEventListener("input", () => {
  const url = thinh_inputImage.value.trim();
  thinh_preview.innerHTML = url
    ? `<img src="${url}" alt="Ảnh sản phẩm" />`
    : "";
});

thinh_formThemSP.addEventListener("submit", function (e) {
  e.preventDefault();
  let dsSanPham = getLocalProducts();
  const idInput = document.getElementById("thinh_spId");
  const idValue = idInput.value.trim();

  if (dsSanPham.some((sp) => sp.id.toLowerCase() === idValue.toLowerCase())) {
    alert("Mã sản phẩm đã tồn tại!");
    idInput.focus();
    return;
  }

  const priceInput = document.getElementById("thinh_spPrice").value.trim();
  const priceValue = parseFloat(priceInput.replace(/[^\d]/g, "")) || 0;

  const formattedPrice = priceValue.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const spMoi = {
    id: idValue,
    catalog: document.getElementById("thinh_spCatalog").value,
    name: document.getElementById("thinh_spName").value.trim(),
    gender: document.getElementById("thinh_spGender").value,
    desc: document.getElementById("thinh_spDesc").value.trim(),
    color: document.getElementById("thinh_spColor").value.trim(),
    glass: document.getElementById("thinh_spGlass").value,
    strap: document.getElementById("thinh_spStrap").value,
    importPrice:
      parseFloat(document.getElementById("thinh_spImportPrice").value) || 0,
    priceValue: priceValue,
    quantity: 0,
    image: document.getElementById("thinh_spImage").value.trim(),
    price: formattedPrice,
  };

  dsSanPham.push(spMoi);
  saveLocalProducts(dsSanPham);
  thinh_productsLocal = dsSanPham;
  thinh_mangDaLoc = dsSanPham;
  thinh_veBangSanPham(thinh_mangDaLoc);
  thinh_closeModal();
  alert("Đã thêm sản phẩm thành công!");
});

// ================== SỬA SẢN PHẨM ==================
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("thinh_btn-sua")) {
    const row = e.target.closest("tr");
    const productId = row.children[1].textContent;
    const product = thinh_productsLocal.find((p) => p.id === productId);
    if (product) thinh_openEditModal(product);
  }

  if (e.target.classList.contains("thinh_btn-xoa")) {
    const row = e.target.closest("tr");
    const productID = row.children[1].textContent.trim();
    if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      thinh_mangDaLoc = thinh_productsLocal.filter((sp) => sp.id !== productID);
      thinh_productsLocal = thinh_mangDaLoc;
      saveLocalProducts(thinh_productsLocal);
      thinh_veBangSanPham(thinh_productsLocal);
      alert("Xóa sản phẩm thành công");
    }
  }
});

function thinh_openEditModal(product) {
  const modal = document.getElementById("thinh_modalSuaSP");
  modal.style.display = "flex";

  document.getElementById("thinh_editId").value = product.id;
  document.getElementById("thinh_editCatalog").value = product.catalog;
  document.getElementById("thinh_editName").value = product.name;
  document.getElementById("thinh_editGender").value = product.gender;
  document.getElementById("thinh_editDesc").value = product.desc;
  document.getElementById("thinh_editColor").value = product.color;
  document.getElementById("thinh_editGlass").value = product.glass;
  document.getElementById("thinh_editStrap").value = product.strap;
  document.getElementById("thinh_editPrice").value = product.priceValue;
  document.getElementById("thinh_editImage").value = product.image;
  document.getElementById("thinh_previewEditImg").src = product.image;
}

document
  .getElementById("thinh_editImage")
  .addEventListener("input", function () {
    const link = this.value.trim();
    document.getElementById("thinh_previewEditImg").src = link;
  });

document
  .getElementById("thinh_btnUpdateSP")
  .addEventListener("click", function () {
    const id = document.getElementById("thinh_editId").value.trim();
    let dsSanPham = getLocalProducts();
    const index = dsSanPham.findIndex((sp) => sp.id === id);
    if (index === -1) {
      alert("Không tìm thấy sản phẩm cần sửa!");
      return;
    }

    const priceInput = document.getElementById("thinh_editPrice").value.trim();
    const priceValue = parseFloat(priceInput.replace(/[^\d]/g, "")) || 0;

    const formattedPrice = priceValue.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    dsSanPham[index] = {
      ...dsSanPham[index],
      catalog: document.getElementById("thinh_editCatalog").value.toUpperCase(),
      name: document.getElementById("thinh_editName").value.trim(),
      gender: document.getElementById("thinh_editGender").value,
      desc: document.getElementById("thinh_editDesc").value.trim(),
      color: document.getElementById("thinh_editColor").value.trim(),
      glass: document.getElementById("thinh_editGlass").value,
      strap: document.getElementById("thinh_editStrap").value,
      priceValue: priceValue,
      price: formattedPrice,
      image: document.getElementById("thinh_editImage").value.trim(),
    };

    saveLocalProducts(dsSanPham);
    thinh_productsLocal = dsSanPham;
    thinh_mangDaLoc = dsSanPham;
    thinh_veBangSanPham(thinh_mangDaLoc);
    thinh_closeEditModal();
    alert("Đã cập nhật sản phẩm thành công!");
  });

document
  .getElementById("thinh_btnCloseModalSua")
  .addEventListener("click", thinh_closeEditModal);
document
  .getElementById("thinh_btnCancelEdit")
  .addEventListener("click", thinh_closeEditModal);

function thinh_closeEditModal() {
  document.getElementById("thinh_modalSuaSP").style.display = "none";
}

// ==================== LỌC & TÌM KIẾM ====================
function thinh_locTheoDanhMuc() {
  const danhMuc = document.getElementById("thinh_locDanhMuc").value;
  thinh_mangDaLoc =
    danhMuc === "all"
      ? thinh_productsLocal
      : thinh_productsLocal.filter(
          (sp) => sp.catalog.toUpperCase() === danhMuc.toUpperCase()
        );
  thinh_currentPage = 1;
  thinh_veBangSanPham(thinh_mangDaLoc);
}

function thinh_timTheoMa() {
  const searchInput = document.getElementById("thinh_timId");
  const searchValue = searchInput.value.trim().toLowerCase();
  const selectedCatalog = document.getElementById("thinh_locDanhMuc").value;

  thinh_mangDaLoc = thinh_productsLocal.filter((sp) => {
    const matchId = sp.id.toLowerCase().includes(searchValue);
    const matchCatalog =
      selectedCatalog === "all" ||
      sp.catalog.toUpperCase() === selectedCatalog.toUpperCase();
    return matchId && matchCatalog;
  });

  thinh_currentPage = 1;
  thinh_veBangSanPham(thinh_mangDaLoc);
  searchInput.value = "";
  searchInput.focus();
}
