// thanh toan
document.addEventListener("DOMContentLoaded", function () {
    // --- LẤY TẤT CẢ CÁC Ô INPUT (FORM) ---
    //Dữ liệu đặt hàng của chính chủ
    const name_KhachHang = document.querySelector(".Name-Chu");
    const ho_KhachHang = document.querySelector(".Ho-Chu");
    const DiaChi_KhachHang = document.querySelector(".Dia-Chi-Chu");
    const City_KhachHang = document.querySelector(".City-Chu");
    const SDT_KhachHang = document.querySelector(".SDT-Chu");
    const Gmail_KhachHang = document.querySelector(".Gmail-Chu");

    //Dữ liệu đặt hàng đặt dùm
    const Nhan_name_KhachHang = document.querySelector(".Name-Nhan");
    const Nhan_ho_KhachHang = document.querySelector(".Ho-Nhan");
    const Nhan_DiaChi_KhachHang = document.querySelector(".Dia-Chi-Nhan");
    const Nhan_City_KhachHang = document.querySelector(".City-Nhan");
    const Nhan_SDT_KhachHang = document.querySelector(".SDT-Nhan");
    const Nhan_Gmail_KhachHang = document.querySelector(".Gmail-Nhan");
    //check xem có nhận dùm ko
    const IfCheckBox = document.getElementById("ifCheckBox");
    //pt thanh tonas
    const PayBank = document.querySelector(".CK_BTN");
    const CodBank = document.querySelector(".TM_BTN");
    const ShopBank = document.querySelector(".CH_BTN");

    // --- LẤY CÁC "TRANG" (DIV LỚN) ---
    const ThanhToan = document.querySelector("#ThanhToan");
    const ThanhToan_chuyenkhoan = document.querySelector("#ThanhToan_ChuyenKhoan");
    const ThanhToan_tienmat = document.querySelector("#ThanhToan_TienMat");
    const ThanhToan_cuahang = document.querySelector("#ThanhToan_CuaHang");
    const ThanhToan_ThanhCong = document.querySelector("#ThanhToan_ThanhCong");
    const ThanhToan_ThatBai = document.querySelector("#ThanhToan_ThatBai");

    // --- LẤY CÁC NÚT BẤM SAU KHI ĐẶT HÀNG ---
    const nutHoanTatThanhCong = document.querySelectorAll(".chuyenqua_giaodich_thanhcong");
    const nutHuyThaoTac = document.querySelector(".chuyenqua_giaodich_thatbai");

    //hàm lấy thẻ trên LStrong
    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }
    //hàm tính tiền
    function getCartTotal() {
        const cart = getCart();
        let total = 0;
        cart.forEach(item => {
            const productData = (typeof products !== 'undefined') ? products.find(p => p.id === item.id) : null;
            if (productData) {
                total += productData.priceValue * item.quantity;
            }
        });
        return total;
    }


    // --- HÀM LẤY DỮ LIỆU TỪ FORM ---
    function getFormData() {
        let name, ho, DiaChi, City, SDT, Gmail;
        if (IfCheckBox.checked) {
            // Lấy từ form "Người Nhận"
            name = Nhan_name_KhachHang.value;
            ho = Nhan_ho_KhachHang.value;
            DiaChi = Nhan_DiaChi_KhachHang.value;
            City = Nhan_City_KhachHang.value;
            SDT = Nhan_SDT_KhachHang.value;
            Gmail = Nhan_Gmail_KhachHang.value;
        } else {
            // Lấy từ form "Chính Chủ"
            name = name_KhachHang.value;
            ho = ho_KhachHang.value;
            DiaChi = DiaChi_KhachHang.value;
            City = City_KhachHang.value;
            SDT = SDT_KhachHang.value;
            Gmail = Gmail_KhachHang.value;
        }
        return { name, ho, DiaChi, City, SDT, Gmail };
    }

    /**
     * Kiểm tra tính hợp lệ của Form (validate).
     */
    function validateForm(formData) {
        // 1. Kiểm tra giỏ hàng rỗng
        const cart = getCart();
        if (cart.length === 0) {
            alert("Lỗi: Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
            return false;
        }

        // 2. Kiểm tra các trường bắt buộc
        if (!formData.name || !formData.ho || !formData.DiaChi || !formData.City) {
            alert("Lỗi: Vui lòng điền đầy đủ Tên, Họ, Địa chỉ và Thành phố.");
            return false;
        }

        // 3. Kiểm tra SĐT (10 số)
        if (!formData.SDT || formData.SDT.length !== 10 || isNaN(formData.SDT)) {
            alert("Lỗi: Số điện thoại không hợp lệ. SĐT phải là 10 chữ số.");
            return false;
        }

        // 4. Kiểm tra Gmail (phải là @gmail.com)
        const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        if (!formData.Gmail || !gmailRegex.test(formData.Gmail)) {
            alert("Lỗi: Địa chỉ Gmail không hợp lệ. Gmail phải có dạng ...@gmail.com");
            return false;
        }
        return true; // Form hợp lệ
    }

    /**
     * Tạo object đơn hàng và lưu vào danh sách CHÍNH THỨC ('DanhSachDatHang') theo user.
     */
   function saveOrderToMainList(formData, paymentMethod) {
    
    // Lấy người dùng hiện tại
    const currentUserJSON = localStorage.getItem('currentUser');
    if (!currentUserJSON) {
        console.error("Lỗi: Không tìm thấy người dùng khi lưu đơn hàng!");
        return; 
    }
    const currentUser = JSON.parse(currentUserJSON);
    const userName = currentUser.userName; //  userName làm key

    //  Lấy TOÀN BỘ lịch sử (dưới dạng object)
    let allOrders = JSON.parse(localStorage.getItem('DanhSachDatHang')) || {};

    // Lấy danh sách CỦA RIÊNG USER NÀY (hoặc tạo mảng rỗng nếu chưa có)
    if (!allOrders[userName]) {
        allOrders[userName] = [];
    }

    // Tạo đơn hàng mới
    const newOrder = {
        id: "DH" + Date.now(),
        paymentMethod: paymentMethod,
        totalPrice: getCartTotal(),
        products: getCart(), // Lưu giỏ hàng vào đơn hàng
        ...formData // Thêm thông tin khách
    };

    // Push đơn hàng mới vào list CỦA RIÊNG USER NÀY
    allOrders[userName].push(newOrder);
    
    //Lưu TOÀN BỘ object lịch sử (chứa tất cả user) trở lại
    localStorage.setItem('DanhSachDatHang', JSON.stringify(allOrders));
}

    // --- XỬ LÝ SỰ KIỆN CLICK 3 NÚT ĐẶT HÀNG ---

    // 1. Nút Đặt hàng COD
    if (CodBank) {
        CodBank.addEventListener('click', function (event) {
            event.preventDefault(); // Ngăn form submit
            const formData = getFormData();
            if (!validateForm(formData)) {
                return; // Dừng lại nếu form lỗi
            }
            let tonkho=truSoluong();
            if(!tonkho){
                alert('trong kho không đủ số lượng');
                return;
            }
            // Lưu đơn hàng CHÍNH THỨC
            saveOrderToMainList(formData, "COD");
            localStorage.removeItem('cart');
            if (typeof renderAllCartComponents === 'function') {
                renderAllCartComponents(); // Cập nhật icon giỏ hàng về 0
            }

            // Chuyển trang (hiện trang COD)
            if (ThanhToan) ThanhToan.style.display = "none";
            if (ThanhToan_chuyenkhoan) ThanhToan_chuyenkhoan.style.display = "none";
            if (ThanhToan_tienmat) ThanhToan_tienmat.style.display = "block"; 
            if (ThanhToan_cuahang) ThanhToan_cuahang.style.display = "none";

            // Render đơn hàng ra trang COD (gọi hàm từ giohang.js)
            if (typeof renderSuccessPage === 'function') {
                setTimeout(renderSuccessPage, 50); 
            }
        });
    }

    // 2. Nút Đặt hàng Tại cửa hàng
    if (ShopBank) {
        ShopBank.addEventListener('click', function (event) {
            event.preventDefault();
            const formData = getFormData();
            if (!validateForm(formData)) {
                return;
            }
            let tonkho=truSoluong();
            if(!tonkho){
                alert('trong kho không đủ số lượng');
                return;
            }
            if (typeof renderAllCartComponents === 'function') {
            renderAllCartComponents(); 
            }

            // Lưu đơn hàng CHÍNH THỨC
            saveOrderToMainList(formData, "Tại cửa hàng");

            // Chuyển trang (hiện trang Cửa Hàng)
            if (ThanhToan) ThanhToan.style.display = "none";
            if (ThanhToan_chuyenkhoan) ThanhToan_chuyenkhoan.style.display = "none";
            if (ThanhToan_tienmat) ThanhToan_tienmat.style.display = "none";
            if (ThanhToan_cuahang) ThanhToan_cuahang.style.display = "block"; 

            // Render đơn hàng ra trang Cửa Hàng (gọi hàm từ giohang.js)
            if (typeof renderSuccessPage === 'function') { setTimeout(renderSuccessPage, 50); }
        });
    }

    // 3. Nút Đặt hàng Chuyển khoản
    if (PayBank) {
        PayBank.addEventListener('click', function (event) {
            event.preventDefault();


            const formData = getFormData();
            if (!validateForm(formData)) {
                return;
            }
            let tonkho=truSoluong();
            if(!tonkho){
                alert('trong kho không đủ số lượng');
                return;
            }

            // (KHÁC BIỆT) Lưu đơn hàng vào 'currentOrder' (ĐƠN HÀNG TẠM)
            const tempOrder = {
                id: "DH" + Date.now(),
                paymentMethod: "Chuyển khoản",
                totalPrice: getCartTotal(),
                products: getCart(),
                ...formData
            };
            localStorage.setItem('currentOrder', JSON.stringify(tempOrder));

            // Chuyển trang (hiện trang CK)
            if (ThanhToan) ThanhToan.style.display = "none";
            if (ThanhToan_chuyenkhoan) ThanhToan_chuyenkhoan.style.display = "block"; 
            if (ThanhToan_tienmat) ThanhToan_tienmat.style.display = "none";
            if (ThanhToan_cuahang) ThanhToan_cuahang.style.display = "none";
            
            // Render đơn hàng TẠM ra trang CK (gọi hàm từ giohang.js)
            if (typeof renderSuccessPage === 'function') { setTimeout(renderSuccessPage, 50); }
        });
    }


    // --- XỬ LÝ CÁC NÚT SAU KHI ĐẶT HÀNG ---

    // Xử lý nút "Xem hóa đơn" (COD/Cửa hàng) hoặc "Đã hoàn tất CK".
nutHoanTatThanhCong.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        // 1. Lấy user hiện tại
        const currentUserJSON = localStorage.getItem('currentUser');
        if (!currentUserJSON) {
            console.error("Lỗi: Không tìm thấy user khi hoàn tất đơn!");
            alert("Lỗi: Không tìm thấy người dùng. Vui lòng đăng nhập lại.");
            return;
        }
        const userName = JSON.parse(currentUserJSON).userName;

        // 2. Lấy đơn hàng TẠM (nếu có, từ trang CK)
        let tempOrder = JSON.parse(localStorage.getItem('currentOrder'));

        // 3. Nếu là từ trang CK, push đơn TẠM vào danh sách CHÍNH THỨC (theo đúng user)
        if (tempOrder && tempOrder.paymentMethod === "Chuyển khoản") {
            
            // Lấy TOÀN BỘ lịch sử (dưới dạng object)
            let allOrders = JSON.parse(localStorage.getItem('DanhSachDatHang')) || {};
            
            // Lấy danh sách CỦA RIÊNG USER NÀY (hoặc tạo mảng rỗng nếu chưa có)
            if (!allOrders[userName]) {
                allOrders[userName] = [];
            }
            
            // Push đơn hàng TẠM vào list CỦA RIÊNG USER NÀY
            allOrders[userName].push(tempOrder);
            
            // Lưu TOÀN BỘ object lịch sử (chứa tất cả user) trở lại
            localStorage.setItem('DanhSachDatHang', JSON.stringify(allOrders));
        }
        // (Nếu là COD/Cửa hàng thì không cần làm gì, vì đơn đã được lưu vào 'DanhSachDatHang' trước đó)

        // 4. Dọn dẹp LocalStorage (XÓA GIỎ HÀNG VÀ ĐƠN TẠM)
        localStorage.removeItem('cart');
        localStorage.removeItem('currentOrder');

        // 5. Ẩn tất cả các trang
        if (ThanhToan) ThanhToan.style.display = "none";
        if (ThanhToan_chuyenkhoan) ThanhToan_chuyenkhoan.style.display = "none";
        if (ThanhToan_tienmat) ThanhToan_tienmat.style.display = "none";
        if (ThanhToan_cuahang) ThanhToan_cuahang.style.display = "none";
        if (ThanhToan_ThatBai) ThanhToan_ThatBai.style.display = "none";

        // 6. Hiển thị trang HÓA ĐƠN CUỐI CÙNG
        if (ThanhToan_ThanhCong) ThanhToan_ThanhCong.style.display = "block";

        // 7. Gọi hàm render HÓA ĐƠN CUỐI CÙNG (từ giohang.js)
        // Hàm này bây giờ sẽ đọc được đơn hàng cuối cùng của user
        if (typeof renderFinalSuccessPage === 'function') {
            renderFinalSuccessPage();
        }

        // 8. Cập nhật icon giỏ hàng (về 0)
        // Hàm này render lại giỏ hàng (bây giờ đã rỗng)
        if (typeof renderAllCartComponents === 'function') {
            renderAllCartComponents();
        }
    });
});

    // Xử lý nút "Hủy thao tác" (ở trang CK).
    if (nutHuyThaoTac) {
        nutHuyThaoTac.addEventListener('click', function (event) {
            event.preventDefault();

            // 1. Chỉ cần xóa đơn hàng TẠM
            localStorage.removeItem('currentOrder');

            // 2. Ẩn các trang
            if (ThanhToan) ThanhToan.style.display = "none";
            if (ThanhToan_chuyenkhoan) ThanhToan_chuyenkhoan.style.display = "none";
            if (ThanhToan_tienmat) ThanhToan_tienmat.style.display = "none";
            if (ThanhToan_cuahang) ThanhToan_cuahang.style.display = "none";
            if (ThanhToan_ThanhCong) ThanhToan_ThanhCong.style.display = "none";

            // 3. Hiển thị trang Thất Bại
            if (ThanhToan_ThatBai) ThanhToan_ThatBai.style.display = "block";
        });
    }




    function truSoluong() {
    let products = JSON.parse(localStorage.getItem('productsLocal'));
    let cart = JSON.parse(localStorage.getItem('cart'));

    if (!products || !cart || cart.length === 0) {
        console.error("Lỗi: Không tìm thấy 'productsLocal' hoặc 'cart' để trừ số lượng.");
        return false; 
    }

    for (const cartItem of cart) {
        const productInStock = products.find(p => p.id === cartItem.id);
        
        if (!productInStock) {
            console.warn(`Không tìm thấy SP ${cartItem.id} trong kho (productsLocal)`);
            alert(`Lỗi: Sản phẩm "${cartItem.name}" không tìm thấy trong kho.`);
            return false;
        }

        if (productInStock.quantity < cartItem.quantity) {
            console.error(`Không đủ hàng: ${cartItem.name}. Tồn kho: ${productInStock.quantity}, Cần: ${cartItem.quantity}`);
            alert(`Rất tiếc, sản phẩm "${cartItem.name}" không đủ số lượng tồn kho. (Tồn kho: ${productInStock.quantity}, Bạn cần: ${cartItem.quantity})`);
            return false;
        }
    }

    cart.forEach(cartItem => {
        const productInStock = products.find(p => p.id === cartItem.id);
        productInStock.quantity -= cartItem.quantity;
    });

    localStorage.setItem('productsLocal', JSON.stringify(products));
    console.log("Đã cập nhật số lượng tồn kho.");
    return true;
}

}); // <-- Đóng DOMContentLoaded