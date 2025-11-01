document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  
  const product = products.find(p => p.id === productId);
  const container = document.getElementById("product-detail");

  if (!product) {
    container.innerHTML = "<p>Không tìm thấy dữ liệu chi tiết sản phẩm.</p>";
    return;
  }

  // Render chi tiết sản phẩm
  container.innerHTML = `
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

  // Giỏ hàng
  document.getElementById("add-to-cart").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(item => item.id === product.id);
    if (exists) exists.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  });

    // Xử lý nút "Mua ngay"
  document.getElementById("buy-now").addEventListener("click", () => {
    // Thêm vào giỏ và chuyển đến trang giỏ hàng (tùy bạn làm sau)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringifys(cart));
    window.location.href = "giohang.html";
  });
});
