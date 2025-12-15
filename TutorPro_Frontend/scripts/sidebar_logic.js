// scripts/sidebar_logic.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Lấy URL hiện tại của trang (ví dụ: /tutor_management.html)
    const currentPath = window.location.pathname;
    
    // Lấy tên file HTML hiện tại (ví dụ: tutor_management.html)
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    // 2. Lấy tất cả các liên kết trong Sidebar
    const navItems = document.querySelectorAll('.sidebar .nav-item');

    navItems.forEach(item => {
        // Lấy đường dẫn của liên kết trong Sidebar (href)
        const itemHref = item.getAttribute('href');
        
        // Kiểm tra xem đường dẫn liên kết có khớp với tên file hiện tại không
        if (itemHref && itemHref === currentFile) {
            // 3. Nếu khớp, thêm class 'active'
            item.classList.add('active');
        }
    });
});