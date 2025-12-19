// Updated to call BE endpoint: /tutors

document.addEventListener('DOMContentLoaded', async function() {
  if (!requireAuthOrRedirect()) return;
  try {
    const raw = await apiFetch('/tutors');
    const items = (Array.isArray(raw) ? raw : (raw?.data || []));
    const mapped = items.map((x) => {
      
      return {
        id: x.id,
        name: x.name || x.user?.email || `Tutor #${x.id}`,
        subject: x.specialization || x.subject || '',
        fee: x.feeProposal != null ? x.feeProposal : (x.fee || ''),
        status: x.user?.status || x.status || ''
      };

    });
    renderTutorTable(mapped);
    if (typeof attachPaymentListeners === 'function') attachPaymentListeners();
    if (typeof attachComplaintListeners === 'function') attachComplaintListeners();
    if (typeof attachApprovalListeners === 'function') attachApprovalListeners();
  } catch (e) {
    console.error('Load error:', e);
    // fallback to existing mock if any
    if (typeof MOCK_CLASS_DATA !== 'undefined') renderTutorTable(MOCK_CLASS_DATA, localStorage.getItem('userRole'));
    if (typeof MOCK_PAYMENT_DATA !== 'undefined') renderTutorTable(MOCK_PAYMENT_DATA);
    if (typeof MOCK_COMPLAINT_DATA !== 'undefined') renderTutorTable(MOCK_COMPLAINT_DATA);
    if (typeof MOCK_APPROVAL_DATA !== 'undefined') renderTutorTable(MOCK_APPROVAL_DATA);
  }
});

// scripts/tutor_management.js

// Dữ liệu gia sư giả lập
const MOCK_TUTOR_DATA = [
    { id: 'GS001', name: 'Nguyễn Văn A', subject: 'Toán, Lý (Cấp 3)', schedule: 'T2, T4, T6 (Tối)', status: 'approved' },
    { id: 'GS002', name: 'Trần Thị B', subject: 'Văn, Sử (Cấp 2)', schedule: 'T7, CN (Cả ngày)', status: 'pending' },
    { id: 'GS003', name: 'Lê Minh C', subject: 'Tiếng Anh (IELTS)', schedule: 'T3, T5 (Sáng)', status: 'approved' },
    { id: 'GS004', name: 'Phạm Thanh D', subject: 'Hóa (Cấp 3)', schedule: 'Cả tuần (Tối)', status: 'rejected' },
];

    attachTutorTableListeners();
});

// Hàm hiển thị dữ liệu lên bảng
function renderTutorTable(tutors) {
    const tableBody = document.getElementById('tutor-list-body');
    if (!tableBody) return;
    tableBody.innerHTML = ''; // Xóa dữ liệu tĩnh

    tutors.forEach(tutor => {
        let statusBadge = '';
        let actionButtons = '';
        
        if (tutor.status === 'approved') {
            statusBadge = `<span class="status-badge status-active">Đã duyệt</span>`;
            actionButtons = `
                <button class="btn btn-outline btn-sm action-view" data-id="${tutor.id}">Hồ sơ</button>
                <button class="btn btn-secondary btn-sm action-email" data-id="${tutor.id}">Email</button>
            `;
        } else if (tutor.status === 'pending') {
            statusBadge = `<span class="status-badge status-pending">Chờ duyệt</span>`;
            actionButtons = `
                <button class="btn btn-success btn-sm action-approve" data-id="${tutor.id}">Duyệt</button>
                <button class="btn btn-danger btn-sm action-reject" data-id="${tutor.id}">Từ chối</button>
            `;
        } else {
            statusBadge = `<span class="status-badge status-danger">Đã từ chối</span>`;
            actionButtons = `
                <button class="btn btn-outline btn-sm action-view" data-id="${tutor.id}">Xem</button>
            `;
        }

        const row = `
            <tr>
                <td>${tutor.id}</td>
                <td>${tutor.name}</td>
                <td>${tutor.subject}</td>
                <td>${tutor.schedule}</td>
                <td>${statusBadge}</td>
                <td>${actionButtons}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Hàm gắn sự kiện cho các nút hành động
function attachTutorTableListeners() {
    document.addEventListener('click', function(e) {
        const target = e.target;
        const id = target.getAttribute('data-id');

        if (target.classList.contains('action-approve')) {
            alert(`[Admin] Duyệt hồ sơ GS${id}. (Sẽ gọi API POST/PUT)`);
            // Mô phỏng cập nhật trạng thái
            const tutorIndex = MOCK_TUTOR_DATA.findIndex(t => t.id === id);
            if (tutorIndex !== -1) {
                MOCK_TUTOR_DATA[tutorIndex].status = 'approved';
                renderTutorTable(MOCK_TUTOR_DATA); 
            }
        } 
        // ... Thêm logic cho các nút khác (reject, view, email)
        else if (target.classList.contains('action-view')) {
             alert(`[Hồ sơ] Chuyển đến trang chi tiết hồ sơ GS${id}.`);
             // window.location.href = 'tutor_profile_detail.html?id=' + id;
        }
    });
}