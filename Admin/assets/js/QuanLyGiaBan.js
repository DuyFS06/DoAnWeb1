// Quản lý giá bán: hiển thị & nhập/sửa % lợi nhuận, tra cứu giá vốn/%LN/giá bán
(function () {
  const KEY_GLOBAL = "globalMarginPercent";
  const KEY_PER_PRODUCT = "productMargins"; // { [productId]: number }

  function getProducts() {
    try {
      return getLocalProducts();
    } catch (e) {
      return window.products || [];
    }
  }

  function getGlobalMargin() {
    const v = localStorage.getItem(KEY_GLOBAL);
    return v ? Number(v) : 0;
  }

  function setGlobalMargin(pct) {
    localStorage.setItem(KEY_GLOBAL, String(pct));
  }

  function getPerProductMargins() {
    const raw = localStorage.getItem(KEY_PER_PRODUCT);
    return raw ? JSON.parse(raw) : {};
  }

  function setPerProductMargins(map) {
    localStorage.setItem(KEY_PER_PRODUCT, JSON.stringify(map));
  }

  function computeSellPrice(importPrice, marginPct) {
    const pct = isFinite(marginPct) ? marginPct : 0;
    return Math.round(importPrice * (1 + pct / 100));
  }

  function formatVnd(n) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n || 0);
  }

  function renderTable(list) {
    const tbody = document.getElementById("PR_tbody");
    if (!tbody) return;
    const margins = getPerProductMargins();
    const globalPct = getGlobalMargin();
    tbody.innerHTML = "";

    list.forEach((p) => {
      const row = document.createElement("tr");
      const currentPct = margins[p.id] != null ? margins[p.id] : globalPct;
      const sell = computeSellPrice(p.importPrice ?? p.priceValue, currentPct);
      row.innerHTML = `
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${formatVnd(p.importPrice ?? 0)}</td>
        <td>
          <input type="number" class="pr-input" data-id="${p.id}" value="${currentPct}" min="0" max="500" step="1" style="width:80px" />
        </td>
        <td>${formatVnd(sell)}</td>
        <td>
          <button class="btn btn-primary pr-save" data-id="${p.id}">Lưu</button>
          <button class="btn btn-secondary pr-clear" data-id="${p.id}">Xóa tùy chỉnh</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    tbody.querySelectorAll(".pr-save").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const input = tbody.querySelector(`.pr-input[data-id="${id}"]`);
        const val = Number(input.value);
        const map = getPerProductMargins();
        map[id] = isFinite(val) && val >= 0 ? val : 0;
        setPerProductMargins(map);
        // re-render to update computed price
        render();
      });
    });

    tbody.querySelectorAll(".pr-clear").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const map = getPerProductMargins();
        delete map[id];
        setPerProductMargins(map);
        render();
      });
    });
  }

  function render() {
    const list = getProducts();
    const q = (document.getElementById("PR_search")?.value || "").trim().toLowerCase();
    const filtered = q
      ? list.filter((p) => p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q))
      : list;
    const input = document.getElementById("PR_marginGlobal");
    if (input) input.value = String(getGlobalMargin());
    renderTable(filtered);
  }

  function applyGlobal() {
    const input = document.getElementById("PR_marginGlobal");
    const val = Number(input.value);
    setGlobalMargin(isFinite(val) && val >= 0 ? val : 0);
    render();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const btnGlobal = document.getElementById("PR_btnApplyGlobal");
    btnGlobal && btnGlobal.addEventListener("click", applyGlobal);
    const btnSearch = document.getElementById("PR_btnSearch");
    btnSearch && btnSearch.addEventListener("click", render);
    const search = document.getElementById("PR_search");
    search && search.addEventListener("keyup", (e) => {
      if (e.key === "Enter") render();
    });
    render();
  });
})();


