document.addEventListener("DOMContentLoaded", () => {
  const sectionDiaChi = document.getElementById("section-diachi");
  if (!sectionDiaChi) return;

  const sideAvatar = document.getElementById("sideAvatar-diachi");
  const sideUsername = document.getElementById("sideUsername-diachi");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const DEFAULT_AVATAR = "./assets/img/Avatar/avtuser.jpg";

  if (currentUser) {
    if (sideAvatar) sideAvatar.src = currentUser.avatar || DEFAULT_AVATAR;
    if (sideUsername) sideUsername.textContent = currentUser.userName || "Người dùng";
  }

  const addressListEl = document.getElementById("addressList");
  const addBtn = document.getElementById("addAddressBtn");
  const addressFormWrap = document.getElementById("addressFormWrap");
  const addressForm = document.getElementById("addressForm");
  const cancelAddr = document.getElementById("cancelAddr");

  const addEmail = document.getElementById("addEmail");
  const addrName = document.getElementById("addrName");
  const addrPhone = document.getElementById("addrPhone");
  const addrAddress = document.getElementById("addAddress"); 
  const addressFormTitle = document.getElementById("addressFormTitle");

  let user = JSON.parse(localStorage.getItem("currentUser")) || null;
  let editIndex = -1;

  // Render danh sách địa chỉ
  const render = () => {
    if (!user) return;
    if (!Array.isArray(user.addresses)) user.addresses = [];

    // Sidebar
    if (sideAvatar) sideAvatar.src = user.avatar || DEFAULT_AVATAR;
    if (sideUsername) sideUsername.textContent = user.userName || "";

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
      <div class="addr-name"><strong>Người nhận:</strong> ${a.name}</div>
      <div class="addr-phone"><strong>Số điện thoại:</strong> ${a.phone}</div>
      <div class="addr-email"><strong>Email:</strong> ${a.email || ""}</div>
      <div class="addr-address"><strong>Địa chỉ:</strong> ${a.address}</div>
      `;

      const right = document.createElement("div");
      right.className = "address-right";
      right.innerHTML = a.default
        ? `<div class="addr-badge">Mặc định</div>`
        : `<div style="height:18px;"></div>`;

      const btns = document.createElement("div");
      btns.style.marginTop = "8px";
      btns.innerHTML = `
        ${a.default ? "" : `<button class="save-btn set-default-btn" data-idx="${idx}">Thiết lập mặc định</button>`}
        <button class="cancel-btn edit-btn" data-idx="${idx}">Cập nhật</button>
        <button class="cancel-btn del-btn" data-idx="${idx}">Xóa</button>
      `;

      right.appendChild(btns);
      card.appendChild(left);
      card.appendChild(right);

      //  Click chọn địa chỉ
      left.addEventListener("click", () => {
        localStorage.setItem("selectedAddress", JSON.stringify(a));
        alert("Đã chọn địa chỉ: " + a.address);
      });

      addressListEl.appendChild(card);
    });

    //  Thiết lập mặc định
    document.querySelectorAll(".set-default-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const i = Number(e.currentTarget.dataset.idx);
        user.addresses = user.addresses.map((ad, j) => ({ ...ad, default: j === i }));
        const selected = user.addresses[i];
        localStorage.setItem("selectedAddress", JSON.stringify(selected)); 
        saveAndRender();
      });
    });

    //  Cập nhật
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        editIndex = Number(e.currentTarget.dataset.idx);
        const a = user.addresses[editIndex];
        addressFormWrap.classList.remove("hidden");
        addressFormTitle.textContent = "Cập nhật địa chỉ";
        addrName.value = a.name;
        addrPhone.value = a.phone;
        addEmail.value = a.email;
        addrAddress.value = a.address;
      });
    });

    //  Xóa
    document.querySelectorAll(".del-btn").forEach(btn => {
      btn.addEventListener("click", e => {
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

  // Save và Render lại
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


  // Nút Thêm địa chỉ
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
    addressForm.reset();
    addressFormWrap.classList.remove("hidden");
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });

  // Nút Hủy
  cancelAddr.addEventListener("click", () => {
    addressForm.reset();
    addressFormWrap.classList.add("hidden");
  });

  // Submit form
  addressForm.addEventListener("submit", e => {
    e.preventDefault();
    if (!user) return;

    const name = addrName.value.trim();
    const phone = addrPhone.value.trim();
    const email = addEmail.value.trim();
    const address = addrAddress.value.trim();

    if (!name || !phone || !email || !address) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (!Array.isArray(user.addresses)) user.addresses = [];

    if (editIndex === -1) {
      const newAddr = { name, phone, email, address};
      user.addresses.push(newAddr);
    } else {
      user.addresses[editIndex] = { ...user.addresses[editIndex], name, phone, email, address };
    }

    saveAndRender();
    addressForm.reset();
    addressFormWrap.classList.add("hidden");
  });


  // Hiển thị section  
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
