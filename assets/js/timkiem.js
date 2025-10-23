document.addEventListener('DOMContentLoaded', function() {
  const filterSelects = document.querySelectorAll('.filter-select');
  const filterCountDisplay = document.getElementById('filter-count');

  // Thu thập tiêu chí lọc
  function collectFilterCriteria() {
    const criteria = {};
    filterSelects.forEach(select => {
      const id = select.id.replace('filter-', '');
      const value = select.value;
      if (value !== 'all') criteria[id] = value;
    });
    return criteria;
  }

  // Giả lập kết quả lọc
  async function filterAndCountProducts(criteria) {
    let baseCount = 1993;
    const activeCount = Object.keys(criteria).length;

    if (activeCount === 1) baseCount = 500;
    else if (activeCount === 2) baseCount = 120;
    else if (activeCount >= 3) baseCount = 20;

    // ví dụ kết hợp cụ thể
    if (criteria.price === '10-up' && criteria.color === 'black') {
      baseCount = 3;
    }
    return baseCount;
  }

  // Cập nhật kết quả
  async function handleAutoFilter() {
    const criteria = collectFilterCriteria();
    filterCountDisplay.innerHTML = `<span class="text-warning">Đang lọc...</span>`;
    const total = await filterAndCountProducts(criteria);
    filterCountDisplay.innerHTML = `<span class="text-success">${total} sản phẩm phù hợp với tiêu chí lọc.</span>`;
  }

  // Tự động lọc mỗi khi thay đổi tiêu chí
  filterSelects.forEach(select => {
    select.addEventListener('change', handleAutoFilter);
  });
});
