document.addEventListener("DOMContentLoaded", () => {
  // Lấy id sản phẩm từ URL
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  // Tìm sản phẩm trong mảng products (đã được import từ products.js)
  const product = products.find(p => p.id === productId);

  const container = document.getElementById("product-detail");


  // Hiển thị thông tin chi tiết
  container.innerHTML = `
    <div class="product-info">
      <div class="left">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="right">
        <h2>${product.name}</h2>
        <p class="desc">${product.desc}</p>
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
      <div class="mô tả sản phẩm">
        
      </div>
    </div>
  `;

  // Xử lý nút "Thêm vào giỏ hàng"
  document.getElementById("add-to-cart").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(item => item.id === product.id);

    if (!exists) {
      cart.push({ ...product, quantity: 1 });
    } else {
      exists.quantity += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  });

  // Xử lý nút "Mua ngay"
  document.getElementById("buy-now").addEventListener("click", () => {
    // Thêm vào giỏ và chuyển đến trang giỏ hàng (tùy bạn làm sau)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "giohang.html";
  });
});

