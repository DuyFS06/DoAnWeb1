// Ẩn hiện các trang SPA trong trang quản trị và xử lý điều hướng giữa chúng
(function() {
    const routeToId = {
        '/': 'page-dashboard',
        '/customers': 'page-customers',
        '/categories': 'page-categories',
        '/products': 'page-products',
        '/import': 'page-import',
        '/inventory': 'page-inventory',
        '/prices': 'page-prices',
        '/orders': 'page-orders',
        '/reports': 'page-reports',
        '/order-detail': 'page-order-detail',
        '/orders-list': 'page-orders-list',
        '/customers-list': 'page-customers-list'
    };

    function hideAllPages() {
        document.querySelectorAll('.spa-page').forEach(p => p.classList.remove('active'));
    }

    function setActiveMenu(route) {
        document.querySelectorAll('.menu-item').forEach(mi => mi.classList.remove('active'));
        const link = document.querySelector(`a[data-route="${route}"]`);
        if (link) {
            const li = link.closest('.menu-item');
            if (li) li.classList.add('active');
        }
    }

    function showRoute(route) {
        const id = routeToId[route] || routeToId['/'];
        hideAllPages();
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
        setActiveMenu(route);
        // Cập nhật hash cho việc đánh dấu/bắt lại trang hiện tại
        if (location.hash !== route) {
            location.hash = route;
        }
        // Nếu trang tổng quan được hiển thị, làm mới các chỉ số của nó (nếu có)
        if ((route === '/' || route === '') && window.AdminDashboard && typeof window.AdminDashboard.updateMetrics === 'function') {
            try { window.AdminDashboard.updateMetrics(); } catch (e) { console.warn('updateMetrics failed', e); }
        }
    }

    function handleLinkClick(e) {
        const a = e.target.closest('a[data-route]');
        if (!a) return;
        e.preventDefault();
        const route = a.getAttribute('data-route');
        showRoute(route);
    }

    document.addEventListener('click', handleLinkClick);

    window.addEventListener('hashchange', function() {
        const route = location.hash ? location.hash.slice(1) : '/';
        showRoute(route);
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Xác định trang ban đầu từ hash hoặc tham số truy vấn
        // Nếu không có, mặc định là trang tổng quan
        const fromHash = location.hash ? location.hash.slice(1) : null;
        const params = new URLSearchParams(location.search);
        const fromQuery = params.get('page');

        const initial = fromHash || (fromQuery ? fromQuery : '/');
        showRoute(initial);
    });

    // export các hàm ra bên ngoài nếu cần
    window.adminSpa = {
        showRoute,
        routeToId
    };
})();