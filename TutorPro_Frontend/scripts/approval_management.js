// scripts/approval_management.js

const MOCK_APPROVAL_DATA = [
    { id: 'L00123', request: 'Lý 12 - Ôn thi ĐH', applicants: 3, status: 'pending', selectedTutor: null },
    { id: 'L00124', request: 'Hóa 8 - Củng cố', applicants: 1, status: 'review', selectedTutor: 'Gia sư B' },
    { id: 'L00120', request: 'Tiếng Anh 10', applicants: 2, status: 'closed', selectedTutor: 'Gia sư C' },
];

document.addEventListener('DOMContentLoaded', function() {
    renderApprovalTable(MOCK_APPROVAL_DATA);
    attachApprovalListeners();
});

function renderApprovalTable(approvals) {
    const tableBody = document.getElementById('approval-list-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    approvals.forEach(item => {
        let statusBadge = '';
        let actionButtons = '';
        let statusText = '';
        
        if (item.status === 'pending') {
            statusText = 'Chờ duyệt GS';
            statusBadge = `<span class="status-badge status-pending">${statusText}</span>`;
            actionButtons = `
                <button class="btn btn-primary btn-sm action-review" data-id="${item.id}">Duyệt & Chốt</button>
                <button class="btn btn-danger btn-sm action-reject" data-id="${item.id}">Từ chối</button>
            `;
        } else if (item.status === 'review') {
            statusText = 'Đã chọn GS';
            statusBadge = `<span class="status-badge status-active">${statusText}</span>`;
            actionButtons = `
                <button class="btn btn-success btn-sm action-contract" data-id="${item.id}">Tạo Hợp đồng</button>
            `;
        } else {
            statusText = 'Đã chốt';
            statusBadge = `<span class="status-badge status-active">${statusText}</span>`;
            actionButtons = `
                <button class="btn btn-outline btn-sm action-view-contract" data-id="${item.id}">Xem HĐ</button>
            `;
        }

        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.request}</td>
                <td>${item.applicants} ứng viên (${item.selectedTutor ? item.selectedTutor : 'Chưa chọn'})</td>
                <td>${statusBadge}</td>
                <td>${actionButtons}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function attachApprovalListeners() {
    document.addEventListener('click', function(e) {
        const target = e.target;
        const id = target.getAttribute('data-id');

        if (target.classList.contains('action-review')) {
            alert(`[Nhân viên] Mở trang duyệt danh sách ứng tuyển cho lớp ${id}. (API: GET/PUT /api/applications)`);
        } else if (target.classList.contains('action-contract')) {
             alert(`[Nhân viên] Sinh Hợp đồng cho lớp ${id}. (API: POST /api/contracts)`);
        } else if (target.classList.contains('action-reject')) {
             alert(`[Nhân viên] Từ chối yêu cầu lớp ${id}.`);
        }
    });
}