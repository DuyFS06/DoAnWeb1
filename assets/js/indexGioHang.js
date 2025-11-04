

// Dùng "event delegation": Lắng nghe TẤT CẢ các cú click trên trang
    document.body.addEventListener('click', function(event) {
        
        // --- 1. Xử lý khi bấm nút MỞ GIỎ HÀNG ---
        // Kiểm tra xem nơi vừa click CÓ PHẢI là nút "#open-cart-btn" không
        if (event.target.closest('#open-cart-btn')) {
            event.preventDefault(); // Ngăn thẻ <a> (nút giỏ hàng) tải lại trang
            
            // Tìm modal giỏ hàng (chính là cái div #conten)
            const modal = document.getElementById('conten');
            if (modal) {
                // Thêm class 'active' để hiển thị modal (CSS sẽ lo việc này)
                modal.classList.add('active'); 
                // Gọi hàm render để vẽ các sản phẩm trong giỏ hàng
                renderAllCartComponents(); 
            }
        }

        // --- 2. Xử lý khi bấm vào VÙNG MỜ (để ĐÓNG GIỎ HÀNG) ---
        // Kiểm tra xem nơi vừa click CÓ PHẢI là div "#bim-left" không
        if (event.target.id === 'bim-left') {
            const modal = document.getElementById('conten');
            if (modal) {
                // Xóa class 'active' để ẩn modal đi
                modal.classList.remove('active'); 
                // Gọi hàm render lại (để đồng bộ, dù không cần thiết khi đóng)
                renderAllCartComponents(); 
            }
        }
    });