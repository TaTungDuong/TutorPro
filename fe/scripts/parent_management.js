// Updated to call BE endpoint: /parents

document.addEventListener('DOMContentLoaded', async function() {
  if (!requireAuthOrRedirect()) return;
  try {
    const raw = await apiFetch('/parents');
    const items = (Array.isArray(raw) ? raw : (raw?.data || []));
    const mapped = items.map((x) => {
      
      return {
        id: x.id,
        name: x.name || x.user?.email || `Parent #${x.id}`,
        phone: x.phone || '',
        address: x.address || '',
        status: x.user?.status || x.status || ''
      };

    });
    renderParentTable(mapped);
    if (typeof attachPaymentListeners === 'function') attachPaymentListeners();
    if (typeof attachComplaintListeners === 'function') attachComplaintListeners();
    if (typeof attachApprovalListeners === 'function') attachApprovalListeners();
  } catch (e) {
    console.error('Load error:', e);
    // fallback to existing mock if any
    if (typeof MOCK_CLASS_DATA !== 'undefined') renderParentTable(MOCK_CLASS_DATA, localStorage.getItem('userRole'));
    if (typeof MOCK_PAYMENT_DATA !== 'undefined') renderParentTable(MOCK_PAYMENT_DATA);
    if (typeof MOCK_COMPLAINT_DATA !== 'undefined') renderParentTable(MOCK_COMPLAINT_DATA);
    if (typeof MOCK_APPROVAL_DATA !== 'undefined') renderParentTable(MOCK_APPROVAL_DATA);
  }
});

// scripts/parent_management.js

const MOCK_PARENT_DATA = [
    { id: 'PH0010', name: 'Phạm Thị D', classes: 2, phone: '0901xxxxxx', feeStatus: 'Active' },
    { id: 'PH0011', name: 'Trần Văn E', classes: 1, phone: '0902xxxxxx', feeStatus: 'Pending' },
    { id: 'PH0005', name: 'Hoàng Thị F', classes: 0, phone: '0903xxxxxx', feeStatus: 'Inactive' },
];

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