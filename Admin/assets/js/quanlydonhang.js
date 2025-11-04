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
    if (raw) return JSON.parse(raw);
    // seed demo orders if none
    const demo = [
      {
        id: "DH" + Date.now(),
        date: new Date().toISOString(),
        customerName: "Nguyễn Văn A",
        status: "moiDat",
        items: [
          { productId: "BA-110AH-6A", name: "BABY-G BA-110AH-6A", qty: 1, returned: 0, price: 4420000 },
          { productId: "EFV-650D-2BV", name: "EDIFICE EFV-650D-2BV", qty: 1, returned: 0, price: 3820000 },
        ],
      },
      {
        id: "DH20251001001",
        date: new Date(Date.now() - 86400000 * 7).toISOString(),
        customerName: "Trần Thị B",
        status: "daXuLy",
        items: [{ productId: "GMA-S120SA-7A2", name: "G-SHOCK GMA-S120SA-7A2", qty: 2, returned: 0, price: 4200000 }],
      },
      {
        id: "DH20250915002",
        date: new Date(Date.now() - 86400000 * 30).toISOString(),
        customerName: "Lê Văn C",
        status: "daGiao",
        items: [{ productId: "PRW-30Y-1B", name: "PRO-TREK PRW-30Y-1B", qty: 1, returned: 0, price: 9500000 }],
      },
    ].map((o) => ({
      ...o,
      total: o.items.reduce((s, it) => s + Math.max(0, (it.qty - (it.returned || 0))) * it.price, 0),
    }));
    localStorage.setItem(key, JSON.stringify(demo));
    return demo;
  }

  function saveLocalOrders(list) {
    localStorage.setItem("ordersLocal", JSON.stringify(list));
  }

  function buildLayout(container) {
    container.innerHTML = `
      <div class="QLDH_page-header">
        <h3>Quản lý đơn hàng</h3>
        <p>Tra cứu theo ngày & trạng thái, xem chi tiết & cập nhật trạng thái</p>
      </div>

      <div class="QLDH_filters">
        <input type="date" id="QLDH_filterDate" />
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
              <th style="width:14%">Mã đơn</th>
              <th style="width:18%">Ngày</th>
              <th style="width:18%">Khách</th>
              <th style="width:14%">Tổng tiền</th>
              <th style="width:12%">Trạng thái</th>
              <th style="width:9%">Chi tiết</th>
              <th style="width:9%">Cập nhật</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="QLDH_table-content"></div>

      <div id="QLDH_modal" class="QLDH_modal" style="display:none">
        <div class="QLDH_modal-content">
          <div class="QLDH_modal-header">
            <h3>Chi tiết đơn hàng</h3>
            <span id="QLDH_closeModal" class="QLDH_close">&times;</span>
          </div>
          <div class="QLDH_modal-body">
            <p><strong>Mã đơn:</strong> <span id="QLDH_md_id"></span></p>
            <p><strong>Ngày:</strong> <span id="QLDH_md_date"></span></p>
            <p><strong>Khách:</strong> <span id="QLDH_md_customer"></span></p>
            <table class="QLDH_md_table">
              <thead>
                <tr>
                  <th>STT</th><th>Mã SP</th><th>Tên</th><th>SL</th><th>Đơn giá</th><th>Thành tiền</th>
                </tr>
              </thead>
              <tbody id="QLDH_md_tbody"></tbody>
            </table>
            <div class="QLDH_md_total">Tổng: <span id="QLDH_md_total"></span></div>
          </div>
        </div>
      </div>
    `;
  }

  function renderTable(list) {
    const wrap = document.querySelector(`#${SECTION_ID} .QLDH_table-content`);
    wrap.innerHTML = "";
    const table = document.createElement("table");
    table.className = "QLDH_admin-table";
    const tbody = document.createElement("tbody");

    list.forEach((o, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${o.id}</td>
        <td>${new Date(o.date).toLocaleString("vi-VN")}</td>
        <td>${o.customerName || "--"}</td>
        <td>${currency(o.total)}</td>
        <td>${ORDER_STATUS[o.status] || o.status}</td>
        <td><button class="QLDH_btn-detail" data-id="${o.id}">Xem</button></td>
        <td>
          <select class="QLDH_sel-status" data-id="${o.id}">
            <option value="moiDat" ${o.status === "moiDat" ? "selected" : ""}>Mới đặt</option>
            <option value="daXuLy" ${o.status === "daXuLy" ? "selected" : ""}>Đã xử lý</option>
            <option value="daGiao" ${o.status === "daGiao" ? "selected" : ""}>Đã giao</option>
            <option value="huy" ${o.status === "huy" ? "selected" : ""}>Hủy</option>
          </select>
        </td>`;
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrap.appendChild(table);

    // bind actions
    wrap.querySelectorAll(".QLDH_btn-detail").forEach((b) =>
      b.addEventListener("click", () => openDetail(b.dataset.id))
    );
    wrap.querySelectorAll(".QLDH_sel-status").forEach((s) =>
      s.addEventListener("change", (e) => updateStatus(e.target.dataset.id, e.target.value))
    );
  }

  function filterOrders(list) {
    const dateVal = document.getElementById("QLDH_filterDate").value;
    const stVal = document.getElementById("QLDH_filterStatus").value;
    const idText = document.getElementById("QLDH_searchId").value.trim().toLowerCase();

    return list.filter((o) => {
      const okDate = !dateVal || new Date(o.date).toISOString().slice(0, 10) === dateVal;
      const okStatus = stVal === "all" || o.status === stVal;
      const okId = !idText || (o.id || "").toLowerCase().includes(idText);
      return okDate && okStatus && okId;
    });
  }

  function openDetail(id) {
    const orders = getLocalOrders();
    const o = orders.find((x) => x.id === id);
    if (!o) return;

    document.getElementById("QLDH_md_id").textContent = o.id;
    document.getElementById("QLDH_md_date").textContent = new Date(o.date).toLocaleString("vi-VN");
    document.getElementById("QLDH_md_customer").textContent = o.customerName || "--";
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
    // render return controls
    const bodyEl = document.querySelector(`#${SECTION_ID} .QLDH_modal-body`);
    const oldControls = bodyEl.querySelector('.QLDH_return_controls');
    if (oldControls) oldControls.remove();
    const controls = document.createElement('div');
    controls.className = 'QLDH_return_controls';
    controls.innerHTML = `
      <h4>Trả hàng từng món</h4>
      <table class="QLDH_md_table"><thead>
        <tr><th>#</th><th>Mã SP</th><th>Tên</th><th>SL gốc</th><th>Đã trả</th><th>Trả thêm</th><th>Thực hiện</th></tr>
      </thead><tbody id="QLDH_rt_tbody"></tbody></table>
    `;
    bodyEl.appendChild(controls);

    const rtBody = controls.querySelector('#QLDH_rt_tbody');
    rtBody.innerHTML = '';
    o.items.forEach((it, i) => {
      const returned = it.returned || 0;
      const remaining = Math.max(0, it.qty - returned);
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${it.productId}</td>
        <td>${it.name || ''}</td>
        <td>${it.qty}</td>
        <td>${returned}</td>
        <td><input type="number" min="1" max="${remaining}" value="${remaining ? 1 : 0}" class="QLDH_rt_input" data-idx="${i}"></td>
        <td><button class="QLDH_rt_btn" data-idx="${i}">Trả</button></td>
      `;
      rtBody.appendChild(row);
    });

    rtBody.querySelectorAll('.QLDH_rt_btn').forEach((btn) =>
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.idx);
        const input = rtBody.querySelector(`.QLDH_rt_input[data-idx="${idx}"]`);
        const qty = Math.max(0, Math.round(Number(input.value) || 0));
        const it = o.items[idx];
        const returned = it.returned || 0;
        const remaining = Math.max(0, it.qty - returned);
        if (qty <= 0 || qty > remaining) {
          alert('Số lượng trả không hợp lệ');
          return;
        }
        it.returned = returned + qty;
        o.total = o.items.reduce((s, x) => s + Math.max(0, (x.qty - (x.returned || 0))) * x.price, 0);
        const list = getLocalOrders();
        const oi = list.findIndex((x) => x.id === o.id);
        if (oi !== -1) {
          list[oi] = o;
          saveLocalOrders(list);
        }
        renderTable(filterOrders(getLocalOrders()));
        openDetail(o.id);
        alert('Đã cập nhật trả hàng.');
      })
    );

    document.getElementById("QLDH_md_total").textContent = currency(o.total);
    document.getElementById("QLDH_modal").style.display = "flex";
  }

  function updateStatus(id, newStatus) {
    const orders = getLocalOrders();
    const idx = orders.findIndex((x) => x.id === id);
    if (idx === -1) return;
    orders[idx].status = newStatus;
    saveLocalOrders(orders);
    // re-render with current filters
    const filtered = filterOrders(orders);
    renderTable(filtered);
  }

  function attachEvents() {
    document.getElementById("QLDH_btnSearch").addEventListener("click", () => {
      const list = filterOrders(getLocalOrders());
      renderTable(list);
    });
    document.getElementById("QLDH_filterDate").addEventListener("change", () => {
      renderTable(filterOrders(getLocalOrders()));
    });
    document.getElementById("QLDH_filterStatus").addEventListener("change", () => {
      renderTable(filterOrders(getLocalOrders()));
    });
    document.getElementById("QLDH_closeModal").addEventListener("click", () => {
      document.getElementById("QLDH_modal").style.display = "none";
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

  // re-render when route changes
  window.addEventListener("hashchange", ensureMounted);
  document.addEventListener("DOMContentLoaded", ensureMounted);
})();

