// scripts/payment_management.js

const MOCK_PAYMENT_DATA = [
    { id: 'T00451', recipient: 'Phụ huynh A', content: 'Phí dịch vụ L00123', amount: '400.000 VNĐ', status: 'Pending', type: 'Thu' },
    { id: 'T00450', recipient: 'Gia sư B', content: 'Lương tháng 9 - L00120', amount: '4.500.000 VNĐ', status: 'Processing', type: 'Chi' },
    { id: 'T00449', recipient: 'Phụ huynh C', content: 'Phí dịch vụ L00119', amount: '350.000 VNĐ', status: 'Completed', type: 'Thu' },
    { id: 'T00448', recipient: 'Gia sư D', content: 'Thù lao dạy thử', amount: '200.000 VNĐ', status: 'Completed', type: 'Chi' },
];

document.addEventListener('DOMContentLoaded', function() {
    renderPaymentTable(MOCK_PAYMENT_DATA);
    attachPaymentListeners();
});

function renderPaymentTable(payments) {
    const tableBody = document.getElementById('payment-list-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    payments.forEach(item => {
        let statusBadge = '';
        let actionButtons = '';
        
        if (item.status === 'Completed') {
            statusBadge = `<span class="status-badge status-active">Đã thanh toán</span>`;
            actionButtons = `<button class="btn btn-outline btn-sm action-view">Xem Chi tiết</button>`;
        } else if (item.status === 'Pending') {
            statusBadge = `<span class="status-badge status-danger">Chờ thanh toán</span>`;
            actionButtons = `<button class="btn btn-danger btn-sm action-remind">Gửi nhắc nhở</button>`;
        } else {
            statusBadge = `<span class="status-badge status-pending">Chờ xử lý</span>`;
            actionButtons = `
                <button class="btn btn-primary btn-sm action-process">Xử lý Thanh toán</button>
            `;
        }

        const row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.recipient}</td>
                <td>${item.content}</td>
                <td>${item.amount}</td>
                <td>${statusBadge}</td>
                <td>${actionButtons}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function attachPaymentListeners() {
    document.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('action-process')) {
            alert(`[Nhân viên] Mở form xác nhận giao dịch và upload chứng từ. (API: PUT /api/payment)`);
        } else if (target.classList.contains('action-remind')) {
             alert(`[Nhân viên] Gửi nhắc nhở thanh toán cho đối tượng.`);
        }
    });
}