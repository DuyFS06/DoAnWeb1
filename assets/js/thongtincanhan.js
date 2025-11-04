document.addEventListener("DOMContentLoaded", () => {
  const sectionThongTin = document.getElementById("section-thongtincanhan");
  if (!sectionThongTin) return;

  // side bar
  const sideAvatar = document.getElementById("sideAvatar-thongtin");
  const sideUsername = document.getElementById("sideUsername-thongtin");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if(currentUser){
    if(sideAvatar) sideAvatar.src = currentUser.avatar || "./assets/img/Avatar/avtuser.jpg";
    if(sideUsername) sideUsername.textContent = currentUser.userName || "Người dùng";
}

  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const phoneInput = document.getElementById("phoneInput");
  const addressInput = document.getElementById("addressInput");
  const formActions = document.getElementById("profileFormActions");
  const editBtn = document.getElementById("editProfileBtn");
  const cancelBtn = document.getElementById("cancelProfileBtn");
  const profileForm = document.getElementById("profileForm");

  function fillForm(user) {
    if (!user) return;
    nameInput.value = user.userName || "";
    emailInput.value = user.email || "";
    phoneInput.value = user.phone || "";
    addressInput.value = user.address || "";
  }

  function updateHosoDisplay(user) {
    if (!user) return;
    const hosoScript = window.showHosoSection;
    if (typeof hosoScript === "function") hosoScript();
  }

  window.showThongTinCaNhan = function () {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Cần đăng nhập",
        text: "Bạn phải đăng nhập để xem thông tin cá nhân.",
        confirmButtonText: "Đăng nhập",
      }).then(() => {
        if (typeof window.navigateTo === "function") window.navigateTo("login");
      });
      return;
    }

    sectionThongTin.style.display = "block";
    fillForm(user);
    updateHosoDisplay(user);
  };

  function enableEdit() {
    [nameInput, emailInput, phoneInput, addressInput].forEach(i => i.removeAttribute("readonly"));
    formActions.classList.remove("hidden");
    editBtn.style.display = "none";
  }

  function disableEdit() {
    [nameInput, emailInput, phoneInput, addressInput].forEach(i => i.setAttribute("readonly", true));
    formActions.classList.add("hidden");
    editBtn.style.display = "inline-block";
  }

  editBtn.addEventListener("click", enableEdit);
  cancelBtn.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    fillForm(user);
    disableEdit();
    updateHosoDisplay(user);
  });

  function saveUser() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    user.userName = nameInput.value.trim();
    user.email = emailInput.value.trim();
    user.phone = phoneInput.value.trim();
    user.address = addressInput.value.trim();

    localStorage.setItem("currentUser", JSON.stringify(user));

    const userList = JSON.parse(localStorage.getItem("userList")) || [];
    const idx = userList.findIndex(u => u.email === user.email);
    if (idx !== -1) userList[idx] = { ...userList[idx], ...user };
    localStorage.setItem("userList", JSON.stringify(userList));

    updateHosoDisplay(user);
  }

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveUser();
    Swal.fire({ icon: "success", title: "Thành công", text: "Cập nhật thông tin thành công!" });
    disableEdit();
  });

  [nameInput, emailInput, phoneInput, addressInput].forEach(i => i.addEventListener("input", saveUser));

  // Khi load trang
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    fillForm(user);
    updateHosoDisplay(user);
  }
});
