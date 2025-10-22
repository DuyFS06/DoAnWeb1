const app = document.getElementById('app');

function loadPage(url) {
  const routes = {
    '#/': 'pages/home/home.html',
    '#/products': 'pages/product/DanhSachSanPham.html',
    '#/cart': 'GioHang.html',
    '#/login': 'pages/login/DangNhap.html'
  };
  const file = routes[url] || 'pages/home/home.html';
  fetch(file)
    .then(res => res.text())
    .then(html => {
      app.innerHTML = html;
      if (url === '#/') {
        const bannerDiv = document.getElementById('banner-html');
        if (bannerDiv) {
          fetch('./includes/banner/banner.html')
            .then(res => res.text())
            .then(data => bannerDiv.innerHTML = data);
        }
      }
    });
}

document.addEventListener('click', e => {
  if (e.target.closest('.menu a')) {
    e.preventDefault();
    const url = e.target.getAttribute('href');
    location.hash = url;
  }
});

window.addEventListener('hashchange', () => {
  loadPage(location.hash);
});


window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    loadPage(location.hash || '#/');
  }, 100);
});
