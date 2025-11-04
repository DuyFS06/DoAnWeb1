// ==================== CẤU HÌNH BAN ĐẦU ====================
const QLSP_itemsPerPage = 10;
let QLSP_currentPage = 1;
let QLSP_productsLocal = [];
let QLSP_mangDaLoc = [];

// ==================== KHI LOAD TRANG ====================
document.addEventListener("DOMContentLoaded", function () {
  QLSP_productsLocal = getLocalProducts();
  QLSP_mangDaLoc = QLSP_productsLocal;
  QLSP_khoiTaoTrang();
  QLSP_veBangSanPham(QLSP_productsLocal);
  QLSP_ganSuKien();
});

// tự reaload lại dữ liệu khi nghe thấy thay đổi
window.addEventListener("productsUpdated", () => {
  QLSP_productsLocal = getLocalProducts();
  QLSP_mangDaLoc = QLSP_productsLocal;
});
// ======== HÀM KHỞI TẠO =========
function QLSP_khoiTaoTrang() {
  console.log("Quản lý sản phẩm đã khởi tạo");
  if (typeof adminSession !== "undefined" && adminSession.isLoggedIn()) {
    const adminInfo = adminSession.getCurrentAdmin();
    if (adminInfo && adminInfo.username) {
      const adminNameElement = document.getElementById("adminName");
      if (adminNameElement) adminNameElement.textContent = adminInfo.username;
    }
  }
}
//Debug lỗi modal để fixed so với toàn khung nhìn
//để position: fixed sẽ luôn so với toàn màn hình thật
document.addEventListener("DOMContentLoaded", function () {
  const modalThem = document.getElementById("QLSP_modalThemSP");
  if (modalThem && modalThem.parentElement !== document.body) {
    document.body.appendChild(modalThem);
  }
  const modalSua = document.getElementById("QLSP_modalSuaSP");
  if (modalSua && modalSua.parentElement !== document.body) {
    document.body.appendChild(modalSua);
  }
});

// ======== HÀM XỬ LÍ SỰ KIỆN =========
function QLSP_ganSuKien() {
  document
    .getElementById("QLSP_locDanhMuc")
    .addEventListener("change", QLSP_locTheoDanhMuc);

  document
    .getElementById("QLSP_timId")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        QLSP_timTheoMa();
      }
    });

  // ================== XỬ LÝ CLICK ẨN / HIỆN ==================
  document.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("QLSP_tick-visible") ||
      e.target.classList.contains("QLSP_tick-hidden")
    ) {
      const productId = e.target.getAttribute("data-id");
      const products = getLocalProducts();

      const index = products.findIndex((p) => p.id === productId);
      if (index !== -1) {
        products[index].visibility =
          products[index].visibility === "visible" ? "hidden" : "visible";
        saveLocalProducts(products);

        e.target.classList.toggle("QLSP_tick-visible");
        e.target.classList.toggle("QLSP_tick-hidden");
        e.target.textContent =
          products[index].visibility === "visible" ? "✔" : "";
      }
    }
  });
}

// ======== HÀM TẠO BẢNG SẢN PHẨM =========
function QLSP_veBangSanPham(dsSP) {
  const tableContent = document.querySelector(".QLSP_table-content");
  tableContent.innerHTML = "";

  let table = document.createElement("table");
  table.classList.add("QLSP_admin-table");

  let tbody = document.createElement("tbody");

  const start = (QLSP_currentPage - 1) * QLSP_itemsPerPage;
  const end = start + QLSP_itemsPerPage;
  const productsToShow = dsSP.slice(start, end);

  productsToShow.forEach((sp, index) => {
    const stt = start + index + 1;
    const imgSrc = sp.image.startsWith("http") ? sp.image : `../${sp.image}`;
    const tickClass =
      sp.visibility === "visible" ? "QLSP_tick-visible" : "QLSP_tick-hidden";
    const tickSymbol = sp.visibility === "visible" ? "✔" : "";

    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${stt}</td>
      <td>${sp.id}</td>
      <td>${sp.name}</td>
      <td>${sp.catalog}</td>
      <td>${sp.desc}</td>
      <td><img src="${imgSrc}" alt="${sp.name}" class="QLSP_img"></td>
      <td><div class="${tickClass}" data-id="${sp.id}">${tickSymbol}</div></td>
      <td>
        <button class="QLSP_btn-sua">Sửa</button>
        <button class="QLSP_btn-xoa">Xóa</button>
      </td>`;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  tableContent.appendChild(table);

  // ======== CẬP NHẬT PHÂN TRANG =========
  const totalPages = Math.ceil(dsSP.length / QLSP_itemsPerPage);
  document.getElementById(
    "QLSP_pageInfo"
  ).textContent = `Trang ${QLSP_currentPage} / ${totalPages}`;
  document.getElementById("QLSP_prevPage").disabled = QLSP_currentPage === 1;
  document.getElementById("QLSP_nextPage").disabled =
    QLSP_currentPage === totalPages;

  document.getElementById("QLSP_prevPage").onclick = () => QLSP_prevPage();
  document.getElementById("QLSP_nextPage").onclick = () => QLSP_nextPage();
}

function QLSP_nextPage() {
  const totalPages = Math.ceil(QLSP_mangDaLoc.length / QLSP_itemsPerPage);
  if (QLSP_currentPage < totalPages) {
    QLSP_currentPage++;
    QLSP_veBangSanPham(QLSP_mangDaLoc);
  }
}

function QLSP_prevPage() {
  if (QLSP_currentPage > 1) {
    QLSP_currentPage--;
    QLSP_veBangSanPham(QLSP_mangDaLoc);
  }
}

// ================== MODAL THÊM ==================
const QLSP_modal = document.getElementById("QLSP_modalThemSP");
const QLSP_btnThemMoi = document.getElementById("QLSP_btnThemMoiSP");
const QLSP_btnClose = document.getElementById("QLSP_btnCloseModal");
const QLSP_btnCancel = document.getElementById("QLSP_btnCancelSP");
const QLSP_form = document.getElementById("QLSP_formThemSP");
const QLSP_preview = document.getElementById("QLSP_previewImage");
const QLSP_inputImage = document.getElementById("QLSP_spImage");

QLSP_btnThemMoi.addEventListener("click", () => {
  QLSP_modal.style.display = "flex";
});
QLSP_btnClose.addEventListener("click", QLSP_closeModal);
QLSP_btnCancel.addEventListener("click", QLSP_closeModal);

function QLSP_closeModal() {
  QLSP_modal.style.display = "none";
  QLSP_form.reset();
  QLSP_preview.innerHTML = "";
}

QLSP_inputImage.addEventListener("input", () => {
  const url = QLSP_inputImage.value.trim();
  QLSP_preview.innerHTML = url ? `<img src="${url}" alt="Ảnh sản phẩm">` : "";
});

// ================== THÊM SẢN PHẨM ==================
QLSP_formThemSP.addEventListener("submit", function (e) {
  e.preventDefault();
  let dsSanPham = getLocalProducts();
  const id = document.getElementById("QLSP_spId").value.trim();

  if (dsSanPham.some((sp) => sp.id.toLowerCase() === id.toLowerCase())) {
    alert("Mã sản phẩm đã tồn tại!");
    return;
  }

  const spMoi = {
    id,
    catalog: document.getElementById("QLSP_spCatalog").value,
    name: document.getElementById("QLSP_spName").value.trim(),
    gender: document.getElementById("QLSP_spGender").value,
    desc: document.getElementById("QLSP_spDesc").value.trim(),
    color: document.getElementById("QLSP_spColor").value.trim(),
    importPrice:
      parseFloat(document.getElementById("QLSP_spImportPrice").value) || 0,
    priceValue: 0,
    quantity: 0,
    image: document.getElementById("QLSP_spImage").value.trim(),
    price: "0₫",
    visibility: "visible",
    glass: document.getElementById("QLSP_spGlass").value,
    strap: document.getElementById("QLSP_spStrap").value,
    movement: document.getElementById("QLSP_spMovement").value.trim(),
    size: document.getElementById("QLSP_spSize").value.trim(),
    thickness: document.getElementById("QLSP_spThickness").value.trim(),
    weight: document.getElementById("QLSP_spWeight").value.trim(),
    origin: document.getElementById("QLSP_spOrigin").value.trim(),
    shape: document.getElementById("QLSP_spShape").value.trim(),
    waterRes: document.getElementById("QLSP_spWaterRes").value.trim(),
    description: document.getElementById("QLSP_spDescription").value.trim(),
  };

  dsSanPham.push(spMoi);
  saveLocalProducts(dsSanPham);
  QLSP_productsLocal = dsSanPham;
  QLSP_mangDaLoc = dsSanPham;
  QLSP_veBangSanPham(QLSP_mangDaLoc);
  QLSP_closeModal();
  alert("Thêm sản phẩm thành công!");
});

// ================== SỬA & XÓA ==================
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("QLSP_btn-sua")) {
    const id = e.target.closest("tr").children[1].textContent.trim();
    const product = QLSP_productsLocal.find((p) => p.id === id);
    if (product) QLSP_openEditModal(product);
  }

  if (e.target.classList.contains("QLSP_btn-xoa")) {
    const id = e.target.closest("tr").children[1].textContent.trim();
    if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      QLSP_productsLocal = QLSP_productsLocal.filter((sp) => sp.id !== id);
      saveLocalProducts(QLSP_productsLocal);
      QLSP_mangDaLoc = QLSP_productsLocal;
      QLSP_veBangSanPham(QLSP_mangDaLoc);
      alert("Xóa sản phẩm thành công!");
    }
  }
});

// ================== MODAL SỬA ==================
function QLSP_openEditModal(product) {
  const modal = document.getElementById("QLSP_modalSuaSP");
  modal.style.display = "flex";

  document.getElementById("QLSP_editId").value = product.id;
  document.getElementById("QLSP_editCatalog").value = product.catalog;
  document.getElementById("QLSP_editName").value = product.name;
  document.getElementById("QLSP_editGender").value = product.gender;
  document.getElementById("QLSP_editDesc").value = product.desc;
  document.getElementById("QLSP_editColor").value = product.color;
  document.getElementById("QLSP_editImportPrice").value = product.importPrice;
  document.getElementById("QLSP_editVisibility").value = product.visibility;
  document.getElementById("QLSP_editGlass").value = product.glass;
  document.getElementById("QLSP_editStrap").value = product.strap;

  document.getElementById("QLSP_editMovement").value = product.movement || "";
  document.getElementById("QLSP_editSize").value = product.size || "";
  document.getElementById("QLSP_editThickness").value = product.thickness || "";
  document.getElementById("QLSP_editWeight").value = product.weight || "";
  document.getElementById("QLSP_editOrigin").value = product.origin || "";
  document.getElementById("QLSP_editShape").value = product.shape || "";
  document.getElementById("QLSP_editWaterRes").value = product.waterRes || "";
  document.getElementById("QLSP_editDescription").value =
    product.description || "";

  let imgSrc = product.image || "";
  if (imgSrc && !imgSrc.startsWith("http"))
    imgSrc = "../" + imgSrc.replace(/^(\.\/)*/, "");
  document.getElementById("QLSP_editImage").value = product.image;
  document.getElementById("QLSP_previewEditImg").src = imgSrc;
}

document
  .getElementById("QLSP_editImage")
  .addEventListener("input", function () {
    const link = this.value.trim();
    document.getElementById("QLSP_previewEditImg").src = link;
  });

document
  .getElementById("QLSP_btnUpdateSP")
  .addEventListener("click", function () {
    const id = document.getElementById("QLSP_editId").value.trim();
    let dsSanPham = getLocalProducts();
    const index = dsSanPham.findIndex((sp) => sp.id === id);
    if (index === -1) {
      alert("Không tìm thấy sản phẩm cần sửa!");
      return;
    }

    dsSanPham[index] = {
      ...dsSanPham[index],
      catalog: document.getElementById("QLSP_editCatalog").value,
      name: document.getElementById("QLSP_editName").value.trim(),
      gender: document.getElementById("QLSP_editGender").value,
      desc: document.getElementById("QLSP_editDesc").value.trim(),
      color: document.getElementById("QLSP_editColor").value.trim(),
      importPrice:
        parseFloat(document.getElementById("QLSP_editImportPrice").value) || 0,
      visibility: document.getElementById("QLSP_editVisibility").value,
      glass: document.getElementById("QLSP_editGlass").value,
      strap: document.getElementById("QLSP_editStrap").value,
      movement: document.getElementById("QLSP_editMovement").value.trim(),
      size: document.getElementById("QLSP_editSize").value.trim(),
      thickness: document.getElementById("QLSP_editThickness").value.trim(),
      weight: document.getElementById("QLSP_editWeight").value.trim(),
      origin: document.getElementById("QLSP_editOrigin").value.trim(),
      shape: document.getElementById("QLSP_editShape").value.trim(),
      waterRes: document.getElementById("QLSP_editWaterRes").value.trim(),
      description: document.getElementById("QLSP_editDescription").value.trim(),
      image: document.getElementById("QLSP_editImage").value.trim(),
    };

    saveLocalProducts(dsSanPham);
    QLSP_productsLocal = dsSanPham;
    QLSP_mangDaLoc = dsSanPham;
    QLSP_veBangSanPham(QLSP_mangDaLoc);
    QLSP_closeEditModal();
    alert("Cập nhật sản phẩm thành công!");
  });

document
  .getElementById("QLSP_btnCloseModalSua")
  .addEventListener("click", QLSP_closeEditModal);
document
  .getElementById("QLSP_btnCancelEdit")
  .addEventListener("click", QLSP_closeEditModal);
function QLSP_closeEditModal() {
  document.getElementById("QLSP_modalSuaSP").style.display = "none";
}

// ==================== LỌC & TÌM KIẾM ====================
function QLSP_locTheoDanhMuc() {
  const danhMuc = document.getElementById("QLSP_locDanhMuc").value;
  if (danhMuc === "all") {
    QLSP_mangDaLoc = QLSP_productsLocal;
  } else {
    QLSP_mangDaLoc = QLSP_productsLocal.filter(
      (sp) => sp.catalog.toUpperCase() === danhMuc.toUpperCase()
    );
  }
  QLSP_currentPage = 1;
  QLSP_veBangSanPham(QLSP_mangDaLoc);
}

function QLSP_timTheoMa() {
  const searchValue = document
    .getElementById("QLSP_timId")
    .value.trim()
    .toLowerCase();
  const selectedCatalog = document.getElementById("QLSP_locDanhMuc").value;

  QLSP_mangDaLoc = QLSP_productsLocal.filter((sp) => {
    const matchId = sp.id.toLowerCase().includes(searchValue);
    const matchCatalog =
      selectedCatalog === "all" ||
      sp.catalog.toUpperCase() === selectedCatalog.toUpperCase();
    return matchId && matchCatalog;
  });

  QLSP_currentPage = 1;
  QLSP_veBangSanPham(QLSP_mangDaLoc);
  document.getElementById("QLSP_timId").value = "";
}

// ==================== ĐỒNG BỘ GIỮA CÁC TAB ====================
window.addEventListener("storage", (event) => {
  if (event.key === "productsLocal") {
    QLSP_productsLocal = getLocalProducts();
    QLSP_mangDaLoc = QLSP_productsLocal;
    QLSP_veBangSanPham(QLSP_mangDaLoc);
  }
});

// Nghe thay đổi localStorage từ tab khác
window.addEventListener("storage", (event) => {
  if (event.key === "productsLocal") {
    window.dispatchEvent(new Event("productsUpdated"));
  }
});
