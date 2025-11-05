// Cần truy cập mảng products từ products.js
// products đã được định nghĩa là biến toàn cục trong products.js
// nên không cần import nếu 2 script được tải theo thứ tự
// (products.js tải trước chitietsanpham.js trong index.html)

/**
 * Hiển thị chi tiết sản phẩm và ẩn danh sách sản phẩm.
 * @param {string} productId ID của sản phẩm cần hiển thị
 */
let CTSP_products = getLocalProducts();
window.addEventListener("productsUpdated", () => {
  CTSP_products = getLocalProducts();
});
function showProductDetail(productId) {
  const product = CTSP_products.find((p) => p.id === productId);
  const detailContainer = document.getElementById("product-detail");
  const listContainer = document.getElementById("product-list-wrapper");
  const bannerContainer = document.querySelector(".banner");
  const GioHang = document.getElementById("GioHang");
  const Index = document.querySelector("#chitietsanpham-banner-index");

  if (!product) {
    alert("Không tìm thấy sản phẩm!");
    return;
  }

  // 1. Render chi tiết sản phẩm (Đã thêm nút "Quay lại")
  detailContainer.innerHTML = `
    <div class="product-info">
      <div class="left">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="right">
        
        <p class="desc">${product.desc}</p>
        <h2>${product.name}</h2>
        <p><strong>Màu sắc:</strong> ${product.color}</p>
        <p><strong>Chất liệu dây:</strong> ${product.strap}</p>
        <p><strong>Loại kính:</strong> ${product.glass}</p>
        <p><strong>Giới tính:</strong> ${product.gender}</p>
        <p class="price">${product.price}</p>
        <div class="actions">
          <button id="add-to-cart">🛒 Thêm vào giỏ hàng</button>
          <button id="buy-now">⚡ Mua ngay</button>
        </div>
      </div>
    </div>

    <div class="description">
      <h3>Mô tả sản phẩm</h3>
      <p>${product.description}</p>

      <h3>Thông số kỹ thuật</h3>
      <p><strong>Máy:</strong>${product.movement}</p>
      <p><strong>Độ dày:</strong>${product.thickness}</p>
      <p><strong>Kích thước:</strong>${product.size}</p>
      <p><strong>Trọng lượng:</strong>${product.weight}</p>
      <p><strong>Xuất xứ:</strong>${product.origin}</p>
      <p><strong>Hình dạng mặt:</strong>${product.shape}</p>
      <p><strong>Mức độ chống nước:</strong>${product.waterRes}</p>
    </div>
  `;

  // 2. Ẩn/Hiện các khu vực
  if (listContainer) listContainer.style.display = "none";
  if (bannerContainer) bannerContainer.style.display = "none"; // Ẩn banner khi xem chi tiết
  detailContainer.style.display = "block";

  // Cuộn lên đầu trang
  window.scrollTo({ top: 0, behavior: "smooth" });


// 3. Giỏ hàng và Mua ngay (Logic cũ của bạn)
  document.getElementById("add-to-cart").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === product.id);
    if (exists) exists.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  });

  document.getElementById("buy-now").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === product.id);
    if (exists) exists.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    renderAllCartComponents();
    if (Index) Index.style.display = "none";
    if (GioHang) GioHang.style.display = "block";
  });
}

/**
 * Quay lại giao diện danh sách sản phẩm và ẩn chi tiết sản phẩm.
 */
function showProductList() {
  const detailContainer = document.getElementById("product-detail");
  const listContainer = document.getElementById("product-list-wrapper");
  const bannerContainer = document.querySelector(".banner");

  // Ẩn/Hiện các khu vực
  detailContainer.style.display = "none";
  if (listContainer) listContainer.style.display = "block"; // Hiển thị lại danh sách
  if (bannerContainer) bannerContainer.style.display = "block"; // Hiển thị lại banner

  // Cuộn lên đầu trang
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Khởi tạo (Nếu có ID trên URL, vẫn hiển thị chi tiết cho việc chia sẻ link)
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (productId) {
    showProductDetail(productId);
  } else {
    // Đảm bảo chi tiết bị ẩn và danh sách được hiện khi không có ID
    const detailContainer = document.getElementById("product-detail");
    const listContainer = document.getElementById("product-list-wrapper");
    if (detailContainer) detailContainer.style.display = "none";
    if (listContainer) listContainer.style.display = "block";
  }
});

window.addEventListener("storage", (event) => {
  if (event.key === "productsLocal") {
    window.dispatchEvent(new Event("productsUpdated"));
  }
});