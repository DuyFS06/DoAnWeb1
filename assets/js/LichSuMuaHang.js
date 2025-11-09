document.addEventListener("DOMContentLoaded",function(){
    window.lichsumuahang=function(){

        const danhsach=window.getDanhSachDatHang();
        const userlogin=window.getlogin();
        let LichSuHTML='';
        
        if(danhsach.length===0){
            
            LichSuHTML=`<h2>Bạn chưa đặt đơn hàng nào hết</h2>`;
        }else{
            for(var i=danhsach.length-1;i>=0;i--){
                if(userlogin.userName===danhsach[i].user.userName){
                    LichSuHTML+=`<div class="cart_LichSu">
                        <div class="maLichSu">
                            <div>mã đơn hàng:<span>${danhsach[i].id}</span></div>
                            <div>ngày đặt:<span>
                            ${new Date(Number(danhsach[i].id.replace("DH", ""))).toLocaleDateString('vi-VN')}
                            </span></div>
                            <div> trạng thái: <span> chờ xác nhận</span></div>
                        </div>
                        <div>
                    `;
                    danhsach[i].product.forEach(item => {
                        LichSuHTML+=`<div class="all-cart">
                            <img src="${item.image}" alt="${item.name}" class="item-img">
                            <div class="name-price-quantity">
                                    <div class="item-name">${item.name}</div>
                                    <div class="item-price">${item.price}</div>
                                <div class="item-quantity-all">
                                <div class="quantity">${item.quantity}</div>
                                </div>
                                </div>
                                </div>
                                `;
                    });
                    LichSuHTML+=`
                    <div class="color-red" style="text-align:end">tổng: ${danhsach[i].price}</div>
                    </div>
                    <button class="xemthembtn">Xem thêm</button>
                    <div class="diachixemthem" style="display:none">
                        <div class="address_all" disableb>
                            <div class="nguoi_nhan">
                                <div>Tên người nhận: </div>
                                <div>${danhsach[i].info.name}</div>
                            </div>
                            <div class="sdt_nhan">
                                <div>Sdt người nhận:</div>
                                <div>${danhsach[i].info.phone}</div>
                            </div>
                            <div class="gmail_nhan">
                                <div>Gmail người nhận: </div>
                                <div>${danhsach[i].info.email}</div>
                            </div>
                            <div class="diachi_nhan">
                                <div>Địa chỉ người nhận: </div>
                                <div>${danhsach[i].info.address}</div>
                            </div>
                            <div class="thanhtoanby">
                                <div>Phương thức thanh toán:   ${danhsach[i].payment}</div>
                                
                            </div>
                        </div>
                    <div> trạng thái đơn hàng</div>
                        <div class="trangThaiDonHang">
                            <div><span>Đang xác nhận</spand> <spand>=> Đang giao</spand> <spand> => Thành công</span><div>
                        </div>
                        </div>
                        </div>
                        <div class="dkhuy">
                            <button class="huyDon"> Hủy đơn hàng</button>
                        </div>
                        </div>
                        </div>
                        `;
                    }
                }
            }
            document.querySelector('.lichsumuahanglist').innerHTML=LichSuHTML; 
        document.querySelectorAll(".xemthembtn").forEach(btn=>{
            btn.addEventListener("click",function(){
                const ndthem=this.nextElementSibling;
                 if (ndthem.style.display === "none" || ndthem.style.display === "") {
                    ndthem.style.display = "block"; 
                    btn.textContent = "Ẩn bớt";     
                } else {
                    ndthem.style.display = "none";  
                    btn.textContent = "Xem thêm";   
                }
        });
        });
    }

});