// ==================== CẤU HÌNH BAN ĐẦU ====================
const QLNH_itemsPerPage = 10;
let QLNH_currentPage = 1;
let QLNH_phieuNhapLocal = [];
let QLNH_productsLocal = [];
let QLNH_mangDaLocPhieu = [];
let QLNH_mangDaLocSanPham = [];

// ==================== KHI LOAD TRANG ====================
document.addEventListener("DOMContentLoaded", function () {
  QLNH_productsLocal = getLocalProducts();
  QLNH_phieuNhapLocal = getLocalPhieuNhap();
  QLNH_mangDaLocPhieu = QLNH_phieuNhapLocal;
  QLNH_mangDaLocSanPham = QLNH_productsLocal;
  QLNH_khoiTaoTrang();
  QLNH_veBangPhieuNhap(QLNH_mangDaLocPhieu);
  QLNH_ganSuKien();
});

// ======== HÀM KHỞI TẠO =========
function QLNH_khoiTaoTrang() {
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
  const modalThem = document.getElementById("QLNH_modalChiTietPhieuNhap");
  if (modalThem && modalThem.parentElement !== document.body) {
    document.body.appendChild(modalThem);
  }
  const modalSua = document.getElementById("QLNH_modalThemPhieuNhap");
  if (modalSua && modalSua.parentElement !== document.body) {
    document.body.appendChild(modalSua);
  }
});

// ======== HÀM LOCAL STORAGE =========
function getLocalPhieuNhap() {
  const data = localStorage.getItem("phieuNhapLocal");
  if (data) return JSON.parse(data);
  localStorage.setItem("phieuNhapLocal", JSON.stringify(dsPhieuNhapHang));
  return dsPhieuNhapHang;
}
function saveLocalPhieuNhap(data) {
  localStorage.setItem("phieuNhapLocal", JSON.stringify(data));
}

// ======== HÀM XỬ LÍ SỰ KIỆN =========
function QLNH_ganSuKien() {
  document
    .getElementById("QLNH_locTrangThai")
    .addEventListener("change", QLNH_locTheoTrangThai);

  document
    .getElementById("QLNH_timKiemPhieu")
    .addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        QLNH_timTheoMaPhieuNhap();
      }
    });

  document
    .getElementById("QLNH_locNgay")
    .addEventListener("change", function () {
      const ngayChon = this.value;
      if (!ngayChon) QLNH_mangDaLocPhieu = QLNH_phieuNhapLocal;
      else {
        QLNH_mangDaLocPhieu = QLNH_phieuNhapLocal.filter((p) => {
          const ngayPhieu = new Date(p.ngayNhap).toISOString().split("T")[0];
          return ngayPhieu === ngayChon;
        });
      }
      QLNH_currentPage = 1;
      QLNH_veBangPhieuNhap(QLNH_mangDaLocPhieu);
    });
}

// ==================== BẢNG ====================
function QLNH_veBangPhieuNhap(ds) {
  const tableContent = document.querySelector(".QLNH_table-content");
  tableContent.innerHTML = "";
  const table = document.createElement("table");
  table.classList.add("QLNH_admin-table");
  const tbody = document.createElement("tbody");

  const start = (QLNH_currentPage - 1) * QLNH_itemsPerPage;
  const end = start + QLNH_itemsPerPage;
  const dataShow = ds.slice(start, end);

  dataShow.forEach((phieu, index) => {
    const statusText =
      phieu.trangThai === "hoanThanh" ? "Completed" : "Pending";
    const statusClass =
      phieu.trangThai === "hoanThanh"
        ? "QLNH_status-completed"
        : "QLNH_status-pending";

    let tacVuHTML = "";
    if (phieu.trangThai === "hoanThanh") {
      tacVuHTML = `<button class="QLNH_btn-xoa" data-ma="${phieu.maPhieuNhap}">Xóa</button>`;
    } else {
      tacVuHTML = `
        <button class="QLNH_btn-sua" data-ma="${phieu.maPhieuNhap}">Sửa</button>
        <button class="QLNH_btn-hoan-thanh" data-ma="${phieu.maPhieuNhap}">Xong</button>`;
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${start + index + 1}</td>
      <td class="${statusClass}">${statusText}</td>
      <td>${phieu.maPhieuNhap}</td>
      <td>${new Date(phieu.ngayNhap).toLocaleString("vi-VN")}</td>
      <td>${phieu.tongTien.toLocaleString("vi-VN")}₫</td>
      <td><button class="QLNH_btn-xem" data-ma="${
        phieu.maPhieuNhap
      }">Xem</button></td>
      <td>${tacVuHTML}</td>`;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  tableContent.appendChild(table);
  QLNH_ganSuKienNutHanhDong();
  QLNH_capNhatPhanTrang(ds);
}

// ==================== PHÂN TRANG ====================
function QLNH_capNhatPhanTrang(ds) {
  const totalPages = Math.ceil(ds.length / QLNH_itemsPerPage);
  document.getElementById(
    "QLNH_pageInfo"
  ).textContent = `Trang ${QLNH_currentPage} / ${totalPages}`;
  document.getElementById("QLNH_prevPage").disabled = QLNH_currentPage === 1;
  document.getElementById("QLNH_nextPage").disabled =
    QLNH_currentPage === totalPages;
  document.getElementById("QLNH_prevPage").onclick = () => QLNH_prevPage(ds);
  document.getElementById("QLNH_nextPage").onclick = () => QLNH_nextPage(ds);
}

function QLNH_nextPage(ds) {
  const totalPages = Math.ceil(ds.length / QLNH_itemsPerPage);
  if (QLNH_currentPage < totalPages) {
    QLNH_currentPage++;
    QLNH_veBangPhieuNhap(ds);
  }
}
function QLNH_prevPage(ds) {
  if (QLNH_currentPage > 1) {
    QLNH_currentPage--;
    QLNH_veBangPhieuNhap(ds);
  }
}

// ==================== NÚT HÀNH ĐỘNG ====================
function QLNH_ganSuKienNutHanhDong() {
  document
    .querySelectorAll(".QLNH_btn-xem")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        QLNH_xemChiTietPhieuNhap(btn.dataset.ma)
      )
    );

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("QLNH_btn-sua"))
      QLNH_suaPhieuNhap(e.target.dataset.ma);
  });

  document.querySelectorAll(".QLNH_btn-xoa").forEach((btn) =>
    btn.addEventListener("click", () => {
      const ma = btn.dataset.ma;
      if (confirm("Bạn có chắc muốn xóa phiếu này?")) {
        QLNH_phieuNhapLocal = QLNH_phieuNhapLocal.filter(
          (p) => p.maPhieuNhap !== ma
        );
        saveLocalPhieuNhap(QLNH_phieuNhapLocal);
        QLNH_mangDaLocPhieu = QLNH_phieuNhapLocal;
        QLNH_veBangPhieuNhap(QLNH_phieuNhapLocal);
      }
    })
  );

  document.querySelectorAll(".QLNH_btn-hoan-thanh").forEach((btn) =>
    btn.addEventListener("click", () => {
      const phieu = QLNH_phieuNhapLocal.find(
        (p) => p.maPhieuNhap === btn.dataset.ma
      );
      if (phieu) {
        phieu.trangThai = "hoanThanh";
        saveLocalPhieuNhap(QLNH_phieuNhapLocal);
        QLNH_veBangPhieuNhap(QLNH_phieuNhapLocal);
        alert("Đã hoàn thành!");
      }
    })
  );
}

// ==================== XEM CHI TIẾT ====================
function QLNH_xemChiTietPhieuNhap(maPhieu) {
  const modal = document.getElementById("QLNH_modalChiTietPhieuNhap");
  const tbody = document.getElementById("QLNH_chiTietPhieuBody");
  const ngayNhapEl = document.getElementById("QLNH_chiTietNgayNhap");
  const tongTienEl = document.getElementById("QLNH_chiTietTongTien");

  const phieu = QLNH_phieuNhapLocal.find((p) => p.maPhieuNhap === maPhieu);
  if (!phieu) return;
  ngayNhapEl.textContent = new Date(phieu.ngayNhap).toLocaleString("vi-VN");
  tbody.innerHTML = "";

  phieu.chiTiet.forEach((ct, i) => {
    const sp = QLNH_productsLocal.find((p) => p.id === ct.maSanPham);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${ct.maSanPham}</td>
      <td>${sp ? sp.name : "Không tìm thấy"}</td>
      <td>${ct.soLuongNhap}</td>
      <td>${ct.giaNhap.toLocaleString("vi-VN")} ₫</td>
      <td>${ct.thanhTien.toLocaleString("vi-VN")} ₫</td>`;
    tbody.appendChild(tr);
  });

  tongTienEl.textContent = `${phieu.tongTien.toLocaleString("vi-VN")} ₫`;
  modal.style.display = "flex";
}

document.getElementById("QLNH_closeModalChiTiet").onclick = () =>
  (document.getElementById("QLNH_modalChiTietPhieuNhap").style.display =
    "none");

window.onclick = function (e) {
  const modal = document.getElementById("QLNH_modalChiTietPhieuNhap");
  if (e.target === modal) modal.style.display = "none";
};

// ==================== LỌC ====================
function QLNH_locTheoTrangThai() {
  const tt = document.getElementById("QLNH_locTrangThai").value;
  QLNH_mangDaLocPhieu =
    tt === "all"
      ? QLNH_phieuNhapLocal
      : QLNH_phieuNhapLocal.filter(
          (p) => p.trangThai.toUpperCase() === tt.toUpperCase()
        );
  QLNH_currentPage = 1;
  QLNH_veBangPhieuNhap(QLNH_mangDaLocPhieu);
}

function QLNH_timTheoMaPhieuNhap() {
  const input = document.getElementById("QLNH_timKiemPhieu");
  const val = input.value.trim().toLowerCase();
  const tt = document.getElementById("QLNH_locTrangThai").value;
  QLNH_mangDaLocPhieu = QLNH_phieuNhapLocal.filter((p) => {
    const okMa = p.maPhieuNhap.toLowerCase().includes(val);
    const okTT = tt === "all" || p.trangThai.toUpperCase() === tt.toUpperCase();
    return okMa && okTT;
  });
  QLNH_veBangPhieuNhap(QLNH_mangDaLocPhieu);
  input.value = "";
  input.focus();
}
/* ======================================== */
/* =========== MODAL THÊM PHIẾU NHẬP =========== */
const QLNH_modalThem = document.getElementById("QLNH_modalThemPhieuNhap");
const QLNH_btnMoThem = document.getElementById("QLNH_btnThemMoiPhieuNhap");
const QLNH_btnDongThem = document.getElementById("QLNH_closeModalThemPhieu");
const QLNH_btnHuyThem = document.getElementById("QLNH_btnHuyPhieuMoi");
const QLNH_btnLuuPhieuMoi = document.getElementById("QLNH_btnLuuPhieuMoi");
const QLNH_btnThemDongSP = document.getElementById("QLNH_btnThemDong");
const QLNH_tongTienNhap = document.getElementById("QLNH_tongTien");

// ====== Mở modal ======
QLNH_btnMoThem.onclick = () => {
  QLNH_modalThem.style.display = "flex";
  document.getElementById("QLNH_tableBodyNhap").innerHTML = "";
  QLNH_themDongSanPham();
};

// ====== Đóng modal ======
QLNH_btnDongThem.onclick = QLNH_btnHuyThem.onclick = () => {
  QLNH_modalThem.style.display = "none";
  document.querySelector(
    ".QLNH_modal-themphieu .QLNH_modal-header h2"
  ).textContent = "THÊM PHIẾU NHẬP MỚI";
};

// ====== Thêm dòng sản phẩm ======
QLNH_btnThemDongSP.addEventListener("click", QLNH_themDongSanPham);

function QLNH_themDongSanPham() {
  const tbody = document.getElementById("QLNH_tableBodyNhap");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input type="text" class="QLNH_maSP" placeholder="Nhập mã SP" /></td>
    <td class="QLNH_tenSP"></td>
    <td class="QLNH_giaNhap"></td>
    <td><input type="number" class="QLNH_soLuong" min="1" value="1" /></td>
    <td class="QLNH_thanhTien"></td>
    <td><button class="QLNH_btn-xoa-sp">Xóa</button></td>
  `;
  tbody.appendChild(row);

  const maInput = row.querySelector(".QLNH_maSP");
  const soLuongInput = row.querySelector(".QLNH_soLuong");

  maInput.addEventListener("input", function () {
    const product = QLNH_productsLocal.find((p) => p.id === this.value.trim());
    const tenCell = row.querySelector(".QLNH_tenSP");
    const giaCell = row.querySelector(".QLNH_giaNhap");

    if (product) {
      tenCell.textContent = product.name;
      giaCell.textContent = product.importPrice.toLocaleString("vi-VN") + "₫";
    } else {
      tenCell.textContent = "Không tồn tại";
      giaCell.textContent = "";
    }
    QLNH_capNhatThanhTien(row);
  });

  soLuongInput.addEventListener("input", () => QLNH_capNhatThanhTien(row));

  row.querySelector(".QLNH_btn-xoa-sp").addEventListener("click", () => {
    row.remove();
    QLNH_capNhatTongTien();
  });
}

// ====== Cập nhật thành tiền 1 dòng ======
function QLNH_capNhatThanhTien(row) {
  const ma = row.querySelector(".QLNH_maSP").value.trim();
  const sl = parseInt(row.querySelector(".QLNH_soLuong").value) || 0;
  const product = QLNH_productsLocal.find((p) => p.id === ma);
  const thanhTienCell = row.querySelector(".QLNH_thanhTien");

  if (product) {
    const thanhTien = product.importPrice * sl;
    thanhTienCell.textContent = thanhTien.toLocaleString("vi-VN") + "₫";
  } else {
    thanhTienCell.textContent = "";
  }
  QLNH_capNhatTongTien();
}

// ====== Tổng tiền ======
function QLNH_capNhatTongTien() {
  const rows = document.querySelectorAll("#QLNH_tableBodyNhap tr");
  let tong = 0;

  rows.forEach((r) => {
    const ma = r.querySelector(".QLNH_maSP").value.trim();
    const sl = parseInt(r.querySelector(".QLNH_soLuong").value) || 0;
    const product = QLNH_productsLocal.find((p) => p.id === ma);
    if (product) tong += product.importPrice * sl;
  });

  QLNH_tongTienNhap.textContent = tong.toLocaleString("vi-VN") + "₫";
}

// ====== Lưu phiếu nhập ======
QLNH_btnLuuPhieuMoi.onclick = () => {
  const ngayNhap = document.getElementById("QLNH_ngayNhapMoi").value;
  const trangThai = document.getElementById("QLNH_trangThaiPhieu").value;
  if (!ngayNhap) return alert("Vui lòng chọn ngày nhập!");

  const chiTiet = [];
  let tong = 0;

  document.querySelectorAll("#QLNH_tableBodyNhap tr").forEach((r) => {
    const ma = r.querySelector(".QLNH_maSP").value.trim();
    const ten = r.querySelector(".QLNH_tenSP").textContent.trim();
    const sl = parseInt(r.querySelector(".QLNH_soLuong").value) || 0;
    const giaText = r
      .querySelector(".QLNH_giaNhap")
      .textContent.replace(/[^\d]/g, "");
    const gia = parseFloat(giaText) || 0;

    if (!ma || !ten || sl <= 0 || gia <= 0) return;

    const thanhTien = sl * gia;
    tong += thanhTien;

    chiTiet.push({
      maSanPham: ma,
      tenSanPham: ten,
      soLuongNhap: sl,
      giaNhap: gia,
      thanhTien,
    });
  });

  if (chiTiet.length === 0) return alert("Chưa có sản phẩm hợp lệ!");

  if (trangThai === "hoanThanh") QLNH_capNhatTonKhoKhiHoanThanh(chiTiet);

  const maPhieu = "PN" + Date.now();
  const phieuMoi = {
    maPhieuNhap: maPhieu,
    ngayNhap,
    chiTiet,
    tongTien: tong,
    trangThai,
  };

  QLNH_phieuNhapLocal.push(phieuMoi);
  saveLocalPhieuNhap(QLNH_phieuNhapLocal);
  saveLocalProducts(QLNH_productsLocal);
  QLNH_mangDaLocPhieu = QLNH_phieuNhapLocal;
  alert("Đã lưu phiếu nhập!");
  QLNH_modalThem.style.display = "none";
  document.getElementById("QLNH_tableBodyNhap").innerHTML = "";
  QLNH_tongTienNhap.textContent = "0₫";
  QLNH_veBangPhieuNhap(QLNH_phieuNhapLocal);
};

/* ======= SỬA PHIẾU NHẬP ======= */
function QLNH_suaPhieuNhap(maPhieu) {
  const phieu = QLNH_phieuNhapLocal.find((p) => p.maPhieuNhap === maPhieu);
  if (!phieu) return alert("Không tìm thấy phiếu nhập!");
  if (phieu.trangThai === "hoanThanh") return alert("Phiếu đã hoàn thành!");

  const modal = document.getElementById("QLNH_modalThemPhieuNhap");
  modal.style.display = "flex";
  document.querySelector(
    ".QLNH_modal-themphieu .QLNH_modal-header h2"
  ).textContent = "SỬA PHIẾU NHẬP";

  document.getElementById("QLNH_ngayNhapMoi").value =
    phieu.ngayNhap.split("T")[0];
  document.getElementById("QLNH_trangThaiPhieu").value = phieu.trangThai;

  const tbody = document.getElementById("QLNH_tableBodyNhap");
  tbody.innerHTML = "";

  phieu.chiTiet.forEach((ct) => {
    const row = document.createElement("tr");
    const product = QLNH_productsLocal.find((p) => p.id === ct.maSanPham);
    const tenSP = product ? product.name : ct.tenSanPham || "Không tìm thấy";
    const giaNhap = ct.giaNhap.toLocaleString("vi-VN") + "₫";
    const thanhTien = ct.thanhTien.toLocaleString("vi-VN") + "₫";

    row.innerHTML = `
      <td><input type="text" class="QLNH_maSP" value="${ct.maSanPham}" /></td>
      <td class="QLNH_tenSP">${tenSP}</td>
      <td class="QLNH_giaNhap">${giaNhap}</td>
      <td><input type="number" class="QLNH_soLuong" value="${ct.soLuongNhap}" min="1" /></td>
      <td class="QLNH_thanhTien">${thanhTien}</td>
      <td><button class="QLNH_btn-xoa-sp">Xóa</button></td>
    `;
    tbody.appendChild(row);

    row
      .querySelector(".QLNH_maSP")
      .addEventListener("input", () => QLNH_capNhatThanhTien(row));
    row
      .querySelector(".QLNH_soLuong")
      .addEventListener("input", () => QLNH_capNhatThanhTien(row));
    row.querySelector(".QLNH_btn-xoa-sp").addEventListener("click", () => {
      row.remove();
      QLNH_capNhatTongTien();
    });
  });

  QLNH_capNhatTongTien();

  const btnLuu = document.getElementById("QLNH_btnLuuPhieuMoi");
  btnLuu.onclick = function () {
    QLNH_luuPhieuSua(phieu.maPhieuNhap);
  };
}

function QLNH_luuPhieuSua(maPhieu) {
  const ngayNhap = document.getElementById("QLNH_ngayNhapMoi").value;
  const trangThai = document.getElementById("QLNH_trangThaiPhieu").value;
  if (!ngayNhap) return alert("Vui lòng chọn ngày nhập!");

  const chiTiet = [];
  let tong = 0;
  document.querySelectorAll("#QLNH_tableBodyNhap tr").forEach((r) => {
    const ma = r.querySelector(".QLNH_maSP").value.trim();
    const ten = r.querySelector(".QLNH_tenSP").textContent.trim();
    const sl = parseInt(r.querySelector(".QLNH_soLuong").value) || 0;
    const giaText = r
      .querySelector(".QLNH_giaNhap")
      .textContent.replace(/[^\d]/g, "");
    const gia = parseFloat(giaText) || 0;
    if (!ma || sl <= 0 || gia <= 0) return;
    const thanhTien = sl * gia;
    tong += thanhTien;
    chiTiet.push({
      maSanPham: ma,
      tenSanPham: ten,
      soLuongNhap: sl,
      giaNhap: gia,
      thanhTien,
    });
  });

  if (chiTiet.length === 0) return alert("Chưa có sản phẩm hợp lệ!");
  if (trangThai === "hoanThanh") QLNH_capNhatTonKhoKhiHoanThanh(chiTiet);

  const index = QLNH_phieuNhapLocal.findIndex((p) => p.maPhieuNhap === maPhieu);
  if (index === -1) return;
  QLNH_phieuNhapLocal[index] = {
    maPhieuNhap: maPhieu,
    ngayNhap,
    chiTiet,
    tongTien: tong,
    trangThai,
  };
  saveLocalPhieuNhap(QLNH_phieuNhapLocal);
  QLNH_veBangPhieuNhap(QLNH_phieuNhapLocal);
  alert("Đã cập nhật phiếu nhập!");
  QLNH_modalThem.style.display = "none";
}

/* ====== CẬP NHẬT TỒN KHO ====== */
function QLNH_capNhatTonKhoKhiHoanThanh(chiTiet) {
  chiTiet.forEach((ct) => {
    const sp = QLNH_productsLocal.find((p) => p.id === ct.maSanPham);
    if (sp) sp.quantity = (sp.quantity || 0) + ct.soLuongNhap;
  });
  saveLocalProducts(QLNH_productsLocal);
}

/* ====== HOÀN THÀNH & XÓA ====== */
function QLNH_hoanThanhPhieuNhap(maPhieu) {
  const phieuIndex = QLNH_phieuNhapLocal.findIndex(
    (p) => p.maPhieuNhap === maPhieu
  );
  if (phieuIndex === -1) return alert("Không tìm thấy phiếu!");
  const phieu = QLNH_phieuNhapLocal[phieuIndex];
  if (phieu.trangThai === "hoanThanh") return alert("Đã hoàn thành!");

  QLNH_capNhatTonKhoKhiHoanThanh(phieu.chiTiet);
  phieu.trangThai = "hoanThanh";
  saveLocalPhieuNhap(QLNH_phieuNhapLocal);
  QLNH_veBangPhieuNhap(QLNH_phieuNhapLocal);
  alert(`Phiếu ${maPhieu} đã hoàn thành!`);
}

function QLNH_xoaPhieuNhap(maPhieu) {
  const index = QLNH_phieuNhapLocal.findIndex((p) => p.maPhieuNhap === maPhieu);
  if (index === -1) return alert("Không tìm thấy phiếu!");
  const phieu = QLNH_phieuNhapLocal[index];
  const xacNhan = confirm(
    phieu.trangThai === "hoanThanh"
      ? `Phiếu ${maPhieu} đã hoàn thành! Bạn có chắc muốn xóa không?`
      : `Bạn có chắc muốn xóa phiếu ${maPhieu}?`
  );
  if (!xacNhan) return;
  QLNH_phieuNhapLocal.splice(index, 1);
  saveLocalPhieuNhap(QLNH_phieuNhapLocal);
  QLNH_veBangPhieuNhap(QLNH_phieuNhapLocal);
  alert("Đã xóa phiếu nhập!");
}
