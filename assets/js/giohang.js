// --- CÁC HÀM QUẢN LÝ GIỎ HÀNG CƠ BẢN ---

// Hàm 1: Lấy giỏ hàng từ LocalStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Hàm 2: Lưu giỏ hàng vào LocalStorage và gọi render lại
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderAllCartComponents(); // Cập nhật hiển thị sau khi lưu
}     
//kiểm tra trạng thái đăng nhập



// Hàm 3: Tăng số lượng (gọi từ HTML onclick)
window.addItemQuantity = function (productId) {
    const cart = getCart();
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity++;
        saveCart(cart);
    }
    //thẻ thêm số lượng
}

// Hàm 4: Xóa 1 SP khỏi giỏ (gọi từ HTML onclick)
window.Remove_Item_cart = function (productId) {
    const cart = getCart();
    const newCart = cart.filter(p => p.id !== productId);
    saveCart(newCart);
    //thẻ xóa vật phẩm
}

// Hàm 5: Giảm số lượng, nếu = 0 thì xóa (gọi từ HTML onclick)
window.removeItemQuantity = function (productId) {
    const cart = getCart();
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
            // Nếu số lượng là 0, lọc SP đó ra
            Remove_Item_cart(productId);
        } else {
            // Nếu vẫn còn, lưu số lượng mới
            saveCart(cart);
        }
    }
    //thẻ xóa số lượng
}

// --- HÀM RENDER TỔNG QUÁT ---

/**
 * Hàm "đồng bộ hóa" giỏ hàng: render lại TẤT CẢ giao diện
 * (Modal, Trang giỏ, Trang TT, Tổng tiền...)
 * được gọi mỗi khi `saveCart` chạy.
 */
function renderAllCartComponents() {
    const cart = getCart();

    // 1. Tìm tất cả các khu vực cần update
    const modalDisplayArea = document.querySelector('#indexGioHang .danhsach');//danh sách ở Index
    const cartPageDisplayArea = document.querySelector('#GioHang .danhsach');//danh sách ở giỏ hàng
    const checkoutListArea = document.querySelector('.checkout-product-list'); //xuất ra danh sách lish cuối cùng
    const totalDisplayAreas = document.querySelectorAll(".SumCart"); // Tất cả các ô tổng tiền
    const finalTotalDisplay = document.getElementById("SumCart-final");//tổng tiền cuối cùng 
    const shipDisplay = document.getElementById("cost-ship-value");//phí ship   

    // 2. Chuẩn bị biến
    let modalHtml = "";//modal sản phẩm các thẻ div
    let cartPageHtml = "";
    let checkoutHtml = "";//xuất ở trang thanh toán
    let totalSum = 0;

    // 3. Xử lý khi giỏ hàng rỗng
    if (cart.length === 0) {
        const emptyMsg = "<p style='text-align: center; padding: 20px;'>Giỏ hàng của bạn đang trống.</p>";
        if (modalDisplayArea) modalDisplayArea.innerHTML = emptyMsg;
        if (cartPageDisplayArea) cartPageDisplayArea.innerHTML = emptyMsg;
        if (checkoutListArea) checkoutListArea.innerHTML = emptyMsg;
    } else {
        // 4. Khi giỏ hàng có đồ, chuẩn bị header cho list ở trang thanh toán
        checkoutHtml += `
            <div class="ThongTinThanhToan-donhang"></div>
            <div class="display-flex-sp">
                <div class="right-sanpham-donhang">Sản phẩm</div>
                <div class="temp_cost-donhang">Tạm tính</div>
                <div class="num_donhang">Số lượng</div>
            </div>
            <div class="danhsach danhsach_thanhtoan">`;
        
        // 5. Lặp qua từng SP trong giỏ
        cart.forEach(item => {
            // Lấy giá trị (số) từ 'products.js' để tính toán
            let priceNumber = 0;
            if (typeof products !== 'undefined') {
                const productData = products.find(p => p.id === item.id);
                if (productData) {
                    priceNumber = productData.priceValue;
                }
            } else {
                // Nếu 'products.js' tải lỗi, tự phân tích giá
                const priceString = item.price.replace(/[.đ]/g, '');
                priceNumber = parseInt(priceString, 10);
            }

            // Cộng dồn tổng tiền
            if (!isNaN(priceNumber)) {//kt dữ liệu có phải là số hay ko
                totalSum += priceNumber * item.quantity;
            }

            // 5a. Tạo HTML cho Modal (giỏ hàng nhỏ)
            modalHtml += `
                <div class="cart-item-modal">
                    <div id="all-car">
                    <div id="remove"><button onclick="Remove_Item_cart('${item.id}')">x</button></div>
                        <img src="${item.image}" alt="${item.name}" id="Item-img">
                        <div class="item-info">
                            <div class="item-name">${item.name}</div>
                            <div class="item-price">${item.price}</div>
                            <div class="item-quantity-controls">
                                <button class="control-btn" onclick="removeItemQuantity('${item.id}')">-</button>
                                <div class="quantity-display">${item.quantity}</div>
                                <button class="control-btn" onclick="addItemQuantity('${item.id}')">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // 5b. Tạo HTML cho Trang Giỏ Hàng
            cartPageHtml += `
                <div class="cart-page-item-giohang">
                    <div class="element_sp-giohang">
                        <button onclick="Remove_Item_cart('${item.id}')">x</button>
                        <img src="${item.image}" alt="${item.name}" class="element_img-giohang">
                        <span>${item.name}</span>
                    </div>
                    <div class="element_cost-giohang">${item.price}</div>
                    <div class="element_num-giohang">
                        <div class="item-quantity-controls-giohang">
                            <button class="control-btn-giohang" onclick="removeItemQuantity('${item.id}')">-</button>
                            <div class="quantity-display-giohang">${item.quantity}</div>
                            <button class="control-btn-giohang" onclick="addItemQuantity('${item.id}')">+</button>
                        </div>
                    </div>
                </div>
            `;

            // 5c. Tạo HTML cho Trang Thanh Toán
            checkoutHtml += `
                <div class="donhang">
                    <div class="donhang-display-flex"></div>
                        <div class="donhang-name">${item.name}</div>
                        <div class="donhang-price" style="font-weight: bold;">${(priceNumber * item.quantity).toLocaleString('vi-VN')}đ</div>
                        <div class="donhang-soluong">x ${item.quantity}</div>
                    </div>
                </div>
            `;
        }); // Kết thúc vòng lặp 

        // 6. Đẩy HTML vào các khu vực
        if (modalDisplayArea) modalDisplayArea.innerHTML = modalHtml;//ds index
        if (cartPageDisplayArea) cartPageDisplayArea.innerHTML = cartPageHtml;//ds giohang
        if (checkoutListArea) checkoutListArea.innerHTML = checkoutHtml;//ds list cc
    }
    // --- CẬP NHẬT TẤT CẢ TỔNG TIỀN ---
    const formattedSubTotal = totalSum.toLocaleString('vi-VN') + 'đ';//biến có kiểu tiền tệ dạng vnd lấy tièn từ sumcart ở trên

    // 7. Cập nhật TẠM TÍNH (cho tất cả các class .SumCart)
    totalDisplayAreas.forEach(element => {
        element.textContent = formattedSubTotal;
    });

    // 8. Cập nhật TỔNG CUỐI (Tạm tính + Ship, nếu có)
    if (finalTotalDisplay || shipDisplay) {
        const shippingCost = (cart.length > 0) ? 30000 : 0; // Chỉ tính ship khi có hàng
        const total = totalSum + shippingCost;

        if (shipDisplay) shipDisplay.textContent = shippingCost.toLocaleString('vi-VN') + 'đ';//tiền ship
        if (finalTotalDisplay) finalTotalDisplay.textContent = total.toLocaleString('vi-VN') + 'đ';//tiên cuối cùng đã +ship

        // (Nếu Tạm tính của component khác với .SumCart)
        const subtotalEl = document.getElementById("temp_cost_end");
        if (subtotalEl) subtotalEl.textContent = formattedSubTotal;
    }
}

/**
 * Render thông tin đơn hàng ra các trang "trung gian"
 * (Trang Chuyển Khoản, Trang COD, Trang Cửa Hàng)
 * Hàm này được gọi từ file 'thanhtoan.js'
 */
function renderSuccessPage() {
    let orderData;
    let productListContainer;//danh sách đơn hàng sẽ ỉn ra
    let addressContainer;//địa chỉ

    // 1. Xác định trang nào đang được hiển thị
    const ckPage = document.querySelector('#ThanhToan_ChuyenKhoan');
    const codPage = document.querySelector('#ThanhToan_TienMat');
    const shopPage = document.querySelector('#ThanhToan_CuaHang');

    // 2. Lấy đúng dữ liệu đơn hàng
    if (ckPage && ckPage.style.display === 'block') {
        // 2a. Nếu là trang CK, lấy đơn hàng "TẠM" (currentOrder)
        orderData = JSON.parse(localStorage.getItem('currentOrder'));
        productListContainer = ckPage.querySelector('.checkout-product-list');
        addressContainer = null; 
    }  else {
        // Lấy toàn bộ lịch sử (object)
        const allOrders = JSON.parse(localStorage.getItem('DanhSachDatHang')) || {};
        // Lấy user hiện tại
        const currentUserJSON = localStorage.getItem('currentUser');
        if (currentUserJSON) {
            const userName = JSON.parse(currentUserJSON).userName;
            const userOrderList = allOrders[userName] || []; // Lấy list của user
            if (userOrderList.length > 0) {
                orderData = userOrderList[userOrderList.length - 1]; // Lấy đơn mới nhất của user
            }
        }
        
        if (codPage && codPage.style.display === 'block') {
            productListContainer = codPage.querySelector('.checkout-product-list');
            addressContainer = codPage.querySelector('.ThongTinMuaHang-html');
        } else if (shopPage && shopPage.style.display === 'block') {
            productListContainer = shopPage.querySelector('.checkout-product-list');
            addressContainer = shopPage.querySelector('.ThongTinMuaHang-html');
        }
    }

    // 3. Thoát nếu lỗi không tìm thấy đơn hàng
    if (!orderData) {
        console.error("renderSuccessPage: Không tìm thấy dữ liệu đơn hàng.");
        return;
    }

    // 4. Render địa chỉ (cho trang COD & Cửa Hàng)
    if (addressContainer) {
        const addressHtml = `
            <div class="ndconten">
                <h3>Địa chỉ giao hàng</h3>
                <p><strong>Mã ĐH:</strong> ${orderData.id}</p>
                <p><strong>Người nhận:</strong> ${orderData.ho} ${orderData.name}</p>
                <p><strong>Địa chỉ:</strong> ${orderData.DiaChi}</p>
                <p><strong>Thành phố:</strong> ${orderData.City}</p>
                <p><strong>SĐT:</strong> ${orderData.SDT}</p>
                <p><strong>Gmail:</strong> ${orderData.Gmail}</p>
            </div>
        `;
        addressContainer.innerHTML = addressHtml;
    }

    // 5. Render danh sách sản phẩm (cho cả 3 trang ck tm ch)
    if (productListContainer) {
        let checkoutHtml = `
            <div class="display-flex-sp">
                <div class="right-sanpham-donhang">Sản phẩm</div>
                <div class="temp_cost-donhang">Tạm tính</div>
                <div class="num_donhang">Số lượng</div>
            </div>
            <div class="danhsach danhsach_thanhtoan">`;

        let totalSum = 0;

        orderData.products.forEach(item => {
            const priceString = item.price.replace(/[.đ]/g, '');
            const priceNumber = parseInt(priceString, 10) || 0;
            const itemTotal = priceNumber * item.quantity;
            totalSum += itemTotal;

            checkoutHtml += `   
                <div class="item-info">
                    <div class="item-name">${item.name} </div>
                    <div class="item-price">${(itemTotal).toLocaleString('vi-VN')}đ</div>
                    <strong class="item-quantity">x ${item.quantity}</strong>
                </div>
            `;
        });


        let shippingCost = (orderData.products.length > 0) ? 30000 : 0;
        const total = totalSum + shippingCost;

        // 7. Render tổng tiền
        checkoutHtml += `
            <div class="display-flex-tt">
                <div class="sumend">Tạm tính</div>
                <div class="SumCart SumCart-thanhtoan">${(totalSum).toLocaleString('vi-VN')}đ</div> 
            </div>
            <div class="display-flex-ship-thanhtoan">
                <div class="ship">Vận chuyển</div>
                <div class="cost-ship-thanhtoan">
                    <div class="color-red">${(shippingCost).toLocaleString('vi-VN')}đ</div> 
                </div>
            </div>
            <div class="i4-thanhtoan">
                <div class="sumend-thanhtoan">Tổng</div>
                <div class="SumCart SumCart-thanhtoan_tong" style="color: red;">${(total).toLocaleString('vi-VN')}đ</div>
            </div>
        `;

        productListContainer.innerHTML = checkoutHtml;
    }
}


// --- XỬ LÝ SỰ KIỆN CHUYỂN TRANG ---
document.addEventListener('DOMContentLoaded', function () {

    // Lấy các nút bấm chuyển trang
    const ToiGioHangBtn = document.querySelectorAll('.ToiGioHangBtn');
    const tienhanhthanhtoanBtn = document.querySelectorAll('.tienhanhthanhtoanBtn');

    // Lấy các "trang" (div) chính
    const GioHang = document.getElementById('GioHang');
    const ThanhToan = document.getElementById('ThanhToan');
    const LichSu = document.getElementById('LichSuMuaHang'); // Trang lịch sử
    const contenModal = document.querySelector('#indexGioHang #conten'); // Modal
    const Index=document.querySelector('#chitietsanpham-banner-index');
    /**
     * Xử lý logic cho nút "Tới Giỏ Hàng" (hoặc "Giỏ hàng")
     * Nút này dùng để chuyển từ Modal -> Trang Giỏ Hàng,
     * hoặc từ Trang Thanh Toán -> Trang Giỏ Hàng
     */
    ToiGioHangBtn.forEach(function (button) {
        button.addEventListener('click', function () {
            // Case 1: Đang ở Modal -> Tắt Modal, Bật Trang Giỏ Hàng
            if (contenModal && contenModal.classList.contains('active')) {
                if (ThanhToan) ThanhToan.style.display = 'none'; 
                contenModal.classList.remove('active');
                if(Index)Index.style.display='none';
                if (LichSu) LichSu.style.display = 'none';
                if (GioHang) GioHang.style.display = 'block';
            }
            // Case 2: Đang ở Trang Thanh Toán -> Tắt Trang TT, Bật Trang Giỏ Hàng
            else if (ThanhToan && ThanhToan.style.display === 'block') {
                if(Index)Index.style.display='none';
                ThanhToan.style.display = 'none';
                if (LichSu) LichSu.style.display = 'none';
                if (GioHang) GioHang.style.display = 'block';
                if (contenModal) contenModal.classList.remove('active'); 
            }
            // Case 3: (Dự phòng) Cứ bật trang giỏ hàng
            else {
                if (GioHang) GioHang.style.display = 'block';
                if(Index)Index.style.display='none';
                 if (LichSu) LichSu.style.display = 'none';
                if (ThanhToan) ThanhToan.style.display = 'none';
                if (contenModal) contenModal.classList.remove('active');
            }
            renderAllCartComponents(); // Render lại nội dung trang giỏ hàng
        });
    });
    
    /**
     * Xử lý logic cho nút "Tiến hành Thanh Toán".
     * Nhiệm vụ: Tắt Modal hoặc Trang Giỏ Hàng, và Bật Trang Thanh Toán.
    */
   tienhanhthanhtoanBtn.forEach(function (motNutThanhToan) {
       motNutThanhToan.addEventListener('click', function () {
           // Chỉ chạy nếu đang ở Modal hoặc Trang Giỏ Hàng
           if ((contenModal && contenModal.classList.contains('active')) || (GioHang && GioHang.style.display === 'block')) {
                if(Index)Index.style.display='none';
                if (contenModal) contenModal.classList.remove('active');
                if (GioHang) GioHang.style.display = 'none';
                if (LichSu) LichSu.style.display = 'none';
                if (ThanhToan) ThanhToan.style.display = 'block';


                
                renderAllCartComponents(); // Render list SP cho trang thanh toán
            }
        });
    });
});




/**
 * Render HÓA ĐƠN CUỐI CÙNG ra trang #ThanhToan_ThanhCong.
 * Hàm này được gọi từ file 'thanhtoan.js'
 */
function renderFinalSuccessPage() {
       console.log("Đang render trang thành công cuối cùng...");

    // Lấy TOÀN BỘ lịch sử (dưới dạng object)
    const allOrders = JSON.parse(localStorage.getItem('DanhSachDatHang')) || {};
    
    //  Lấy user hiện tại
    const currentUserJSON = localStorage.getItem('currentUser');
    if (!currentUserJSON) {
        console.error("renderFinalSuccessPage: Không tìm thấy user.");
        return;
    }
    const userName = JSON.parse(currentUserJSON).userName;

    // Lấy danh sách CỦA RIÊNG USER NÀY
    const orderList = allOrders[userName] || [];
    if (orderList.length === 0) {
        console.error("renderFinalSuccessPage: Không có đơn hàng nào.");
        return;
    }

    // Lấy đơn hàng mới nhất từ danh sách
    const orderData = orderList[orderList.length - 1];

    //  Tìm khu vực
    const productListContainer = document.querySelector('#ThanhToan_ThanhCong .checkout-product-list');
    const addressContainer = document.querySelector('#ThanhToan_ThanhCong .from-don-hang');

    //  Render địa chỉ
    if (addressContainer) {
        const addressHtml = `
            <div class="ndconten-hoadon">
                <h3 class="In4-hoadon">Thông tin đơn hàng</h3>
                <p><strong>Mã ĐH:</strong> ${orderData.id}</p>
                <p><strong>Người nhận:</strong> ${orderData.ho} ${orderData.name}</p>
                <p><strong>Địa chỉ:</strong> ${orderData.DiaChi}, ${orderData.City}</p>
                <p><strong>SĐT:</strong> ${orderData.SDT}</p>
                <p><strong>Hình thức thanh toán:</strong> ${orderData.paymentMethod}</p>
            </div>
        `;
        addressContainer.innerHTML = addressHtml;
    }

    //  Render sản phẩm
    if (productListContainer) {
        let checkoutHtml = `
            <div class="display-flex-sp-hoadon">
                <div class="right-sanpham-donhang-hoadon">Sản phẩm</div>
                <div class="temp_cost-donhang-hoadon">Tạm tính</div>
                <div class="num_donhang-hoadon">Số lượng</div>
            </div>
            <div class="danhsach danhsach_thanhtoan">`;

        let totalSum = 0;
        orderData.products.forEach(item => {
            // Lấy giá trị (số) từ 'products.js'
            let priceNumber = 0;
            if (typeof products !== 'undefined') {
                const productData = products.find(p => p.id === item.id);
                if (productData) {
                    priceNumber = productData.priceValue;
                } else {
                    const priceString = (item.price || '0').replace(/[.đ]/g, '');
                    priceNumber = parseInt(priceString, 10) || 0;
                }
            } else {
                const priceString = (item.price || '0').replace(/[.đ]/g, '');
                priceNumber = parseInt(priceString, 10) || 0;
            }
            const itemTotal = priceNumber * item.quantity;
            totalSum += itemTotal;

            // Dùng class ...-hoadon để có style riêng
            checkoutHtml += `   
                <div class="item-info-hoadon">
                    <div class="item-name-hoadon">${item.name} </div>
                    <div class="item-price-hoadon">${(itemTotal).toLocaleString('vi-VN')}đ</div>
                    <strong class="item-quantity-hoadon">x ${item.quantity}</strong>
                </div>
            `;
        });

        //  Tính phí ship
        let shippingCost = (orderData.products.length > 0) ? 30000 : 0;
        if (orderData.paymentMethod === "Tại cửa hàng") {
            shippingCost = 0;
        }
        const total = totalSum + shippingCost;

        //  Render tổng tiền
        checkoutHtml += `
            <div class="display-flex-tt-hoadon">
                <div class="sumend-hoadon">Tạm tính</div>
                <div class="SumCart-hoadon SumCart-hoadon">${(totalSum).toLocaleString('vi-VN')}đ</div> 
            </div>
            <div class="display-flex-ship-thanhtoan-hoadon">
                <div class="ship-hoadon">Vận chuyển</div>
                <div class="cost-ship-hoadon">
                    <div class="color-red">${(shippingCost).toLocaleString('vi-VN')}đ</div> 
                </div>
            </div>
            <div class="i4-hoadon">
                <div class="sumend-hoadon">Tổng</div>
                <div class="SumCart-hoadon SumCart-hoadon_tong" style="color: red;">${(total).toLocaleString('vi-VN')}đ</div>
            </div>
        `;
        productListContainer.innerHTML = checkoutHtml;
    }
}