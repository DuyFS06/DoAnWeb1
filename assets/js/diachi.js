document.addEventListener("DOMContentLoaded", () => {
  const sectionDiaChi = document.getElementById("section-diachi");
  if (!sectionDiaChi) return;

  const sideAvatar = document.getElementById("sideAvatar-diachi");
  const sideUsername = document.getElementById("sideUsername-diachi");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(currentUser){
    if(sideAvatar) sideAvatar.src = currentUser.avatar || "./assets/img/Avatar/avtuser.jpg";
    if(sideUsername) sideUsername.textContent = currentUser.userName || "Người dùng";
}
  const addressListEl = document.getElementById("addressList");
  const addBtn = document.getElementById("addAddressBtn");
  const addressFormWrap = document.getElementById("addressFormWrap");
  const addressForm = document.getElementById("addressForm");
  const cancelAddr = document.getElementById("cancelAddr");
  const addrName = document.getElementById("addrName");
  const addrPhone = document.getElementById("addrPhone");
  const addrLine = document.getElementById("addrLine");
  const addressFormTitle = document.getElementById("addressFormTitle");

  let user = JSON.parse(localStorage.getItem("currentUser")) || null;
  let editIndex = -1;
  const DEFAULT_AVATAR = "./assets/img/Avatar/avtuser.jpg";

  // -----------------------------
  // Render addresses
  // -----------------------------
  const render = () => {
    if (!user) return;

    if (!Array.isArray(user.addresses)) user.addresses = [];

    // Sidebar
    if (sideAvatar) sideAvatar.src = user.avatar || DEFAULT_AVATAR;
    if (sideUsername) sideUsername.textContent = user.userName || "";

    // Đồng bộ sidebar hồ sơ
    const hosoAvatar = document.getElementById("sideAvatar-hoso");
    const hosoUsername = document.getElementById("sideUsername-hoso");
    if (hosoAvatar) hosoAvatar.src = user.avatar || DEFAULT_AVATAR;
    if (hosoUsername) hosoUsername.textContent = user.userName || "Người dùng";

    addressListEl.innerHTML = "";
    if (user.addresses.length === 0) {
      addressListEl.innerHTML = `<div class="empty-note">Bạn chưa có địa chỉ nào. Nhấn "Thêm địa chỉ mới" để bắt đầu.</div>`;
      return;
    }

    user.addresses.forEach((a, idx) => {
      const card = document.createElement("div");
      card.className = "address-card";

      const left = document.createElement("div");
      left.className = "address-left";
      left.innerHTML = `
        <div class="addr-name">${a.name} <span class="muted">(${a.phone})</span></div>
        <div class="addr-line">${a.line}</div>
      `;

      const right = document.createElement("div");
      right.className = "address-right";
      right.innerHTML = a.default ? `<div class="addr-badge">Mặc định</div>` : `<div style="height:18px;"></div>`;

      const btns = document.createElement("div");
      btns.style.marginTop = "8px";
      btns.innerHTML = `
        <button class="save-btn set-default-btn" data-idx="${idx}">Thiết lập mặc định</button>
        <button class="cancel-btn edit-btn" data-idx="${idx}">Cập nhật</button>
        <button class="cancel-btn del-btn" data-idx="${idx}">Xóa</button>
      `;

      right.appendChild(btns);
      card.appendChild(left);
      card.appendChild(right);

      left.addEventListener("click", () => {
        localStorage.setItem("selectedAddress", JSON.stringify(a));
        alert("Đã chọn địa chỉ: " + a.line);
      });

      addressListEl.appendChild(card);
    });

    // Events
    document.querySelectorAll(".set-default-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = Number(e.currentTarget.dataset.idx);
        user.addresses = user.addresses.map((ad, j) => ({ ...ad, default: j === i }));
        saveAndRender();
      });
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        editIndex = Number(e.currentTarget.dataset.idx);
        const a = user.addresses[editIndex];
        addressFormWrap.classList.remove("hidden");
        addressFormTitle.textContent = "Cập nhật địa chỉ";
        addrName.value = a.name;
        addrPhone.value = a.phone;
        addrLine.value = a.line;
      });
    });

    document.querySelectorAll(".del-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = Number(e.currentTarget.dataset.idx);
        if (!confirm("Bạn có chắc muốn xóa địa chỉ này?")) return;
        user.addresses.splice(i, 1);
        if (!user.addresses.some(a => a.default) && user.addresses.length > 0) {
          user.addresses[0].default = true;
        }
        saveAndRender();
      });
    });
  };

  const saveAndRender = () => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    const users = JSON.parse(localStorage.getItem("userList")) || [];
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...user };
      localStorage.setItem("userList", JSON.stringify(users));
    }
    render();
  };

  // ---- Nút thêm địa chỉ ----
  addBtn.addEventListener("click", () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Cần đăng nhập",
        text: "Bạn phải đăng nhập để thêm địa chỉ.",
        confirmButtonText: "Đăng nhập",
      }).then(() => {
        if (typeof window.navigateTo === "function") window.navigateTo("login");
      });
      return;
    }

    editIndex = -1;
    addressFormTitle.textContent = "Thêm địa chỉ";
    addrName.value = "";
    addrPhone.value = "";
    addrLine.value = "";
    addressFormWrap.classList.remove("hidden");
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });

  // ---- Nút hủy ----
  cancelAddr.addEventListener("click", () => {
    addressFormWrap.classList.add("hidden");
  });

  // ---- Submit form ----
  addressForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!user) return;

    const name = addrName.value.trim();
    const phone = addrPhone.value.trim();
    const line = addrLine.value.trim();

    if (!name || !phone || !line) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!Array.isArray(user.addresses)) user.addresses = [];

    if (editIndex === -1) {
      const newAddr = { name, phone, line, default: user.addresses.length === 0 };
      user.addresses.push(newAddr);
    } else {
      user.addresses[editIndex] = { ...user.addresses[editIndex], name, phone, line };
    }

    saveAndRender();
    addressFormWrap.classList.add("hidden");
  });

  // ---- Show section ----
  window.showDiaChiSection = function () {
    user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Cần đăng nhập",
        text: "Bạn phải đăng nhập để xem địa chỉ.",
        confirmButtonText: "Đăng nhập",
      }).then(() => {
        if (typeof window.navigateTo === "function") window.navigateTo("login");
      });
      return;
    }

    sectionDiaChi.style.display = "block";
    render();
  };
});
