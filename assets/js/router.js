const app = document.getElementById('app');

function loadPage(url) {
  const routes = {
    '#/': 'pages/home/home.html',
    '#/products': 'pages/product/DanhSachSanPham.html',
    '#/cart': 'GioHang.html'
  };

  // Ẩn popup login mỗi lần load page
  const loginModal = document.getElementById('login-modal');
  if (loginModal) loginModal.style.display = 'none';

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
    })
    .catch(err => {
      app.innerHTML = '<h2>Không tìm thấy trang!</h2>';
    });
}


document.addEventListener('click', e => {
  const a = e.target.closest('.menu a');
  if (!a) return;

  e.preventDefault();
  const url = a.getAttribute('href');

  if (url === '#/login') {
    document.getElementById('login-modal').style.display = 'flex';
    return; // không đổi hash
  }

  location.hash = url;
});


window.addEventListener('hashchange', () => {
  document.getElementById('login-modal').style.display = 'none'; // ẩn popup khi đổi hash
  loadPage(location.hash);
});


// Load ban đầu
window.addEventListener('DOMContentLoaded', () => loadPage(location.hash || '#/'));

// Đóng modal login
document.querySelector('#login-modal .close').addEventListener('click', () => {
  document.getElementById('login-modal').style.display = 'none';
});

const loginModal = document.getElementById('login-modal');
if (loginModal) loginModal.style.display = 'none';
