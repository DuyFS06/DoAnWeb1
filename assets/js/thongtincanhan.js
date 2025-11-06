
//  QUẢN LÝ TRANG THÔNG TIN CÁ NHÂN
document.addEventListener("DOMContentLoaded", () => {
  const sectionThongTin = document.getElementById("section-thongtincanhan");
  if (!sectionThongTin) return;


  // KHỞI TẠO SIDEBAR NGƯỜI DÙNG
  const sideAvatar = document.getElementById("sideAvatar-thongtin");
  const sideUsername = document.getElementById("sideUsername-thongtin");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    if (sideAvatar)
      sideAvatar.src = currentUser.avatar || "./assets/img/Avatar/avtuser.jpg";
    if (sideUsername)
      sideUsername.textContent = currentUser.userName || "Người dùng";
  }

  // LẤY CÁC TRƯỜNG TRONG FORM
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const phoneInput = document.getElementById("phoneInput");
  const addressInput = document.getElementById("addressInput");

  const formActions = document.getElementById("profileFormActions");
  const editBtn = document.getElementById("editProfileBtn");
  const cancelBtn = document.getElementById("cancelProfileBtn");
  const profileForm = document.getElementById("profileForm");

  // HÀM ĐIỀN DỮ LIỆU VÀO FORM
  function fillForm(user) {
    if (!user) return;
    nameInput.value = user.userName || "";
    emailInput.value = user.email || "";
    phoneInput.value = user.phone || "";
    addressInput.value = user.address || "";
  }


  // HIỂN THỊ FORM THÔNG TIN CÁ NHÂN
  window.showThongTinCaNhan = function () {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Cần đăng nhập",
        text: "Bạn phải đăng nhập để xem thông tin cá nhân.",
        confirmButtonText: "Đăng nhập",
      }).then(() => {
        if (typeof window.navigateTo === "function")
          window.navigateTo("login");
      });
      return;
    }

    sectionThongTin.style.display = "block";
    fillForm(user);
  };

  // CHO PHÉP CHỈNH SỬA FORM
  function enableEdit() {
    [nameInput, emailInput, phoneInput, addressInput].forEach((i) =>
      i.removeAttribute("readonly")
    );
    formActions.classList.remove("hidden");
    editBtn.style.display = "none";
  }

  // KHÓA LẠI FORM (chỉ xem)
  function disableEdit() {
    [nameInput, emailInput, phoneInput, addressInput].forEach((i) =>
      i.setAttribute("readonly", true)
    );
    formActions.classList.add("hidden");
    editBtn.style.display = "inline-block";
  }

 
  //  XỬ LÝ NÚT SỬA VÀ HỦY
  editBtn.addEventListener("click", enableEdit);
  cancelBtn.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    fillForm(user);
    disableEdit();
  });


  // LƯU DỮ LIỆU SAU KHI CHỈNH
  function saveUser() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    user.userName = nameInput.value.trim();
    user.email = emailInput.value.trim();
    user.phone = phoneInput.value.trim();
    user.address = addressInput.value.trim();

    // Cập nhật currentUser
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Cập nhật userList
    const userList = JSON.parse(localStorage.getItem("userList")) || [];
    const idx = userList.findIndex((u) => u.email === user.email);
    if (idx !== -1) userList[idx] = { ...userList[idx], ...user };
    localStorage.setItem("userList", JSON.stringify(userList));
  }

  // KHI NHẤN NÚT “LƯU”
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveUser();
    Swal.fire({
      icon: "success",
      title: "Thành công",
      text: "Cập nhật thông tin thành công!",
    });
    disableEdit();
  });

  // KHI LOAD TRANG
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) fillForm(user);
});
