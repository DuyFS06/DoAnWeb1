// Quản lý đơn hàng khách: lọc theo ngày & tình trạng, xem chi tiết & cập nhật trạng thái
(function () {
  const KEY = "orders";

  function getProducts() {
    try {
      return getLocalProducts();
    } catch (e) {
      return window.products || [];
    }
  }

  function findProductMap() {
    const map = {};
    getProducts().forEach((p) => (map[p.id] = p));
    return map;
  }

  function seedSample() {
    const map = findProductMap();
    const now = new Date();
    const d = (offset) => new Date(now.getTime() - offset * 86400000).toISOString();
    const pick = (id, qty) => {
      const p = map[id];
      if (!p) return null;
      const unit = p.priceValue; // dùng giá bán niêm yết mặc định
      return { productId: p.id, name: p.name, quantity: qty, unitPrice: unit };
    };
    const orders = [
      {
        id: "DH001",
        createdAt: d(1),
        customerName: "Nguyễn Văn A",
        status: "new",
        items: [pick("BA-110AH-6A", 1), pick("EFV-650D-2BV", 2)].filter(Boolean),
      },
      {
        id: "DH002",
        createdAt: d(3),
        customerName: "Trần Thị B",
        status: "processing",
        items: [pick("GMW-B5000SS-2", 1)].filter(Boolean),
      },
      {
        id: "DH003",
        createdAt: d(7),
        customerName: "Lê C",
        status: "shipped",
        items: [pick("SHE-3517L-1A", 3), pick("BG-169U-3", 1)].filter(Boolean),
      },
      {
        id: "DH004",
        createdAt: d(0),
        customerName: "Phạm D",
        status: "cancelled",
        items: [pick("PRW-30Y-1B", 1)].filter(Boolean),
      },
    ];
    localStorage.setItem(KEY, JSON.stringify(orders));
    return orders;
  }

  function getOrders() {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
    return seedSample();
  }

  function saveOrders(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function formatVnd(n) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n || 0);
  }

  function orderTotal(o) {
    return (o.items || []).reduce((s, it) => s + (it.quantity * it.unitPrice), 0);
  }

  function withinDate(iso, fromStr, toStr) {
    const t = new Date(iso).setHours(0,0,0,0);
    if (fromStr) {
      const f = new Date(fromStr).setHours(0,0,0,0);
      if (t < f) return false;
    }
    if (toStr) {
      const e = new Date(toStr).setHours(23,59,59,999);
      if (new Date(iso) > e) return false;
    }
    return true;
  }

  function render() {
    const tbody = document.getElementById("OD_tbody");
    if (!tbody) return;
    const q = (document.getElementById("OD_search")?.value || "").trim().toLowerCase();
    const from = document.getElementById("OD_from")?.value || "";
    const to = document.getElementById("OD_to")?.value || "";
    const st = document.getElementById("OD_status")?.value || "all";
    const data = getOrders();

    const filtered = data.filter((o) => {
      const txt = `${o.id} ${o.customerName}`.toLowerCase();
      const matchText = !q || txt.includes(q);
      const matchDate = withinDate(o.createdAt, from, to);
      const matchStatus = st === "all" || o.status === st;
      return matchText && matchDate && matchStatus;
    });

    tbody.innerHTML = "";
    filtered.forEach((o) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${o.id}</td>
        <td>${new Date(o.createdAt).toLocaleString("vi-VN")}</td>
        <td>${o.customerName}</td>
        <td>${formatVnd(orderTotal(o))}</td>
        <td>${statusBadge(o.status)}</td>
        <td><button class="btn btn-primary od-view" data-id="${o.id}">Xem</button></td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.od-view').forEach((b) => {
      b.addEventListener('click', () => openDetail(b.getAttribute('data-id')));
    });
  }

  function statusBadge(st) {
    const map = { new: "Mới đặt", processing: "Đã xử lý", shipped: "Đã giao", cancelled: "Hủy" };
    return `<span class="status-badge">${map[st] || st}</span>`;
  }

  function openDetail(id) {
    const list = getOrders();
    const o = list.find((x) => x.id === id);
    if (!o) return;
    const map = findProductMap();
    const modal = document.getElementById("OD_modal");
    const info = document.getElementById("OD_detailInfo");
    const body = document.getElementById("OD_detailBody");
    const sel = document.getElementById("OD_updateStatus");
    if (!modal) return;
    info.innerHTML = `
      <p><strong>Mã đơn:</strong> ${o.id}</p>
      <p><strong>Ngày đặt:</strong> ${new Date(o.createdAt).toLocaleString("vi-VN")}</p>
      <p><strong>Khách hàng:</strong> ${o.customerName}</p>
      <p><strong>Tổng tiền:</strong> ${formatVnd(orderTotal(o))}</p>
    `;
    body.innerHTML = "";
    (o.items || []).forEach((it) => {
      const p = map[it.productId] || {};
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${it.productId}</td>
        <td>${p.name || it.name || ""}</td>
        <td>${it.quantity}</td>
        <td>${formatVnd(it.unitPrice)}</td>
        <td>${formatVnd(it.unitPrice * it.quantity)}</td>
      `;
      body.appendChild(tr);
    });
    if (sel) sel.value = o.status;
    modal.style.display = "block";

    const saveBtn = document.getElementById("OD_saveStatus");
    saveBtn.onclick = function () {
      const nv = sel.value;
      const orders = getOrders();
      const idx = orders.findIndex((x) => x.id === id);
      if (idx >= 0) {
        orders[idx].status = nv;
        saveOrders(orders);
        render();
        closeDetail();
      }
    };
  }

  function closeDetail() {
    const modal = document.getElementById("OD_modal");
    if (modal) modal.style.display = "none";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const btnFilter = document.getElementById("OD_btnFilter");
    btnFilter && btnFilter.addEventListener("click", render);
    const btnSearch = document.getElementById("OD_btnSearch");
    btnSearch && btnSearch.addEventListener("click", render);
    const search = document.getElementById("OD_search");
    search && search.addEventListener("keyup", (e) => { if (e.key === "Enter") render(); });
    const close = document.getElementById("OD_close");
    close && close.addEventListener("click", closeDetail);
    // initial
    render();
  });
})();

