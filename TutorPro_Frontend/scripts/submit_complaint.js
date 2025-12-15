// scripts/submit_complaint.js

document.addEventListener('DOMContentLoaded', function() {
    const complaintForm = document.getElementById('complaint-form');
    const confirmModal = document.getElementById('confirm-modal');
    const clearButton = document.getElementById('clear-form');
    const finalSubmitButton = document.getElementById('final-submit');
    const cancelButton = document.getElementById('cancel-confirm');
    
    // Đảm bảo textarea có style Dark Mode (vì nó không phải input[type="text"])
    const descriptionTextarea = document.getElementById('description');
    if (descriptionTextarea) {
        descriptionTextarea.style.cssText = "width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #3c3c3c; background-color: #1c1c24; color: #e0e0e0;";
    }

    // 1. Xử lý sự kiện Submit Form (Mở Modal Confirm)
    complaintForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        // Kiểm tra validation cơ bản
        if (!document.getElementById('senderName').value || document.getElementById('senderRole').value === "" || !document.getElementById('description').value) {
            alert("Vui lòng điền đầy đủ thông tin vào tất cả các trường bắt buộc.");
            return;
        }

        confirmModal.style.display = 'flex'; // Hiển thị modal
    });
    
    // 2. Xử lý nút Xóa nội dung
    clearButton.addEventListener('click', function() {
        if (confirm("Bạn có chắc chắn muốn xóa tất cả nội dung đã nhập?")) {
            complaintForm.reset();
        }
    });

    // 3. Xử lý nút Hủy trong Modal
    cancelButton.addEventListener('click', function() {
        confirmModal.style.display = 'none';
    });

    // 4. Xử lý nút Xác nhận Gửi cuối cùng
    finalSubmitButton.addEventListener('click', function() {
        // Thực hiện logic GỬI DỮ LIỆU ĐI (API POST)
        const complaintData = {
            senderName: document.getElementById('senderName').value,
            senderRole: document.getElementById('senderRole').value,
            type: document.getElementById('complaintType').value,
            description: document.getElementById('description').value,
            timestamp: new Date().toISOString()
        };
        
        // MOCKING API CALL:
        console.log("Dữ liệu gửi đi:", complaintData);
        alert("✅ Khiếu nại đã được gửi thành công! (Mocking API POST)");
        
        // Đóng modal và reset form sau khi gửi
        confirmModal.style.display = 'none';
        complaintForm.reset();
        
        // THỰC TẾ: fetch('/api/complaints', { method: 'POST', body: JSON.stringify(complaintData) })
    });
});