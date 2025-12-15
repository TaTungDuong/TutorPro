// scripts/tutor_profile.js

// Dữ liệu ứng tuyển/yêu cầu lớp giả lập
const MOCK_APPLICATIONS = [
    { id: 'L00125', subject: 'Tiếng Anh Giao tiếp (B2)', date: '25/10/2025', status: 'pending' },
    { id: 'L00124', subject: 'Hóa 8 - Củng cố', date: '18/10/2025', status: 'approved' },
    { id: 'L00123', subject: 'Lý 12 - Ôn thi ĐH', date: '10/10/2025', status: 'rejected' },
    { id: 'L00122', subject: 'Toán 7 - Học kỳ I', date: '01/11/2025', status: 'pending' },
];

document.addEventListener('DOMContentLoaded', function() {
    renderApplicationList(MOCK_APPLICATIONS);
    attachProfileListeners();
});

// Hàm hiển thị danh sách ứng tuyển
function renderApplicationList(applications) {
    const listBody = document.getElementById('application-list-body');
    if (!listBody) return;
    listBody.innerHTML = ''; 

    applications.forEach(app => {
        let statusBadge = '';
        let statusText = '';
        
        if (app.status === 'approved') {
            statusText = 'Đã chọn';
            statusBadge = `<span class="status-badge status-active">${statusText}</span>`;
        } else if (app.status === 'pending') {
            statusText = 'Chờ duyệt';
            statusBadge = `<span class="status-badge status-pending">${statusText}</span>`;
        } else {
            statusText = 'Bị từ chối';
            statusBadge = `<span class="status-badge status-danger">${statusText}</span>`;
        }

        const item = `
            <div class="class-card request-item">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>Yêu cầu ${app.id}: ${app.subject}</strong>
                        <p style="font-size: 13px; color: #888;">Đăng ký ngày: ${app.date}</p>
                    </div>
                    ${statusBadge}
                </div>
            </div>
        `;
        listBody.innerHTML += item;
    });
}

// Hàm gắn sự kiện
function attachProfileListeners() {
    document.querySelector('.action-edit-profile')?.addEventListener('click', function() {
        // Mô phỏng logic chuyển sang chế độ chỉnh sửa
        alert("Mở chế độ chỉnh sửa hồ sơ. (API: PUT /api/tutors/profile)");
        // Khi làm thực tế, bạn sẽ bật/tắt thuộc tính 'readonly' trên các trường input
    });
}