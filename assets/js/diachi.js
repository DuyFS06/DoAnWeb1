// assets/js/diachi.js
document.addEventListener("DOMContentLoaded", () => {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return window.location.href = "./DangNhap.html";

  const sideAvatar = document.getElementById("sideAvatar");
  const sideUsername = document.getElementById("sideUsername");
  sideAvatar.src = user.avatar || "/DoAnWeb1/assets/img/Avatar/avtuser.jpg";
  sideUsername.textContent = user.userName || "";

  // ensure addresses array
  if (!Array.isArray(user.addresses)) user.addresses = user.addresses || [];

  const addressListEl = document.getElementById("addressList");
  const addBtn = document.getElementById("addAddressBtn");
  const addressFormWrap = document.getElementById("addressFormWrap");
  const addressForm = document.getElementById("addressForm");
  const cancelAddr = document.getElementById("cancelAddr");
  const addrName = document.getElementById("addrName");
  const addrPhone = document.getElementById("addrPhone");
  const addrLine = document.getElementById("addrLine");
  const addressFormTitle = document.getElementById("addressFormTitle");

  let editIndex = -1;

  const render = () => {
    addressListEl.innerHTML = "";
    if (!user.addresses || user.addresses.length === 0) {
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

      if (a.default) {
        right.innerHTML = `<div class="addr-badge">Mặc định</div>`;
      } else {
        right.innerHTML = `<div style="height:18px;"></div>`;
      }

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

      // click trên left (ví dụ chọn địa chỉ cho thanh toán) — bạn có thể tùy chỉnh hành vi tại đây
      left.addEventListener("click", () => {
        // ví dụ: lưu địa chỉ đã chọn tạm thời vào localStorge để sử dụng ở checkout
        localStorage.setItem("selectedAddress", JSON.stringify(a));
        // bạn có thể redirect về trang checkout nếu muốn:
        // window.location.href = "../pages/Checkout.html";
        alert("Đã chọn địa chỉ: " + a.line);
      });

      addressListEl.appendChild(card);
    });

    // attach events
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
        // nếu xóa địa chỉ mặc định, thiết lập mặc định cho phần tử đầu nếu còn phần tử
        if (!user.addresses.some(a => a.default) && user.addresses.length > 0) {
          user.addresses[0].default = true;
        }
        saveAndRender();
      });
    });
  };

  const saveAndRender = () => {
    // save to currentUser and (optionally) userList
    localStorage.setItem("currentUser", JSON.stringify(user));
    try {
      const users = JSON.parse(localStorage.getItem("userList")) || [];
      const idx = users.findIndex(u => u.email === user.email);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...user };
        localStorage.setItem("userList", JSON.stringify(users));
      }
    } catch (err) {}
    render();
  };

  addBtn.addEventListener("click", () => {
    editIndex = -1;
    addressFormTitle.textContent = "Thêm địa chỉ";
    addrName.value = "";
    addrPhone.value = "";
    addrLine.value = "";
    addressFormWrap.classList.remove("hidden");
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });

  cancelAddr.addEventListener("click", () => {
    addressFormWrap.classList.add("hidden");
  });

  addressForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = addrName.value.trim();
    const phone = addrPhone.value.trim();
    const line = addrLine.value.trim();
    if (!name || !phone || !line) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (editIndex === -1) {
      const newAddr = { name, phone, line, default: user.addresses.length === 0 };
      user.addresses.push(newAddr);
    } else {
      user.addresses[editIndex] = { ...user.addresses[editIndex], name, phone, line };
    }
    saveAndRender();
    addressFormWrap.classList.add("hidden");
  });

  // initial render
  render();
});
