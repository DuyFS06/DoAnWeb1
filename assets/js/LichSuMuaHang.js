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
                        if(!danhsach[i].trangthai)danhsach[i].trangthai='cho-xac-nhan';
                        let trangthaiTEXT='',trangthaiclass='';
                        switch(danhsach[i].trangthai){
                            case 'cho-xac-nhan':
                                trangthaiTEXT='chờ xác nhận';
                                trangthaiclass="trangthai_waitting ";
                                break;
                            case 'dang-giao':
                                trangthaiTEXT='đang giao';
                                trangthaiclass=" trangthai_shipping ";
                                break;
                            case 'thanh-cong':
                                trangthaiTEXT='thành công';
                                trangthaiclass=" trangthai_succes ";
                                break;
                            case 'da-huy':
                                trangthaiTEXT='đã hủy';
                                trangthaiclass=" trangthai_cancel ";
                                break;
                        }
                        LichSuHTML+=`<div class="cart_LichSu">
                            <div class="maLichSu">
                                <div>mã đơn hàng:<span>${danhsach[i].id}</span></div>
                                <div>ngày đặt:<span>
                                ${new Date(Number(danhsach[i].id.replace("DH", ""))).toLocaleDateString('vi-VN')}
                                </span></div>
                                <div> trạng thái: <span class="${trangthaiclass}"> ${trangthaiTEXT}</span></div>
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
                                <div class="track-step"${danhsach[i].trangthai==='cho-xac-nhan'?'style="color:#28a745"':'style="color:#6c757d"'}>Chờ xác nhận</div>
                                <div class="track-step"${danhsach[i].trangthai==='dang-giao'?'style="color:#28a745"':'style="color:#6c757d"'}>=> dang giao đến bạn</div>
                                <div class="track-step" id="track-step-${danhsach[i].id}" ${danhsach[i].trangthai==='thanh-cong'?'style="color:#28a745"':'style="color:#6c757d"'}>=> thành công</div>
                            </div>
                            ${danhsach[i].trangthai === 'cho-xac-nhan' ? 
                                    `<div class="dkhuy">
                                        <button class="huyDon-btn" data-id="${danhsach[i].id}">Hủy đơn hàng</button>
                                    </div>` 
                                    : ''}
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
        document.querySelectorAll(".huyDon-btn").forEach(btn=>{
            btn.addEventListener("click",function(){
                const huydonid=this.getAttribute("data-id");
                if(confirm("bạn có chắc chắn muốn hủy đơn hàng này không?")){
                    huydonhang(huydonid);
                }
            });
        });

        }

        function huydonhang(donhuyid){
            const danhsach = window.getDanhSachDatHang();
            const donHang = danhsach.find(dh => dh.id === donhuyid);
            if(donHang && donHang.trangthai === 'cho-xac-nhan'){
                donHang.trangthai='da-huy';
                localStorage.setItem('DanhSachDatHang',JSON.stringify(danhsach));
                alert('đã hủy đơn thành công');
                const thanhcong_faile = document.getElementById(`track-step-${donhuyid}`);
            if (thanhcong_faile) {
                thanhcong_faile.textContent = "=> Đã hủy"; 
                thanhcong_faile.style.color = "red";      
                thanhcong_faile.style.fontWeight = "bold"; 
            }
            
            const nuthuy = document.querySelector(`.huyDon-btn[data-id="${donhuyid}"]`)?.parentElement;
            if (nuthuy) {
                nuthuy.style.display = 'none';
            }
            }else{
                alert("không thể hủy đơn do đơn hàng đã giao hoặc đã được vận chuyển.");
            }
        }
    });