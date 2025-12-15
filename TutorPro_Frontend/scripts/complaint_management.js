// scripts/complaint_management.js

// Dữ liệu giả lập đã thêm trường 'description'
const MOCK_COMPLAINT_DATA = [
    { 
        id: 'KN051', 
        sender: 'Phụ huynh B', 
        type: 'Thái độ Gia sư', 
        description: 'Gia sư thường xuyên đi muộn 15 phút mà không báo trước. Hôm nay còn có thái độ không hợp tác khi tôi nhắc nhở về bài tập về nhà.', // DESCRIPTION mới
        date: '20/10/2025', 
        status: 'new' 
    },
    { 
        id: 'KN052', 
        sender: 'Gia sư C', 
        type: 'Chậm lương', 
        description: 'Trung tâm đã chậm thanh toán thù lao tháng 10 của tôi 5 ngày so với hợp đồng.',
        date: '25/11/2025', 
        status: 'processing' 
    },
    { 
        id: 'KN053', 
        sender: 'Phụ huynh D', 
        type: 'Đổi Gia sư', 
        description: 'Gia sư hiện tại không phù hợp với mục tiêu học của con tôi (muốn học nâng cao nhưng GS chỉ dạy cơ bản). Yêu cầu đổi gia sư.',
        date: '01/12/2025', 
        status: 'resolved' 
    },
];

document.addEventListener('DOMContentLoaded', function() {
    renderComplaintTable(MOCK_COMPLAINT_DATA);
    attachComplaintListeners();
});

function renderComplaintTable(complaints) {
    const tableBody = document.getElementById('complaint-list-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    complaints.forEach(item => {
        let statusBadge = '';
        let actionButtons = '';
        
        if (item.status === 'new') {
            statusBadge = `<span class="status-badge status-danger">Mới</span>`;
            actionButtons = `<button class="btn btn-danger btn-sm action-process" data-id="${item.id}">Xử lý</button>`;
        } else if (item.status === 'processing') {
            statusBadge = `<span class="status-badge status-pending">Đang xử lý</span>`;
            actionButtons = `<button class="btn btn-primary btn-sm action-update" data-id="${item.id}">Cập nhật</button>`;
        } else {
            statusBadge = `<span class="status-badge status-active">Đã giải quyết</span>`;
            actionButtons = `<button class="btn btn-outline btn-sm action-view-details" data-id="${item.id}">Xem CT</button>`;
        }

        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.sender}</td>
                <td>${item.type}</td>
                <td>
                    <button class="btn btn-outline btn-sm action-show-description" data-id="${item.id}">Xem chi tiết</button>
                </td>
                <td>${item.date}</td>
                <td>${statusBadge}</td>
                <td>${actionButtons}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function attachComplaintListeners() {
    const modal = document.getElementById('complaint-modal');
    const modalDescription = document.getElementById('modal-description');
    const closeModalButton = document.getElementById('close-modal');

    // Logic xử lý khi click vào nút "Xem chi tiết" (Nội dung)
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        if (target.classList.contains('action-show-description')) {
            const id = target.getAttribute('data-id');
            const complaint = MOCK_COMPLAINT_DATA.find(c => c.id === id);
            
            if (complaint) {
                // Hiển thị nội dung mô tả trong modal
                modalDescription.textContent = complaint.description;
                modal.style.display = 'flex'; // Hiển thị modal
            }
        } else if (target.classList.contains('action-process')) {
            alert(`[Nhân viên] Bắt đầu xử lý khiếu nại ${target.getAttribute('data-id')}.`);
        }
    });

    // Logic đóng modal
    closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Đóng modal khi click ra ngoài backdrop
    modal.addEventListener('click', function(e) {
        if (e.target.id === 'complaint-modal') {
            modal.style.display = 'none';
        }
    });
}