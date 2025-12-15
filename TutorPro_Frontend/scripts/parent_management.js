// scripts/parent_management.js

const MOCK_PARENT_DATA = [
    { id: 'PH0010', name: 'Phạm Thị D', classes: 2, phone: '0901xxxxxx', feeStatus: 'Active' },
    { id: 'PH0011', name: 'Trần Văn E', classes: 1, phone: '0902xxxxxx', feeStatus: 'Pending' },
    { id: 'PH0005', name: 'Hoàng Thị F', classes: 0, phone: '0903xxxxxx', feeStatus: 'Inactive' },
];

document.addEventListener('DOMContentLoaded', function() {
    renderParentTable(MOCK_PARENT_DATA);
    attachParentListeners();
});

function renderParentTable(parents) {
    const tableBody = document.getElementById('parent-list-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    parents.forEach(item => {
        let statusBadge = '';
        let actionButtons = '';
        
        if (item.feeStatus === 'Active') {
            statusBadge = `<span class="status-badge status-active">Active</span>`;
            actionButtons = `<button class="btn btn-outline btn-sm action-view" data-id="${item.id}">Xem L/sửa</button>`;
        } else if (item.feeStatus === 'Pending') {
            statusBadge = `<span class="status-badge status-danger">Nợ phí</span>`;
            actionButtons = `
                <button class="btn btn-danger btn-sm action-remind" data-id="${item.id}">Nhắc nợ</button>
                <button class="btn btn-outline btn-sm action-view" data-id="${item.id}">Xem L/sửa</button>
            `;
        } else {
            statusBadge = `<span class="status-badge status-secondary">Inactive</span>`;
            actionButtons = `<button class="btn btn-outline btn-sm action-view" data-id="${item.id}">Xem L/sửa</button>`;
        }

        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.classes} lớp</td>
                <td>${item.phone}</td>
                <td>${statusBadge}</td>
                <td>${actionButtons}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function attachParentListeners() {
    document.addEventListener('click', function(e) {
        const target = e.target;
        const id = target.getAttribute('data-id');

        if (target.classList.contains('action-remind')) {
            alert(`[Nhân viên] Đã gửi tin nhắn nhắc nợ tới Phụ huynh ${id}.`);
        } else if (target.classList.contains('action-view')) {
             alert(`[Hồ sơ] Chuyển đến trang chi tiết Phụ huynh ${id}.`);
        }
    });
}