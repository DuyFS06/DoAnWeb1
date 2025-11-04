// ==================== BÁO CÁO DOANH THU ====================
(function () {
  const SECTION_ID = "page-reports";

  function currency(v) {
    return (v || 0).toLocaleString("vi-VN") + "₫";
  }

  function getOrders() {
    try {
      return JSON.parse(localStorage.getItem("ordersLocal") || "[]");
    } catch (e) {
      return [];
    }
  }

  function buildLayout(root) {
    root.innerHTML = `
      <div class="BCDT_header">
        <h3>Báo cáo doanh thu</h3>
        <p>Tổng quan doanh thu và mặt hàng bán chạy</p>
      </div>
      <div class="BCDT_filters">
        <label>Từ ngày <input type="date" id="BCDT_from" /></label>
        <label>Đến ngày <input type="date" id="BCDT_to" /></label>
        <button id="BCDT_apply">Áp dụng</button>
      </div>
      <div class="BCDT_cards">
        <div class="BCDT_card"><div class="title">Tổng doanh thu</div><div id="BCDT_total" class="value">0₫</div></div>
        <div class="BCDT_card"><div class="title">Số đơn</div><div id="BCDT_orders" class="value">0</div></div>
        <div class="BCDT_card"><div class="title">Giá trị TB/đơn</div><div id="BCDT_avg" class="value">0₫</div></div>
      </div>
      <div class="BCDT_twoCols">
        <div class="BCDT_panel">
          <h4>Doanh thu theo ngày</h4>
          <div id="BCDT_chart" class="BCDT_chart"></div>
        </div>
        <div class="BCDT_panel">
          <h4>Top sản phẩm bán chạy</h4>
          <table class="BCDT_table"><thead><tr><th>#</th><th>Tên</th><th>SL</th><th>Doanh thu</th></tr></thead><tbody id="BCDT_top"></tbody></table>
        </div>
      </div>
    `;
  }

  function within(dateISO, fromISO, toISO) {
    const d = new Date(dateISO).getTime();
    if (fromISO) {
      const f = new Date(fromISO).setHours(0, 0, 0, 0);
      if (d < f) return false;
    }
    if (toISO) {
      const t = new Date(toISO).setHours(23, 59, 59, 999);
      if (d > t) return false;
    }
    return true;
  }

  function compute(orders, from, to) {
    const filtered = orders.filter((o) => within(o.date, from, to) && o.status !== "huy");
    const total = filtered.reduce((s, o) => s + (o.total || 0), 0);
    const count = filtered.length;
    const avg = count ? Math.round(total / count) : 0;

    // revenue by date (yyyy-mm-dd)
    const byDate = {};
    filtered.forEach((o) => {
      const key = new Date(o.date).toISOString().slice(0, 10);
      byDate[key] = (byDate[key] || 0) + (o.total || 0);
    });

    // top products
    const prod = {};
    filtered.forEach((o) => {
      (o.items || []).forEach((it) => {
        const k = it.name || it.productId;
        if (!prod[k]) prod[k] = { qty: 0, rev: 0 };
        prod[k].qty += it.qty || 0;
        prod[k].rev += (it.qty || 0) * (it.price || 0);
      });
    });
    const top = Object.entries(prod)
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 8);

    return { total, count, avg, byDate, top };
  }

  function render(data) {
    document.getElementById("BCDT_total").textContent = currency(data.total);
    document.getElementById("BCDT_orders").textContent = String(data.count);
    document.getElementById("BCDT_avg").textContent = currency(data.avg);

    // chart bars
    const chart = document.getElementById("BCDT_chart");
    chart.innerHTML = "";
    const entries = Object.entries(data.byDate).sort((a, b) => a[0].localeCompare(b[0]));
    const max = entries.reduce((m, [, v]) => Math.max(m, v), 0) || 1;
    entries.forEach(([d, v]) => {
      const row = document.createElement("div");
      row.className = "BCDT_barRow";
      const label = document.createElement("div");
      label.className = "BCDT_barLabel";
      label.textContent = d;
      const bar = document.createElement("div");
      bar.className = "BCDT_bar";
      bar.style.width = Math.max(4, Math.round((v / max) * 100)) + "%";
      bar.textContent = currency(v);
      row.appendChild(label);
      row.appendChild(bar);
      chart.appendChild(row);
    });

    // top products
    const tb = document.getElementById("BCDT_top");
    tb.innerHTML = "";
    data.top.forEach((t, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${i + 1}</td><td>${t.name}</td><td>${t.qty}</td><td>${currency(t.rev)}</td>`;
      tb.appendChild(tr);
    });
  }

  function attach() {
    document.getElementById("BCDT_apply").addEventListener("click", () => {
      const from = document.getElementById("BCDT_from").value;
      const to = document.getElementById("BCDT_to").value;
      // always re-pull latest orders from localStorage
      render(compute(getOrders(), from, to));
    });
  }

  function ensureMounted() {
    const sec = document.getElementById(SECTION_ID);
    if (!sec) return;
    if (!sec.dataset.bound) {
      buildLayout(sec);
      attach();
      sec.dataset.bound = "1";
    }
    const from = document.getElementById("BCDT_from").value;
    const to = document.getElementById("BCDT_to").value;
    render(compute(getOrders(), from, to));
  }

  window.addEventListener("hashchange", ensureMounted);
  document.addEventListener("DOMContentLoaded", ensureMounted);
  // auto refresh when localStorage changes in other tabs/windows
  window.addEventListener("storage", (e) => {
    if (e.key === "ordersLocal") ensureMounted();
  });
  // refresh when returning to the tab
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) ensureMounted();
  });
})();

