
document.addEventListener('DOMContentLoaded', function() {

    const LichSuMuaHang = document.querySelector("#LichSuMuaHang");
    const GioHang = document.getElementById('GioHang');
    const ThanhToan = document.getElementById('ThanhToan');
    const ThanhToan_chuyenkhoan = document.querySelector("#ThanhToan_ChuyenKhoan");
    const ThanhToan_tienmat = document.querySelector("#ThanhToan_TienMat");
    const ThanhToan_cuahang = document.querySelector("#ThanhToan_CuaHang");
    const ThanhToan_ThanhCong = document.querySelector("#ThanhToan_ThanhCong");
    const ThanhToan_ThatBai = document.querySelector("#ThanhToan_ThatBai");
    const Index = document.querySelector('#chitietsanpham-banner-index');

    document.body.addEventListener("click", function(event) {
        
        const clickedButton = event.target.closest('#LichSuMuaHangBTN');

        if (clickedButton) {
            event.preventDefault(); 
            console.log("Nút Lịch Sử Đã Được Click!");

            // --- 1. Ẩn tất cả các trang khác ---
            if (GioHang) GioHang.style.display = 'none';
            if (ThanhToan) ThanhToan.style.display = 'none';
            if (ThanhToan_chuyenkhoan) ThanhToan_chuyenkhoan.style.display = 'none';
            if (ThanhToan_tienmat) ThanhToan_tienmat.style.display = 'none';
            if (ThanhToan_cuahang) ThanhToan_cuahang.style.display = 'none';
            if (ThanhToan_ThanhCong) ThanhToan_ThanhCong.style.display = 'none';
            if (ThanhToan_ThatBai) ThanhToan_ThatBai.style.display = 'none';
            if (Index) Index.style.display = 'none';

            // --- 2. Bắt đầu render Lịch sử ---
            
            const container = document.getElementById('all-element');
            if (!container) {
                console.error("Không tìm thấy container #all-element!");
                return;
            }

            const currentUserJSON = localStorage.getItem('currentUser');
            if (!currentUserJSON) {
                // Nếu chưa đăng nhập, yêu cầu đăng nhập
                container.innerHTML = '<div id="element" style="padding: 20px; text-align: center;">Bạn cần đăng nhập để xem lịch sử mua hàng.</div>';
                if (LichSuMuaHang) LichSuMuaHang.style.display = 'block';
                return; // Dừng lại
            }
            const currentUser = JSON.parse(currentUserJSON);
            const userName = currentUser.userName; // Lấy userName làm key

            const allOrders = JSON.parse(localStorage.getItem('DanhSachDatHang')) || {};

            const orderList = allOrders[userName] || []; // Lấy mảng của user, hoặc mảng rỗng


            //  Xử lý trường hợp không có đơn hàng nào
            if (orderList.length === 0) {
                container.innerHTML = '<div id="element" style="padding: 20px; text-align: center;">Bạn chưa có đơn hàng nào.</div>';
                if (LichSuMuaHang) LichSuMuaHang.style.display = 'block'; 
                return; 
            }

            // Xóa nội dung cũ
            container.innerHTML = ''; 

            // Lặp qua danh sách đơn hàng CỦA RIÊNG USER NÀY
            orderList.slice().reverse().forEach(order => {
                
                // Tạo HTML cho sản phẩm bên trong đơn hàng
                let productsHTML = '';
                order.products.forEach(product => {
                    const itemPrice = (product.price || '0').replace(/[.đ]/g, '');
                    const itemTotal = (parseInt(itemPrice, 10) * product.quantity).toLocaleString('vi-VN') + 'đ';

                    productsHTML += `
                        <div id="lichSusp">
                            <img src="${product.image}" alt="${product.name}" style="width:50px; height:50px; object-fit:cover; border-radius: 4px; margin-right: 10px;">
                            <div style="flex: 1;">${product.name} (x${product.quantity})</div>
                            <div style="font-weight: bold;">${itemTotal}</div>
                        </div>
                    `;
                });

                // Tạo HTML cho thẻ (card) của đơn hàng
                const orderCard = document.createElement('div');
                orderCard.id = 'element'; 
                
                const shippingCost = (order.paymentMethod === "Tại cửa hàng" || order.products.length === 0) ? 0 : 30000;
                const formattedTotal = (order.totalPrice + shippingCost).toLocaleString('vi-VN') + 'đ';

                orderCard.innerHTML = `
                    <div id="Ma">
                        <div id="font-bold">Mã đơn hàng:</div>
                        <div style="margin: 0 10px; color: #555;">${order.id}</div>
                        <div style="margin-left: auto; color: #777;">${new Date(parseInt(order.id.replace('DH',''))).toLocaleDateString('vi-VN')}</div>
                    </div>
                    
                    ${productsHTML} 
                    
                    <div style="text-align: right; font-size: 16px; margin-top: 10px;">
                        <span id="font-bold-mh">Tổng tiền: </span>
                        <span id="color-red" style="color: red; font-weight: bold;">${formattedTotal}</span>
                    </div>

                    <input type="checkbox" id="chitiet-${order.id}" class="chitiet-checkbox" style="display: none;">
                    <label for="chitiet-${order.id}" class="border" style="cursor: pointer; color: #007BFF; margin-top: 10px; display: inline-block;">Xem chi tiết người nhận ▼</label>
                    
                    <div class="cthh" style="display: none; margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 10px; background: #f9f9f9; padding: 15px; border-radius: 5px;">
                        <p><strong>Người nhận:</strong> ${order.ho} ${order.name}</p>
                        <p><strong>Địa chỉ:</strong> ${order.DiaChi}, ${order.City}</p> <p><strong>SĐT:</strong> ${order.SDT}</p>
                        <p><strong>PT Thanh toán:</strong> ${order.paymentMethod}</p>
                    </div>
                `;
                
                // C. Gắn logic Ẩn/Hiện cho nút "Xem chi tiết"
                const label = orderCard.querySelector(`label[for='chitiet-${order.id}']`);
                const detailDiv = orderCard.querySelector('.cthh');
                label.addEventListener('click', function() {
    
                // Kiểm tra xem 'display' có phải là 'none' không
                if (detailDiv.style.display === 'none') {
                    // Nếu đang ẩn: HIỆN NÓ RA
                    detailDiv.style.display = 'block';
                    label.innerHTML = 'Ẩn chi tiết người nhận ▲';
                } else {
                    // Nếu đang hiện: ẨN NÓ ĐI
                    detailDiv.style.display = 'none';
                    label.innerHTML = 'Xem chi tiết người nhận ▼';
                }
            });

                container.appendChild(orderCard);
            });

            // --- 3. Hiển thị trang Lịch sử (sau khi đã tạo xong HTML) ---
            if (LichSuMuaHang) LichSuMuaHang.style.display = 'block';
        }
        
    }); // Đóng sự kiện click của body

}); // Đóng DOMContentLoaded