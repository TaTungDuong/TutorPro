// scripts/class_management.js

// Dữ liệu lớp học giả lập (Mock Data)
const MOCK_CLASS_DATA = [
    { id: 101, subject: 'Toán 9 - Lớp Cỏ Mai', level: 'Cấp 2', status: 'Active', schedule: 'T3, T5 (18:00 - 20:30)', fee: '300.000 VNĐ/buổi', progress: '8/24 buổi', role: 'Staff' },
    { id: 102, subject: 'Văn 6 - Yêu cầu mới', level: 'Cấp 2', status: 'Open', schedule: 'T7, CN (Sáng)', fee: '300.000 VNĐ/buổi', progress: 'Chờ gia sư', role: 'Staff' },
    { id: 103, subject: 'Tiếng Anh Giao tiếp (B1)', level: 'Người lớn', status: 'Closed', schedule: 'T4 (20:00 - 21:00)', fee: '250.000 VNĐ/buổi', progress: '19/20 buổi', role: 'Staff' },
    { id: 201, subject: 'Vật Lý 12 - Ôn thi ĐH', level: 'Cấp 3', status: 'Active', schedule: 'T7, CN (Chiều)', fee: '400.000 VNĐ/buổi', progress: '10/30 buổi', role: 'Tutor' },
];

document.addEventListener('DOMContentLoaded', function() {
    const userRole = localStorage.getItem('userRole');

    // 1. Kiểm tra vai trò và điều hướng nếu cần (guard)
    if (!userRole) {
        alert("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
        window.location.href = 'index.html';
        return;
    }
    
    console.log(`Người dùng đang ở vai trò: ${userRole}`);

    // 2. Lấy dữ liệu giả lập và hiển thị
    renderClassList(MOCK_CLASS_DATA, userRole);

    // 3. Gắn sự kiện cho các nút hành động
    attachEventListeners(userRole);
});


// Hàm hiển thị danh sách lớp dựa trên dữ liệu giả lập và vai trò
function renderClassList(classes, userRole) {
    const classGrid = document.querySelector('.class-list-grid');
    classGrid.innerHTML = ''; // Xóa nội dung tĩnh cũ
    
    // Lọc dữ liệu theo vai trò (đơn giản hóa)
    const filteredClasses = classes.filter(cls => {
        // Giả sử Admin/Staff thấy tất cả (Role: Staff), Gia sư/Phụ huynh chỉ thấy những lớp liên quan
        return userRole === 'Admin' || userRole === 'Staff' || cls.role === userRole;
    });


    filteredClasses.forEach(classData => {
        let statusClass = '';
        let statusTagText = '';
        let actionButtons = '';
        
        // Thiết lập giao diện theo Trạng thái (Status)
        if (classData.status === 'Open') {
            statusClass = 'status-pending';
            statusTagText = 'Chờ gia sư';
        } else if (classData.status === 'Active') {
            statusClass = 'status-active';
            statusTagText = 'Đang hoạt động';
        } else {
            statusClass = 'status-closing';
            statusTagText = 'Đã chốt/Sắp kết thúc';
        }

        // Thiết lập nút hành động theo VAI TRÒ (Role)
        if (userRole === 'Parent' && classData.status === 'Active') {
            actionButtons = `<button class="btn btn-primary action-confirm-session" data-id="${classData.id}">Xác nhận Buổi học (PH)</button>`;
        } else if (userRole === 'Tutor' && classData.status === 'Active') {
            actionButtons = `<button class="btn btn-secondary action-attendence" data-id="${classData.id}">Điểm danh (GS)</button>`;
        } else if (userRole === 'Tutor' && classData.status === 'Open') {
            actionButtons = `<button class="btn btn-success action-apply" data-id="${classData.id}">Đăng ký Nhận Lớp (GS)</button>`;
        } else if (userRole === 'Staff' || userRole === 'Admin') {
            actionButtons = `<button class="btn btn-primary action-review" data-id="${classData.id}">Duyệt Lớp / Xem Chi Tiết</button>`;
        }


        // Tạo thẻ HTML động
        const cardHTML = `
            <div class="class-card ${statusClass}" data-class-id="${classData.id}">
                <span class="status-tag">${statusTagText}</span>
                <h2>${classData.subject} (${classData.level})</h2>
                <p>Địa điểm: ${classData.location}</p>
                <p>Lịch học: ${classData.schedule}</p>
                <p>Tiến độ: ${classData.progress}</p>
                <div class="card-actions">${actionButtons}</div>
            </div>
        `;
        classGrid.innerHTML += cardHTML;
    });
}

// Hàm gắn sự kiện (Dùng cho tất cả các nút hành động)
function attachEventListeners(userRole) {
    document.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('action-confirm-session')) {
            alert(`[PH] Lớp ${target.getAttribute('data-id')}: Xác nhận buổi học thành công.`);
            // Mô phỏng: Sau khi xác nhận, cần load lại danh sách lớp: renderClassList(MOCK_CLASS_DATA, userRole);
        } else if (target.classList.contains('action-attendence')) {
            alert(`[GS] Lớp ${target.getAttribute('data-id')}: Điểm danh thành công. (Chờ PH xác nhận)`);
        } else if (target.classList.contains('action-apply')) {
            alert(`[GS] Lớp ${target.getAttribute('data-id')}: Đã gửi đơn ứng tuyển.`);
        } else if (target.classList.contains('action-review')) {
            alert(`[Admin/Staff] Lớp ${target.getAttribute('data-id')}: Mở trang duyệt lớp/hồ sơ chi tiết.`);
        }
    });
}