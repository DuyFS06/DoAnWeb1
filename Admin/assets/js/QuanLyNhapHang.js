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

// tự reaload lại dữ liệu khi nghe thấy thay đổi
window.addEventListener("productsUpdated", () => {
  QLNH_productsLocal = getLocalProducts();
  QLNH_mangDaLocSanPham = QLNH_productsLocal;
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
function removeLocalPhieuNhap() {
  localStorage.removeItem("phieuNhapLocal");
}

// ======== HÀM XỬ LÍ SỰ KIỆN =========
function QLNH_ganSuKien() {
  // Gắn sự kiện: thay đổi bất kỳ bộ lọc nào → gọi hàm tổng hợp
  document
    .getElementById("QLNH_locTrangThai")
    ?.addEventListener("change", QLNH_locTongHop);
  document
    .getElementById("QLNH_timKiemPhieu")
    ?.addEventListener("input", () => {
      setTimeout(QLNH_locTongHop, 300); // debounce 300ms
    });
  document
    .getElementById("QLNH_LocTuNgay")
    ?.addEventListener("change", QLNH_locTongHop);
  document
    .getElementById("QLNH_LocDenNgay")
    ?.addEventListener("change", QLNH_locTongHop);

  // Nút Xóa lọc ngày
  document
    .getElementById("QLNH_btnXoaLocNgay")
    ?.addEventListener("click", () => {
      document.getElementById("QLNH_LocTuNgay").value = "";
      document.getElementById("QLNH_LocDenNgay").value = "";
      QLNH_locTongHop();
    });
}

// ==================== BẢNG ====================
function QLNH_veBangPhieuNhap(ds) {
  const tableContent = document.querySelector(".QLNH_table-content");
  tableContent.innerHTML = "";
  const table = document.createElement("table");
  table.classList.add("QLNH_admin-table");
  const tbody = document.createElement("tbody");

  ds.sort((a, b) => {
    if (a.trangThai === "chuaHoanThanh" && b.trangThai === "hoanThanh")
      return -1;
    if (a.trangThai === "hoanThanh" && b.trangThai === "chuaHoanThanh")
      return 1;
    return 0;
  });

  const start = (QLNH_currentPage - 1) * QLNH_itemsPerPage;
  const end = start + QLNH_itemsPerPage;
  const dataShow = ds.slice(start, end);

  dataShow.forEach((phieu, index) => {
    const hoanThanhChecked =
      phieu.trangThai === "hoanThanh" ? "checked disabled" : "";
    let tacVuHTML = "";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${start + index + 1}</td>
      <td>${phieu.maPhieuNhap}</td>
      <td>${new Date(phieu.ngayNhap).toLocaleString("vi-VN")}</td>
      <td>${phieu.tongTien.toLocaleString("vi-VN")}₫</td>
      <td><button class="QLNH_btn-xem" data-ma="${
        phieu.maPhieuNhap
      }">Xem</button></td>
      <td style="text-align:center;">
        <input type="checkbox" class="QLNH_chkHoanThanh" data-ma="${
          phieu.maPhieuNhap
        }" ${hoanThanhChecked} />
      </td>
      <td>${
        phieu.trangThai === "hoanThanh"
          ? ""
          : `
        <button class="QLNH_btn-sua" data-ma="${phieu.maPhieuNhap}">Sửa</button>
        <button class="QLNH_btn-xoa" data-ma="${phieu.maPhieuNhap}">Xóa</button>
    `
      }</td>`;
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
  document.querySelectorAll(".QLNH_chkHoanThanh").forEach((chk) => {
    chk.addEventListener("change", function () {
      const maPhieu = this.dataset.ma;
      if (this.checked) {
        QLNH_hoanThanhPhieuNhap(maPhieu);
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("QLNH_btn-sua"))
      QLNH_suaPhieuNhap(e.target.dataset.ma);
  });

  document.querySelectorAll(".QLNH_btn-xoa").forEach((btn) =>
    btn.addEventListener("click", () => {
      const ma = btn.dataset.ma;
      QLNH_xoaPhieuNhap(ma);
    })
  );

  document.querySelectorAll(".QLNH_btn-hoan-thanh").forEach((btn) => {
    btn.addEventListener("click", () => {
      const maPhieu = btn.dataset.ma;
      QLNH_hoanThanhPhieuNhap(maPhieu);
    });
  });
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
// ==================== LỌC TỔNG HỢP: NGÀY + ID + TRẠNG THÁI ====================
function QLNH_locTongHop() {
  const tuNgay = document.getElementById("QLNH_LocTuNgay").value;
  const denNgay = document.getElementById("QLNH_LocDenNgay").value;
  const timKiem = document
    .getElementById("QLNH_timKiemPhieu")
    .value.trim()
    .toLowerCase();
  const trangThai = document.getElementById("QLNH_locTrangThai").value;

  let mangLoc = QLNH_phieuNhapLocal;

  // 1. Lọc theo trạng thái
  if (trangThai !== "all") {
    mangLoc = mangLoc.filter((p) => p.trangThai === trangThai);
  }

  // 2. Lọc theo ID phiếu
  if (timKiem) {
    mangLoc = mangLoc.filter((p) =>
      p.maPhieuNhap.toLowerCase().includes(timKiem)
    );
  }

  // 3. Lọc theo khoảng ngày
  if (tuNgay || denNgay) {
    mangLoc = mangLoc.filter((p) => {
      const ngayNhap = new Date(p.ngayNhap);
      const tu = tuNgay ? new Date(tuNgay) : null;
      const den = denNgay ? new Date(denNgay) : null;

      if (tu && den) {
        // Cùng ngày: so sánh không giờ
        const start = new Date(tu.getFullYear(), tu.getMonth(), tu.getDate());
        const end = new Date(den.getFullYear(), den.getMonth(), den.getDate());
        const current = new Date(
          ngayNhap.getFullYear(),
          ngayNhap.getMonth(),
          ngayNhap.getDate()
        );
        return current >= start && current <= end;
      } else if (tu) {
        const start = new Date(tu.getFullYear(), tu.getMonth(), tu.getDate());
        const current = new Date(
          ngayNhap.getFullYear(),
          ngayNhap.getMonth(),
          ngayNhap.getDate()
        );
        return current >= start;
      } else if (den) {
        const end = new Date(den.getFullYear(), den.getMonth(), den.getDate());
        const current = new Date(
          ngayNhap.getFullYear(),
          ngayNhap.getMonth(),
          ngayNhap.getDate()
        );
        return current <= end;
      }
      return true;
    });
  }

  // Cập nhật bảng
  QLNH_mangDaLocPhieu = mangLoc;
  QLNH_currentPage = 1;
  QLNH_veBangPhieuNhap(QLNH_mangDaLocPhieu);
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
  // Gán ngày mặc định = hôm nay
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  document.getElementById("QLNH_ngayNhapMoi").value = `${yyyy}-${mm}-${dd}`;
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
    <td style="position: relative;">
      <select class="QLNH_selectSP">
        <option value="">-- Chọn mã sản phẩm --</option>
      </select>
    </td>
    <td class="QLNH_tenSP"></td>
    <td class="QLNH_giaNhap"></td>
    <td><input type="number" class="QLNH_soLuong" min="1" value="1" /></td>
    <td class="QLNH_thanhTien"></td>
    <td><button class="QLNH_btn-xoa-sp">Xóa</button></td>
  `;
  tbody.appendChild(row);

  const selectEl = row.querySelector(".QLNH_selectSP");
  const soLuongInput = row.querySelector(".QLNH_soLuong");

  // Populate select with all products
  selectEl.setAttribute('size', '5'); // Set size to show 5 options at a time
  
  // Add default option
  const defaultOpt = document.createElement('option');
  defaultOpt.value = "";
  defaultOpt.textContent = "-- Chọn mã sản phẩm --";
  selectEl.appendChild(defaultOpt);

  QLNH_productsLocal.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.id} || ${p.name}`;
    selectEl.appendChild(opt);
  });

  // Thêm sự kiện khi focus vào select
  selectEl.addEventListener('focus', function() {
    this.setAttribute('size', '5');
  });

  // Thêm sự kiện khi blur (click ra ngoài)
  selectEl.addEventListener('blur', function() {
    this.setAttribute('size', '1');
  });

  // Thêm sự kiện khi chọn một option
  selectEl.addEventListener('change', function() {
    this.setAttribute('size', '1');
  });

  // when product selected, fill name & price
  selectEl.addEventListener('change', function () {
    const pid = selectEl.value;
    const product = QLNH_productsLocal.find(p => p.id === pid);
    if (product) {
      row.querySelector('.QLNH_tenSP').textContent = product.name;
      row.querySelector('.QLNH_giaNhap').textContent = product.importPrice.toLocaleString('vi-VN') + '₫';
    } else {
      row.querySelector('.QLNH_tenSP').textContent = '';
      row.querySelector('.QLNH_giaNhap').textContent = '';
    }
    QLNH_capNhatThanhTien(row);
  });

  // end select behavior

  // Cập nhật thành tiền
  soLuongInput.addEventListener("input", () => QLNH_capNhatThanhTien(row));

  // Xóa dòng
  row.querySelector(".QLNH_btn-xoa-sp").addEventListener("click", () => {
    row.remove();
    QLNH_capNhatTongTien();
  });
}

// ====== Cập nhật thành tiền 1 dòng ======
function QLNH_capNhatThanhTien(row) {
  const maEl = row.querySelector(".QLNH_selectSP") || row.querySelector(".QLNH_maSP");
  const ma = maEl ? maEl.value.trim() : "";
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
    const maEl = r.querySelector(".QLNH_selectSP") || r.querySelector(".QLNH_maSP");
    const ma = maEl ? maEl.value.trim() : "";
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
    const maEl = r.querySelector(".QLNH_selectSP") || r.querySelector(".QLNH_maSP");
    const ma = maEl ? maEl.value.trim() : "";
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
      <td>
        <select class="QLNH_selectSP">
          <option value="">-- Chọn mã sản phẩm --</option>
        </select>
      </td>
      <td class="QLNH_tenSP">${tenSP}</td>
      <td class="QLNH_giaNhap">${giaNhap}</td>
      <td><input type="number" class="QLNH_soLuong" value="${ct.soLuongNhap}" min="1" /></td>
      <td class="QLNH_thanhTien">${thanhTien}</td>
      <td><button class="QLNH_btn-xoa-sp">Xóa</button></td>
    `;
    tbody.appendChild(row);

    // Populate select with all products
    const selectEl = row.querySelector('.QLNH_selectSP');
    selectEl.setAttribute('size', '1'); // Start with size 1
    
    // Add all products
    QLNH_productsLocal.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.id} || ${p.name}`;
      if (p.id === ct.maSanPham) {
        opt.selected = true;
      }
      selectEl.appendChild(opt);
    });

    // Thêm sự kiện khi focus vào select
    selectEl.addEventListener('focus', function() {
      this.setAttribute('size', '5');
    });

    // Thêm sự kiện khi blur (click ra ngoài)
    selectEl.addEventListener('blur', function() {
      this.setAttribute('size', '1');
    });

    // Thêm sự kiện khi chọn một option
    selectEl.addEventListener('change', function() {
      this.setAttribute('size', '1');
    });
    selectEl.addEventListener('change', () => {
      const pid = selectEl.value;
      const prod = QLNH_productsLocal.find(p => p.id === pid);
      if (prod) {
        row.querySelector('.QLNH_tenSP').textContent = prod.name;
        row.querySelector('.QLNH_giaNhap').textContent = prod.importPrice.toLocaleString('vi-VN') + '₫';
      } else {
        row.querySelector('.QLNH_tenSP').textContent = '';
        row.querySelector('.QLNH_giaNhap').textContent = '';
      }
      QLNH_capNhatThanhTien(row);
    });

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
    const maEl = r.querySelector(".QLNH_selectSP") || r.querySelector(".QLNH_maSP");
    const ma = maEl ? maEl.value.trim() : "";
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

// Nghe thay đổi localStorage từ tab khác
window.addEventListener("storage", (event) => {
  if (event.key === "productsLocal") {
    window.dispatchEvent(new Event("productsUpdated"));
  }
});
