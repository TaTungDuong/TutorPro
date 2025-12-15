// scripts/login.js

// Hàm giả lập gọi API đăng nhập (Mocking)
function mockLoginApi(username, password) {
    // Trả về một Promise để mô phỏng quá trình gọi API bất đồng bộ
    return new Promise((resolve, reject) => {
        // Mô phỏng độ trễ mạng 500ms
        setTimeout(() => {
            let role = null;
            
            // Logic kiểm tra vai trò giả lập
            if (username === "admin" && password === "123") {
                role = "Admin";
            } else if (username === "nhanvien" && password === "123") {
                role = "Staff";
            } else if (username === "phuhuynh" && password === "123") {
                role = "Parent";
            } else if (username === "giasu" && password === "123") {
                role = "Tutor";
            }
            
            if (role) {
                // Giả lập trả về dữ liệu thành công
                resolve({ 
                    success: true, 
                    role: role,
                    token: `mock-token-for-${role}`
                });
            } else {
                // Giả lập trả về lỗi
                reject({ success: false, message: "Tài khoản hoặc mật khẩu không đúng." }); 
            }
        }, 500);
    });
}


document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === "" || password === "") {
        alert("Tài khoản hoặc mật khẩu không được để trống!");
        return;
    }

    // Gọi hàm giả lập API thay vì fetch() thực tế
    mockLoginApi(username, password)
        .then(data => {
            alert(`Đăng nhập thành công! Vai trò: ${data.role}.`);
            
            // Lưu vai trò giả lập vào Local Storage
            localStorage.setItem('userRole', data.role); 

            // Chuyển hướng đến trang quản lý chung
            window.location.href = 'class_management.html'; 
        })
        .catch(error => {
            alert(error.message);
            console.error('Lỗi đăng nhập giả lập:', error);
        });
});

// Thêm logic hiển thị/ẩn mật khẩu
document.querySelector('.icon-eye')?.addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.textContent = '🙈'; // Thay biểu tượng
    } else {
        passwordInput.type = 'password';
        this.textContent = '👁️';
    }
});