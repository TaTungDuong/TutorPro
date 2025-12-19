// scripts/login.js

// Uses TutorPro Backend: POST /api/auth/login  { email, password }
document.getElementById('login-form')?.addEventListener('submit', async function(event) {
  event.preventDefault();

  const emailOrUsername = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  // Treat username field as email for BE
  const email = emailOrUsername;

  try {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    setSession(data);

    alert(`Đăng nhập thành công! Vai trò: ${data.user?.role || ''}`);
    window.location.href = 'class_management.html';
  } catch (error) {
    // Fallback to old mock behavior if BE not reachable
    console.error('Login API error:', error);
    alert(error.message || 'Đăng nhập thất bại');
  }
});

// Show/hide password
document.querySelector('.icon-eye')?.addEventListener('click', function() {
  const passwordInput = document.getElementById('password');
  if (!passwordInput) return;
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    this.textContent = '🙈';
  } else {
    passwordInput.type = 'password';
    this.textContent = '👁️';
  }
});
