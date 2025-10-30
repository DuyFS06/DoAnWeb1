// assets/js/thongtincanhan.js
document.addEventListener("DOMContentLoaded", () => {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return window.location.href = "../../DangNhap.html";

  document.getElementById("sideAvatar").src = user.avatar || "/DoAnWeb1/assets/img/Avatar/avtuser.jpg";
  document.getElementById("sideUsername").textContent = user.userName || "";

  const nameInput = document.getElementById("nameInput");
  const phoneInput = document.getElementById("phoneInput");
  const addressInput = document.getElementById("addressInput");

  nameInput.value = user.userName || "";
  phoneInput.value = user.phone || "";
  addressInput.value = user.address || "";

  document.getElementById("profileForm").addEventListener("submit", (e) => {
    e.preventDefault();

    user.userName = nameInput.value.trim();
    user.phone = phoneInput.value.trim();
    user.address = addressInput.value.trim();

    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Cập nhật thông tin cá nhân thành công!");
    location.reload();
  });
});