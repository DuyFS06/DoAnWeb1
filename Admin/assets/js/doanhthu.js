// Báo cáo doanh thu: tổng doanh thu, đơn hàng, lợi nhuận; top sản phẩm
(function () {
  function getOrders() {
    const raw = localStorage.getItem('orders');
    return raw ? JSON.parse(raw) : [];
  }
  function getProducts() {
    try { return getLocalProducts(); } catch(e) { return window.products || []; }
  }
  const prodMap = {}; getProducts().forEach(p => prodMap[p.id] = p);

  function formatVnd(n){
    return new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(n||0);
  }
  function inRange(iso, fromStr, toStr){
    const t = new Date(iso).getTime();
    if (fromStr){ const f = new Date(fromStr).setHours(0,0,0,0); if (t < f) return false; }
    if (toStr){ const e = new Date(toStr).setHours(23,59,59,999); if (t > e) return false; }
    return true;
  }
  function keyBy(iso, mode){
    const d = new Date(iso);
    if (mode === 'month') return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function calcProfitItem(it){
    const p = prodMap[it.productId] || {};
    const importPrice = p.importPrice || 0;
    return (it.unitPrice - importPrice) * it.quantity;
  }

  function runReport(){
    const from = document.getElementById('RP_from')?.value || '';
    const to = document.getElementById('RP_to')?.value || '';
    const groupBy = document.getElementById('RP_groupBy')?.value || 'day';
    const orders = getOrders().filter(o => inRange(o.createdAt, from, to));

    let totalRevenue = 0; let totalOrders = orders.length; let totalProfit = 0;
    const rows = {};
    const top = {}; // productId -> {qty, revenue}

    orders.forEach(o => {
      const k = keyBy(o.createdAt, groupBy);
      if (!rows[k]) rows[k] = { revenue:0, orders:0, profit:0 };
      rows[k].orders += 1;
      (o.items||[]).forEach(it => {
        const rev = it.quantity * it.unitPrice;
        const prof = calcProfitItem(it);
        rows[k].revenue += rev;
        rows[k].profit += prof;
        totalRevenue += rev;
        totalProfit += prof;
        if (!top[it.productId]) top[it.productId] = { qty:0, revenue:0 };
        top[it.productId].qty += it.quantity;
        top[it.productId].revenue += rev;
      });
    });

    // KPIs
    const elRev = document.getElementById('RP_totalRevenue'); if (elRev) elRev.textContent = formatVnd(totalRevenue);
    const elOrd = document.getElementById('RP_totalOrders'); if (elOrd) elOrd.textContent = String(totalOrders);
    const elPro = document.getElementById('RP_totalProfit'); if (elPro) elPro.textContent = formatVnd(totalProfit);

    // Table by time
    const tbody = document.getElementById('RP_tbody'); if (tbody){
      tbody.innerHTML = '';
      Object.keys(rows).sort().forEach(k => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${k}</td>
          <td>${formatVnd(rows[k].revenue)}</td>
          <td>${rows[k].orders}</td>
          <td>${formatVnd(rows[k].profit)}</td>
        `;
        tbody.appendChild(tr);
      });
    }

    // Top products
    const tBody = document.getElementById('RP_topBody'); if (tBody){
      tBody.innerHTML = '';
      const arr = Object.keys(top).map(id => ({ id, ...top[id] }))
        .sort((a,b)=> b.qty - a.qty).slice(0,10);
      arr.forEach(x => {
        const p = prodMap[x.id] || {};
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${x.id}</td>
          <td>${p.name || ''}</td>
          <td>${x.qty}</td>
          <td>${formatVnd(x.revenue)}</td>
        `;
        tBody.appendChild(tr);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('RP_btnRun');
    btn && btn.addEventListener('click', runReport);
    // Default: show this month
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const f = document.getElementById('RP_from'); if (f) f.valueAsDate = monthStart;
    const t = document.getElementById('RP_to'); if (t) t.valueAsDate = today;
    runReport();
  });
})();

