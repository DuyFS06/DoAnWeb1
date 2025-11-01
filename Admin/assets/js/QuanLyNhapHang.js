// ==================== CẤU HÌNH BAN ĐẦU ====================
const itemsPerPage = 10;
let currentPage = 1;
let phieuNhapLocal = [];
let productsLocal = [];
let mangDaLocPhieu = [];
let mangDaLocSanPham = [];
// ==================== KHI LOAD TRANG ====================
document.addEventListener("DOMContentLoaded", function () {
  productsLocal = getLocalProducts();
  phieuNhapLocal = getLocalPhieuNhap();
  mangDaLocPhieu = phieuNhapLocal;
  mangDaLocSanPham = productsLocal;
  // Khởi tạo trang quản lý nhập hàng
  khoiTaoTrang();
  //Vẽ bảng
  veBangPhieuNhap(mangDaLocPhieu);
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
// ======== HÀM LOCAL STORAGE =========
function getLocalPhieuNhap() {
  const data = localStorage.getItem("phieuNhapLocal");
  if (data) return JSON.parse(data);

  // Nếu chưa có thì lấy dữ liệu gốc (từ database/phieuNhapHang.js)
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
function ganSuKien() {
  document
    .getElementById("locTrangThai")
    .addEventListener("change", locTheoTrangThai);
  document
    .getElementById("timKiemPhieu")
    .addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        timTheoMaPhieuNhap();
      }
    });
  // lọc theo ngyaf
  document.getElementById("locNgay").addEventListener("change", function () {
    const ngayChon = this.value;
    if (!ngayChon) {
      // Nếu xóa chọn ngày => hiện toàn bộ
      mangDaLocPhieu = phieuNhapLocal;
    } else {
      // So sánh theo yyyy-mm-dd (vì input type="date" dùng format này)
      mangDaLocPhieu = phieuNhapLocal.filter((p) => {
        const ngayPhieu = new Date(p.ngayNhap).toISOString().split("T")[0];
        return ngayPhieu === ngayChon;
      });
    }

    currentPage = 1;
    veBangPhieuNhap(mangDaLocPhieu);
  });
}
// ==================== SỰ KIỆN NÚT TRONG BẢNG ====================
function ganSuKienNutHanhDong() {
  document.querySelectorAll(".btn-xem").forEach((btn) =>
    btn.addEventListener("click", () => {
      const maPhieu = btn.dataset.ma;
      xemChiTietPhieuNhap(maPhieu);
    })
  );
  //Sự kiện sửa
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-sua")) {
      const maPhieu = e.target.getAttribute("data-ma");
      suaPhieuNhap(maPhieu);
    }
  });
  document.querySelectorAll(".btn-xoa").forEach((btn) =>
    btn.addEventListener("click", () => {
      const maPhieu = btn.dataset.ma;
      if (confirm("Bạn có chắc muốn xóa phiếu nhập này?")) {
        phieuNhapLocal = phieuNhapLocal.filter(
          (p) => p.maPhieuNhap !== maPhieu
        );
        saveLocalPhieuNhap(phieuNhapLocal);
        mangDaLocPhieu = phieuNhapLocal;
        veBangPhieuNhap(phieuNhapLocal);
      }
    })
  );

  document.querySelectorAll(".btn-hoan-thanh").forEach((btn) =>
    btn.addEventListener("click", () => {
      const maPhieu = btn.dataset.ma;
      const phieu = phieuNhapLocal.find((p) => p.maPhieuNhap === maPhieu);
      if (phieu) {
        phieu.trangThai = "hoanThanh";
        saveLocalPhieuNhap(phieuNhapLocal);
        mangDaLocPhieu = phieuNhapLocal;
        veBangPhieuNhap(phieuNhapLocal);
        alert("Phiếu đã được hoàn thành!");
      }
    })
  );
}

// ======== HÀM TẠO BẢNG PHIẾU NHÂP =========
function veBangPhieuNhap(arrayName) {
  const tableContent = document.querySelector(".table-content");
  tableContent.innerHTML = "";
  // Tạo bảng
  const table = document.createElement("table");
  table.classList.add("admin-table");
  const tbody = document.createElement("tbody");
  // Tính phân trang
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const receiptToShow = arrayName.slice(start, end);
  // Duyệt qua danh sách phiếu
  receiptToShow.forEach((phieu, index) => {
    const statusText =
      phieu.trangThai === "hoanThanh" ? "Completed" : "Pending";
    const statusClass =
      phieu.trangThai === "hoanThanh" ? "status-completed" : "status-pending";
    // Cột tác vụ
    let tacVuHTML = "";
    if (phieu.trangThai === "hoanThanh") {
      tacVuHTML = `
        <button class="btn-xoa" data-ma="${phieu.maPhieuNhap}">Xóa</button>
      `;
    } else {
      tacVuHTML = `
        <button class="btn-sua" data-ma="${phieu.maPhieuNhap}">Sửa</button>
        <button class="btn-hoan-thanh" data-ma="${phieu.maPhieuNhap}">Xong  </button>
      `;
    }
    // Tạo hàng
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${start + index + 1}</td>
      <td class="${statusClass}">${statusText}</td>
      <td>${phieu.maPhieuNhap}</td>
      <td>${new Date(phieu.ngayNhap).toLocaleString("vi-VN")}</td>
      <td>${phieu.tongTien.toLocaleString("vi-VN")}₫</td>
      <td><button class="btn-xem" data-ma="${
        phieu.maPhieuNhap
      }">Xem</button></td>
      <td>${tacVuHTML}</td>
    `;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  tableContent.appendChild(table);
  // Sự kiện xem xóa hoàn thành
  ganSuKienNutHanhDong();
  // ======== CẬP NHẬT PHÂN TRANG =========
  capNhatPhanTrang(arrayName);
}

// ==================== PHÂN TRANG ====================
function capNhatPhanTrang(ds) {
  const totalPages = Math.ceil(ds.length / itemsPerPage);
  document.getElementById(
    "pageInfo"
  ).textContent = `Trang ${currentPage} / ${totalPages}`;

  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;

  document.getElementById("prevPage").onclick = function () {
    prevPage(ds);
  };
  document.getElementById("nextPage").onclick = function () {
    nextPage(ds);
  };
}

function nextPage(arrayName) {
  const totalPages = Math.ceil(arrayName.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    veBangPhieuNhap(arrayName);
  }
}

function prevPage(arrayName) {
  if (currentPage > 1) {
    currentPage--;
    veBangPhieuNhap(arrayName);
  }
}

// ==================== XEM CHI TIẾT PHIẾU ====================
function xemChiTietPhieuNhap(maPhieu) {
  const modal = document.getElementById("modalChiTietPhieuNhap");
  const tbody = document.getElementById("chiTietPhieuBody");
  const ngayNhapEl = document.getElementById("chiTietNgayNhap");
  const tongTienEl = document.getElementById("chiTietTongTien");

  // Tìm phiếu theo mã
  const phieu = phieuNhapLocal.find((p) => p.maPhieuNhap === maPhieu);
  if (!phieu) return;

  // Hiển thị ngày nhập
  const ngayNhap = new Date(phieu.ngayNhap).toLocaleString("vi-VN");
  ngayNhapEl.textContent = ngayNhap;

  // Xóa nội dung cũ
  tbody.innerHTML = "";

  // Duyệt chi tiết và render
  phieu.chiTiet.forEach((ct, index) => {
    const sp = productsLocal.find((p) => p.id === ct.maSanPham);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${ct.maSanPham}</td>
      <td>${sp ? sp.name : "Không tìm thấy"}</td>
      <td>${ct.soLuongNhap}</td>
      <td>${ct.giaNhap.toLocaleString("vi-VN")} ₫</td>
      <td>${ct.thanhTien.toLocaleString("vi-VN")} ₫</td>
    `;
    tbody.appendChild(tr);
  });

  // Tổng tiền
  tongTienEl.textContent = `${phieu.tongTien.toLocaleString("vi-VN")} ₫`;

  // Hiển thị modal
  modal.style.display = "flex";
}

// Đóng modal
document.getElementById("closeModalChiTiet").onclick = () => {
  document.getElementById("modalChiTietPhieuNhap").style.display = "none";
};

// Đóng khi click ra ngoài
window.onclick = function (event) {
  const modal = document.getElementById("modalChiTietPhieuNhap");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// ==================== HÀM TÌM THEO TRẠNG THÁI ====================
function locTheoTrangThai() {
  const trangThai = document.getElementById("locTrangThai").value;
  if (trangThai === "all") {
    mangDaLocPhieu = phieuNhapLocal;
  } else {
    mangDaLocPhieu = phieuNhapLocal.filter(
      (phieu) => phieu.trangThai.toUpperCase() === trangThai.toUpperCase()
    );
  }
  currentPage = 1;
  veBangPhieuNhap(mangDaLocPhieu);
}
function timTheoMaPhieuNhap() {
  const searchInput = document.getElementById("timKiemPhieu");
  const searchValue = searchInput.value.trim().toLowerCase();
  const trangThai = document.getElementById("locTrangThai").value;

  mangDaLocPhieu = phieuNhapLocal.filter((phieu) => {
    // Kiểm tra maPhieuNhap
    const maPhieu = phieu.maPhieuNhap;
    if (typeof maPhieu !== "string") return false;
    const maThoa = maPhieu.toLowerCase().includes(searchValue);
    // Kiểm tra trangThai
    const ttPhieu = phieu.trangThai;
    const trangThaiThoa =
      trangThai === "all" ||
      (typeof ttPhieu === "string" &&
        ttPhieu.toUpperCase() === trangThai.toUpperCase());
    return maThoa && trangThaiThoa;
  });
  currentPage = 1;
  veBangPhieuNhap(mangDaLocPhieu);
  searchInput.value = "";
  searchInput.focus();
}

/* ======================================== */
// ==================== MODAL THÊM PHIẾU NHẬP ====================
const modalThem = document.getElementById("modalThemPhieuNhap");
const btnMoThem = document.getElementById("btnThemMoiPhieuNhap");
const btnDongThem = document.getElementById("closeModalThemPhieu");
const btnHuyThem = document.getElementById("btnHuyPhieuMoi");
const btnLuuPhieuMoi = document.getElementById("btnLuuPhieuMoi");
const btnThemDongSP = document.getElementById("btnThemDong");
const tongTienNhap = document.getElementById("tongTien"); // sửa ID cho đúng HTML

// ====== Mở modal ======
btnMoThem.onclick = () => {
  modalThem.style.display = "flex";
  document.getElementById("tableBodyNhap").innerHTML = "";
  themDongSanPham(); // tự thêm dòng đầu tiên
};

// ====== Đóng modal ======
btnDongThem.onclick = btnHuyThem.onclick = () => {
  modalThem.style.display = "none";
  document.querySelector(".modal-themphieu .modal-header h2").textContent =
    "THÊM PHIẾU NHẬP MỚI";
};

// ====== Hàm thêm dòng sản phẩm ======
btnThemDongSP.addEventListener("click", themDongSanPham);

function themDongSanPham() {
  const tbody = document.getElementById("tableBodyNhap");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input type="text" class="maSP" placeholder="Nhập mã SP" /></td>
    <td class="tenSP"></td>
    <td class="giaNhap"></td>
    <td><input type="number" class="soLuong" min="1" value="1" /></td>
    <td class="thanhTien"></td>
    <td><button class="btn-xoa-sp">Xóa</button></td>
  `;
  tbody.appendChild(row);

  const maInput = row.querySelector(".maSP");
  const soLuongInput = row.querySelector(".soLuong");

  // Khi nhập mã sản phẩm
  maInput.addEventListener("input", function () {
    const product = productsLocal.find((p) => p.id === this.value.trim());
    const tenCell = row.querySelector(".tenSP");
    const giaCell = row.querySelector(".giaNhap");

    if (product) {
      tenCell.textContent = product.name;
      giaCell.textContent = product.importPrice.toLocaleString("vi-VN") + "₫";
    } else {
      tenCell.textContent = "Không tồn tại";
      giaCell.textContent = "";
    }
    capNhatThanhTien(row);
  });

  // Khi nhập số lượng
  soLuongInput.addEventListener("input", () => capNhatThanhTien(row));

  // Nút xóa
  row.querySelector(".btn-xoa-sp").addEventListener("click", () => {
    row.remove();
    capNhatTongTien();
  });
}

// ====== Cập nhật thành tiền cho 1 dòng ======
function capNhatThanhTien(row) {
  const ma = row.querySelector(".maSP").value.trim();
  const soLuong = parseInt(row.querySelector(".soLuong").value) || 0;
  const product = productsLocal.find((p) => p.id === ma);
  const thanhTienCell = row.querySelector(".thanhTien");

  if (product) {
    const thanhTien = product.importPrice * soLuong;
    thanhTienCell.textContent = thanhTien.toLocaleString("vi-VN") + "₫";
  } else {
    thanhTienCell.textContent = "";
  }

  capNhatTongTien();
}

// ====== Tính tổng tiền ======
function capNhatTongTien() {
  const rows = document.querySelectorAll("#tableBodyNhap tr");
  let tong = 0;

  rows.forEach((r) => {
    const ma = r.querySelector(".maSP").value.trim();
    const sl = parseInt(r.querySelector(".soLuong").value) || 0;
    const product = productsLocal.find((p) => p.id === ma);
    if (product) tong += product.importPrice * sl;
  });

  tongTienNhap.textContent = tong.toLocaleString("vi-VN") + "₫";
}

// ====== Lưu phiếu nhập ======
btnLuuPhieuMoi.onclick = () => {
  const ngayNhap = document.getElementById("ngayNhapMoi").value;
  const trangThai = document.getElementById("trangThaiPhieu").value;

  if (!ngayNhap) return alert("Vui lòng chọn ngày nhập!");

  const chiTiet = [];
  let tong = 0;

  document.querySelectorAll("#tableBodyNhap tr").forEach((r) => {
    const ma = r.querySelector(".maSP").value.trim();
    const ten = r.querySelector(".tenSP").textContent.trim();
    const sl = parseInt(r.querySelector(".soLuong").value) || 0;
    const giaText = r
      .querySelector(".giaNhap")
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

  if (trangThai === "hoanThanh") {
    capNhatTonKhoKhiHoanThanh(chiTiet);
  }
  if (chiTiet.length === 0) {
    alert("Chưa có sản phẩm hợp lệ trong phiếu!");
    return;
  }
  //sinh mã phiếu nhập tự động, duy nhất theo thời gian hiện tại
  const maPhieu = "PN" + Date.now();
  const phieuMoi = {
    maPhieuNhap: maPhieu,
    ngayNhap,
    chiTiet,
    tongTien: tong,
    trangThai,
  };

  // Lưu LocalStorage
  phieuNhapLocal.push(phieuMoi);
  saveLocalPhieuNhap(phieuNhapLocal);
  saveLocalProducts(productsLocal);
  mangDaLocPhieu = phieuNhapLocal;
  alert("Đã lưu phiếu nhập thành công!");
  modalThem.style.display = "none";
  document.getElementById("tableBodyNhap").innerHTML = "";
  tongTienNhap.textContent = "0₫";

  if (typeof veBangPhieuNhap === "function") veBangPhieuNhap(phieuNhapLocal);
};

// ================== XỬ LÝ SỬA PHIẾU NHẬP ==================
function suaPhieuNhap(maPhieu) {
  const phieu = phieuNhapLocal.find((p) => p.maPhieuNhap === maPhieu);
  if (!phieu) return alert("Không tìm thấy phiếu nhập!");

  if (phieu.trangThai === "hoanThanh") {
    alert("Phiếu đã hoàn thành, không thể sửa!");
    return;
  }

  // Mở modal và đặt tiêu đề
  const modal = document.getElementById("modalThemPhieuNhap");
  modal.style.display = "flex";
  document.querySelector(".modal-themphieu .modal-header h2").textContent =
    "SỬA PHIẾU NHẬP";

  // Đổ dữ liệu phiếu cũ vào form
  document.getElementById("ngayNhapMoi").value = phieu.ngayNhap.split("T")[0];
  document.getElementById("trangThaiPhieu").value = phieu.trangThai;

  const tbody = document.getElementById("tableBodyNhap");
  tbody.innerHTML = "";

  // Đổ dữ liệu chi tiết
  phieu.chiTiet.forEach((ct) => {
    const row = document.createElement("tr");
    const product = productsLocal.find((p) => p.id === ct.maSanPham);
    const tenSP = product ? product.name : ct.tenSanPham || "Không tìm thấy";
    const giaNhap = ct.giaNhap.toLocaleString("vi-VN") + "₫";
    const thanhTien = ct.thanhTien.toLocaleString("vi-VN") + "₫";

    row.innerHTML = `
      <td><input type="text" class="maSP" value="${ct.maSanPham}" /></td>
      <td class="tenSP">${tenSP}</td>
      <td class="giaNhap">${giaNhap}</td>
      <td><input type="number" class="soLuong" value="${ct.soLuongNhap}" min="1" /></td>
      <td class="thanhTien">${thanhTien}</td>
      <td><button class="btn-xoa-sp">Xóa</button></td>
    `;
    tbody.appendChild(row);

    // Sự kiện
    row
      .querySelector(".maSP")
      .addEventListener("input", () => capNhatThanhTien(row));
    row
      .querySelector(".soLuong")
      .addEventListener("input", () => capNhatThanhTien(row));
    row.querySelector(".btn-xoa-sp").addEventListener("click", () => {
      row.remove();
      capNhatTongTien();
    });
  });

  capNhatTongTien();

  // Gán lại nút Lưu để cập nhật thay vì thêm mới
  const btnLuu = document.getElementById("btnLuuPhieuMoi");
  btnLuu.onclick = function () {
    luuPhieuSua(phieu.maPhieuNhap);
  };
}

function luuPhieuSua(maPhieu) {
  const ngayNhap = document.getElementById("ngayNhapMoi").value;
  const trangThai = document.getElementById("trangThaiPhieu").value;

  if (!ngayNhap) return alert("Vui lòng chọn ngày nhập!");

  const chiTiet = [];
  let tong = 0;

  document.querySelectorAll("#tableBodyNhap tr").forEach((r) => {
    const ma = r.querySelector(".maSP").value.trim();
    const ten = r.querySelector(".tenSP").textContent.trim();
    const sl = parseInt(r.querySelector(".soLuong").value) || 0;
    const giaText = r
      .querySelector(".giaNhap")
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

  // Nếu sửa và chuyển sang “hoàn thành” → cập nhật tồn kho
  if (trangThai === "hoanThanh") {
    capNhatTonKhoKhiHoanThanh(chiTiet);
  }

  // Cập nhật lại phiếu trong localStorage
  const index = phieuNhapLocal.findIndex((p) => p.maPhieuNhap === maPhieu);
  if (index === -1) return;

  phieuNhapLocal[index] = {
    maPhieuNhap: maPhieu,
    ngayNhap,
    chiTiet,
    tongTien: tong,
    trangThai,
  };

  // Lưu lại
  saveLocalPhieuNhap(phieuNhapLocal);
  mangDaLocPhieu = phieuNhapLocal;
  alert("Đã cập nhật phiếu nhập thành công!");
  modalThem.style.display = "none";
  veBangPhieuNhap(phieuNhapLocal);
}

// ================== HÀM CHUNG: CẬP NHẬT TỒN KHO KHI PHIẾU HOÀN THÀNH ==================
function capNhatTonKhoKhiHoanThanh(chiTiet) {
  chiTiet.forEach((ct) => {
    const found = productsLocal.find((p) => p.id === ct.maSanPham);
    if (found) {
      //  cộng thêm số lượng
      found.quantity = (found.quantity || 0) + ct.soLuongNhap;
    }
  });

  saveLocalProducts(productsLocal);
}

// ================== XỬ LÝ HOÀN THÀNH PHIẾU NHẬP ==================
function hoanThanhPhieuNhap(maPhieuNhap) {
  // Tìm phiếu theo mã
  const phieuIndex = phieuNhapLocal.findIndex(
    (p) => p.maPhieuNhap === maPhieuNhap
  );
  if (phieuIndex === -1) {
    alert("Không tìm thấy phiếu nhập cần xử lý!");
    return;
  }

  const phieu = phieuNhapLocal[phieuIndex];
  // Nếu đã hoàn thành rồi thì không cần xử lý lại
  if (phieu.trangThai === "hoanThanh") {
    alert(`Phiếu ${maPhieuNhap} đã ở trạng thái "Hoàn thành"!`);
    return;
  }
  // Cập nhật tồn kho từng sản phẩm
  capNhatTonKhoKhiHoanThanh(phieu.chiTiet);

  phieuNhapLocal[phieuIndex].trangThai = "hoanThanh";
  // Lưu lại vào localStorage
  saveLocalPhieuNhap(phieuNhapLocal);
  saveLocalProducts(productsLocal);
  mangDaLocPhieu = phieuNhapLocal;
  productsLocal = productsLocal;
  veBangPhieuNhap(phieuNhapLocal);

  alert(
    `Phiếu ${maPhieuNhap} đã được chuyển sang trạng thái "Hoàn thành" và tồn kho đã được cập nhật!`
  );
}

// ================== XỬ LÝ XÓA PHIẾU NHẬP ==================
function xoaPhieuNhap(maPhieuNhap) {
  // Tìm phiếu theo mã
  const phieuIndex = phieuNhapLocal.findIndex(
    (p) => p.maPhieuNhap === maPhieuNhap
  );
  if (phieuIndex === -1) {
    alert("Không tìm thấy phiếu nhập cần xóa!");
    return;
  }

  const phieu = phieuNhapLocal[phieuIndex];

  // Nếu phiếu đã hoàn thành thì cảnh báo trước khi xóa
  if (phieu.trangThai === "hoanThanh") {
    const xacNhan = confirm(
      `Phiếu ${maPhieuNhap} đã hoàn thành!\nBạn có chắc chắn muốn xóa không?`
    );
    if (!xacNhan) return;
  } else {
    const xacNhan = confirm(
      `Bạn có chắc chắn muốn xóa phiếu nhập ${maPhieuNhap}?`
    );
    if (!xacNhan) return;
  }

  phieuNhapLocal.splice(phieuIndex, 1);

  saveLocalPhieuNhap(phieuNhapLocal);
  mangDaLocPhieu = phieuNhapLocal;
  veBangPhieuNhap(phieuNhapLocal);

  alert(`Phiếu ${maPhieuNhap} đã được xóa thành công!`);
}
