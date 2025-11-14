// ==================== QUẢN LÝ ĐƠN HÀNG (ADMIN) ====================
// Lưu ý: Toàn bộ dữ liệu chạy trên localStorage ở key: ordersLocal

(function () {
  const SECTION_ID = "page-orders";

  const ORDER_STATUS = {
    moiDat: "Mới đặt",
    daXuLy: "Đã xử lý",
    daGiao: "Đã giao",
    huy: "Hủy",
  };

  function currency(v) {
    return (v || 0).toLocaleString("vi-VN") + "₫";
  }

  function getLocalOrders() {
    const key = "ordersLocal";
    const raw = localStorage.getItem(key);
    if (raw) {
      const orders = JSON.parse(raw);
      // Filter out any sample orders by checking if they have corresponding user orders
      const userOrders = JSON.parse(localStorage.getItem('DanhSachDatHang') || '[]');
      const realOrders = orders.filter(order => userOrders.some(uo => uo.id === order.id));
      return realOrders;
    }
    return [];
  }

  function saveLocalOrders(list) {
    localStorage.setItem("ordersLocal", JSON.stringify(list));
  }

  const itemsPerPage = 10;
  let currentPage = 1;

  function buildLayout(container) {
    container.innerHTML = `
      <div class="QLDH_page-header">
        <h3>Quản lý đơn hàng</h3>
        <p>Tra cứu theo ngày & trạng thái, xem chi tiết & cập nhật trạng thái</p>
      </div>

      <div class="QLDH_filters">
        <label>Từ ngày: <input type="date" id="QLDH_filterDateFrom" /></label>
        <label>Đến ngày: <input type="date" id="QLDH_filterDateTo" /></label>
        <select id="QLDH_filterStatus">
          <option value="all">Tất cả trạng thái</option>
          <option value="moiDat">Mới đặt</option>
          <option value="daXuLy">Đã xử lý</option>
          <option value="daGiao">Đã giao</option>
          <option value="huy">Hủy</option>
        </select>
        <input type="text" id="QLDH_searchId" placeholder="Tìm theo mã đơn..." />
        <button id="QLDH_btnSearch">Tìm</button>
      </div>

      <div class="QLDH_table-header">
        <table class="QLDH_admin-table">
          <thead>
            <tr>
              <th style="width:6%">STT</th>
              <th style="width:15%">Mã đơn</th>
              <th style="width:18%">Ngày</th>
              <th style="width:18%">Khách</th>
              <th style="width:15%">Tổng tiền</th>
              <th style="width:15%">Trạng thái</th>
              <th style="width:13%">Chi tiết</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="QLDH_table-content"></div>
      <div class="QLDH_pagination">
        <button id="QLDH_prevPage">Trang trước</button>
        <span id="QLDH_pageInfo"></span>
        <button id="QLDH_nextPage">Trang sau</button>
      </div>

      <div id="QLDH_modal" class="QLDH_modal" style="display:none">
        <div class="QLDH_modal-content">
          <div class="QLDH_modal-header">
            <h3>Chi tiết đơn hàng</h3>
            <span id="QLDH_closeModal" class="QLDH_close">&times;</span>
          </div>
          <div class="QLDH_modal-body">
            <div class="QLDH_md_info">
              <div class="QLDH_md_col">
                <p><strong>Mã đơn:</strong> <span id="QLDH_md_id"></span></p>
                <p><strong>Ngày đặt:</strong> <span id="QLDH_md_date"></span></p>
                <p><strong>Khách hàng:</strong> <span id="QLDH_md_customer"></span></p>
                <p><strong>Tài khoản:</strong> <span id="QLDH_md_username"></span></p>
                <p><strong>Số điện thoại:</strong> <span id="QLDH_md_phone"></span></p>
              </div>
              <div class="QLDH_md_col">
                <p><strong>Địa chỉ giao hàng:</strong></p>
                <p id="QLDH_md_address" class="QLDH_md_address"></p>
                <p><strong>Ghi chú:</strong></p>
                <p id="QLDH_md_note" class="QLDH_md_note"></p>
              </div>
            </div>
            <table class="QLDH_md_table">
              <thead>
                <tr>
                  <th>STT</th><th>Mã SP</th><th>Tên</th><th>SL</th><th>Đơn giá</th><th>Thành tiền</th>
                </tr>
              </thead>
              <tbody id="QLDH_md_tbody"></tbody>
            </table>
            <div class="QLDH_md_total">Tổng tiền: <span id="QLDH_md_total"></span></div>
            
            <!-- Phần cập nhật trạng thái -->
            <div class="QLDH_md_status-update">
              <label for="QLDH_md_statusSelect"><strong>🔄 Cập nhật trạng thái:</strong></label>
              <select id="QLDH_md_statusSelect">
                <option value="moiDat">Mới đặt</option>
                <option value="daXuLy">Đã xử lý</option>
                <option value="daGiao">Đã giao</option>
                <option value="huy">Hủy</option>
              </select>
              <button id="QLDH_md_btnUpdate" class="QLDH_md_btnUpdate">Cập nhật</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderPagination(list) {
    const totalPages = Math.ceil(list.length / itemsPerPage);
    
    // Update pagination controls
    const pageInfo = document.getElementById('QLDH_pageInfo');
    if (pageInfo) {
      pageInfo.textContent = `Trang ${currentPage}/${totalPages}`;
    }
    
    const prevBtn = document.getElementById('QLDH_prevPage');
    const nextBtn = document.getElementById('QLDH_nextPage');
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
  }

  function renderTable(list) {
    const wrap = document.querySelector(`#${SECTION_ID} .QLDH_table-content`);
    wrap.innerHTML = "";
    const table = document.createElement("table");
    table.className = "QLDH_admin-table";
    const tbody = document.createElement("tbody");

    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageItems = list.slice(startIndex, startIndex + itemsPerPage);

    pageItems.forEach((o, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${startIndex + idx + 1}</td>
        <td>${o.id}</td>
        <td>${new Date(o.date).toLocaleString("vi-VN")}</td>
        <td>${o.customerName || "--"}</td>
        <td>${currency(o.total)}</td>
        <td>${ORDER_STATUS[o.status] || o.status}</td>
        <td><button class="QLDH_btn-detail" data-id="${o.id}">Xem</button></td>`;
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrap.appendChild(table);

    renderPagination(list);

    // bind actions
    wrap.querySelectorAll(".QLDH_btn-detail").forEach((b) =>
      b.addEventListener("click", () => openDetail(b.dataset.id))
    );
  }

  function filterOrders(list) {
    const dateFrom = document.getElementById("QLDH_filterDateFrom").value;
    const dateTo = document.getElementById("QLDH_filterDateTo").value;
    const stVal = document.getElementById("QLDH_filterStatus").value;
    const idText = document.getElementById("QLDH_searchId").value.trim().toLowerCase();

    return list.filter((o) => {
      // Lọc theo khoảng ngày
      let okDate = true;
      if (dateFrom || dateTo) {
        const orderDate = new Date(o.date).toISOString().slice(0, 10);
        if (dateFrom && dateTo) {
          okDate = orderDate >= dateFrom && orderDate <= dateTo;
        } else if (dateFrom) {
          okDate = orderDate >= dateFrom;
        } else if (dateTo) {
          okDate = orderDate <= dateTo;
        }
      }
      const okStatus = stVal === "all" || o.status === stVal;
      const okId = !idText || (o.id || "").toLowerCase().includes(idText);
      return okDate && okStatus && okId;
    });
  }

  function openDetail(id) {
    const orders = getLocalOrders();
    const o = orders.find((x) => x.id === id);
    if (!o) return;

    // Cập nhật thông tin cơ bản
    document.getElementById("QLDH_md_id").textContent = o.id;
    document.getElementById("QLDH_md_date").textContent = new Date(o.date).toLocaleString("vi-VN");
    document.getElementById("QLDH_md_customer").textContent = o.customerName || "--";
    document.getElementById("QLDH_md_username").textContent = o.userName || "--";
    document.getElementById("QLDH_md_phone").textContent = o.phone || "--";

    // Cập nhật địa chỉ và ghi chú
    const addressEl = document.getElementById("QLDH_md_address");
    if (o.address) {
      const addr = [];
      if (o.address.street) addr.push(o.address.street);
      if (o.address.ward) addr.push(o.address.ward);
      if (o.address.district) addr.push(o.address.district);
      if (o.address.city) addr.push(o.address.city);
      addressEl.textContent = addr.join(", ");
    } else {
      addressEl.textContent = "--";
    }
    document.getElementById("QLDH_md_note").textContent = o.note || "--";

    // Cập nhật bảng sản phẩm
    const tbody = document.getElementById("QLDH_md_tbody");
    tbody.innerHTML = "";
    o.items.forEach((it, i) => {
      const tr = document.createElement("tr");
      const returned = it.returned || 0;
      const remaining = Math.max(0, (it.qty || 0) - returned);
      const tt = remaining * (it.price || 0);
      tr.innerHTML = `<td>${i + 1}</td><td>${it.productId}</td><td>${it.name || ""}</td><td>${it.qty} <small>(còn: ${remaining})</small></td><td>${currency(it.price)}</td><td>${currency(tt)}</td>`;
      tbody.appendChild(tr);
    });

    document.getElementById("QLDH_md_total").textContent = currency(o.total);
    
    // Cập nhật dropdown trạng thái và lưu ID đơn hàng
    const statusSelect = document.getElementById("QLDH_md_statusSelect");
    statusSelect.value = o.status;
    statusSelect.dataset.orderId = id;
    
    document.getElementById("QLDH_modal").style.display = "flex";
  }

  function updateStatus(id, newStatus) {
    // Cập nhật trạng thái trong admin orders
    const orders = getLocalOrders();
    const idx = orders.findIndex((x) => x.id === id);
    if (idx === -1) return;
    
    const order = orders[idx];
    const oldStatus = order.status;
    order.status = newStatus;
    
    // Xử lý cập nhật số lượng đã bán khi trạng thái đơn hàng thay đổi
    if (newStatus === 'daGiao' && oldStatus !== 'daGiao') {
      // Khi đơn hàng được chuyển sang trạng thái "Đã giao"
      const products = JSON.parse(localStorage.getItem('productsLocal') || '[]');
      order.items.forEach(item => {
        const productIdx = products.findIndex(p => p.id === item.productId);
        if (productIdx !== -1) {
          // Khởi tạo soldQuantity nếu chưa có
          if (!products[productIdx].soldQuantity) {
            products[productIdx].soldQuantity = 0;
          }
          // Cộng dồn số lượng đã bán
          products[productIdx].soldQuantity += item.qty;
        }
      });
      localStorage.setItem('productsLocal', JSON.stringify(products));
      // Thông báo cập nhật tồn kho
      window.dispatchEvent(new Event('productsUpdated'));
    } else if (oldStatus === 'daGiao' && newStatus !== 'daGiao') {
      // Khi đơn hàng bị chuyển từ trạng thái "Đã giao" sang trạng thái khác
      const products = JSON.parse(localStorage.getItem('productsLocal') || '[]');
      order.items.forEach(item => {
        const productIdx = products.findIndex(p => p.id === item.productId);
        if (productIdx !== -1 && products[productIdx].soldQuantity) {
          // Trừ đi số lượng đã bán
          products[productIdx].soldQuantity = Math.max(0, products[productIdx].soldQuantity - item.qty);
        }
      });
      localStorage.setItem('productsLocal', JSON.stringify(products));
      // Thông báo cập nhật tồn kho
      window.dispatchEvent(new Event('productsUpdated'));
    }
    
    // Lưu cập nhật đơn hàng
    saveLocalOrders(orders);

    // Cập nhật trạng thái trong user orders (đồng bộ sang cấu trúc user-side)
    const userOrders = JSON.parse(localStorage.getItem('DanhSachDatHang') || '[]');
    const userOrderIdx = userOrders.findIndex(o => o.id === id);
    if (userOrderIdx !== -1) {
        // Lưu trạng thái admin (dành cho back-office) và đồng thời cập nhật trường 'trangthai' để user UI có thể đọc
        userOrders[userOrderIdx].status = newStatus;

        // Map trạng thái admin -> trạng thái hiển thị ở user
        let userTrangThai = 'cho-xac-nhan';
        switch (newStatus) {
          case 'moiDat':
            userTrangThai = 'cho-xac-nhan';
            break;
          case 'daXuLy':
            userTrangThai = 'dang-giao';
            break;
          case 'daGiao':
            userTrangThai = 'thanh-cong';
            break;
          case 'huy':
            userTrangThai = 'da-huy';
            break;
          default:
            userTrangThai = 'cho-xac-nhan';
        }

        userOrders[userOrderIdx].trangthai = userTrangThai;
        localStorage.setItem('DanhSachDatHang', JSON.stringify(userOrders));

        // Gửi sự kiện để thông báo thay đổi (custom event)
        const event = new Event('orderStatusChanged');
        event.orderId = id;
        event.newStatus = newStatus;
        window.dispatchEvent(event);
    }

    // re-render with current filters
    const filtered = filterOrders(orders);
    renderTable(filtered);
  }

  function attachEvents() {
    // Pagination event handlers
    document.getElementById("QLDH_prevPage").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable(filterOrders(getLocalOrders()));
      }
    });
    
    document.getElementById("QLDH_nextPage").addEventListener("click", () => {
      const list = filterOrders(getLocalOrders());
      const totalPages = Math.ceil(list.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderTable(list);
      }
    });

    document.getElementById("QLDH_btnSearch").addEventListener("click", () => {
      currentPage = 1;
      const list = filterOrders(getLocalOrders());
      renderTable(list);
    });
    document.getElementById("QLDH_filterDateFrom").addEventListener("change", () => {
      currentPage = 1;
      renderTable(filterOrders(getLocalOrders()));
    });
    document.getElementById("QLDH_filterDateTo").addEventListener("change", () => {
      currentPage = 1;
      renderTable(filterOrders(getLocalOrders()));
    });
    document.getElementById("QLDH_filterStatus").addEventListener("change", () => {
      currentPage = 1;
      renderTable(filterOrders(getLocalOrders()));
    });
    document.getElementById("QLDH_closeModal").addEventListener("click", () => {
      document.getElementById("QLDH_modal").style.display = "none";
    });
    
    // Event listener cho button cập nhật trạng thái trong modal
    document.getElementById("QLDH_md_btnUpdate").addEventListener("click", () => {
      const statusSelect = document.getElementById("QLDH_md_statusSelect");
      const orderId = statusSelect.dataset.orderId;
      const newStatus = statusSelect.value;
      if (orderId) {
        updateStatus(orderId, newStatus);
        // Đóng modal sau khi cập nhật
        setTimeout(() => {
          document.getElementById("QLDH_modal").style.display = "none";
        }, 500);
      }
    });
    
    window.addEventListener("click", (e) => {
      const modal = document.getElementById("QLDH_modal");
      if (e.target === modal) modal.style.display = "none";
    });
  }

  function ensureMounted() {
    const sec = document.getElementById(SECTION_ID);
    if (!sec) return;
    // Build once
    if (!sec.dataset.bound) {
      buildLayout(sec);
      attachEvents();
      sec.dataset.bound = "1";
    }
    renderTable(filterOrders(getLocalOrders()));
  }

  // Sync with user orders
  function syncUserOrders() {
    const userOrders = JSON.parse(localStorage.getItem('DanhSachDatHang') || '[]');
    const adminOrders = getLocalOrders();
    
  // Lấy tất cả đơn hàng từ user-side (bao gồm cả đơn không đăng nhập)
  const validUserOrders = userOrders.filter(order => order && order.id && order.product && order.product.length);
    
    // Find new orders from users
    const newOrders = validUserOrders.filter(uo => !adminOrders.some(ao => ao.id === uo.id));
    
    if (newOrders.length) {
      // Convert user orders to admin format
      const formattedOrders = newOrders.map(o => {
        // try to extract username from different possible shapes
        const userObj = o.user || {};
        const extractedUserName =
          o.userName || userObj.userName || userObj.username || userObj.name || "";
        const userId = userObj.id || null;

        return {
          id: o.id,
          date: o.orderDate || new Date().toISOString(),
          customerName: o.info && o.info.name ? o.info.name : (extractedUserName || "Khách vãng lai"),
          phone: o.info && o.info.phone ? o.info.phone : "",
          address: {
            street: o.info && o.info.address ? o.info.address : "",
            email: o.info && o.info.email ? o.info.email : ""
          },
          items: (o.product || []).map(p => ({
            productId: p.id,
            name: p.name,
            qty: p.quantity,
            price: p.priceValue,
            returned: 0
          })),
          total: o.totalPrice,
          status: 'moiDat',
          paymentMethod: o.payment,
          shippingFee: o.priceShip === '30.000đ' ? 30000 : 0,
          userId: userId,  // Thêm ID người dùng nếu có
          userName: extractedUserName // tên đăng nhập/hiển thị của người đặt (nếu có)
        };
      });

      // Add new orders to admin list
      saveLocalOrders([...adminOrders, ...formattedOrders]);
      
      // Re-render with current filters
      renderTable(filterOrders(getLocalOrders()));
    }
  }

  // Listen for changes in user orders
  window.addEventListener('storage', (e) => {
    if (e.key === 'DanhSachDatHang') {
      syncUserOrders();
    }
  });

  // Also listen to a custom event fired from the user checkout flow (same-tab)
  window.addEventListener('userOrdersUpdated', () => {
    syncUserOrders();
  });

  // re-render when route changes
  window.addEventListener("hashchange", ensureMounted);
  document.addEventListener("DOMContentLoaded", () => {
    ensureMounted();
    syncUserOrders(); // Initial sync
  });
}
)();

