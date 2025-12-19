// scripts/submit_complaint.js
document.addEventListener('DOMContentLoaded', function() {
  if (!requireAuthOrRedirect()) return;

  const form = document.getElementById('complaint-form');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const content = document.getElementById('complaint-content')?.value?.trim() || '';
    if (!content) return alert('Vui lòng nhập nội dung khiếu nại.');

    try {
      // Parent creates complaint: DTO usually needs parentId + content; we infer from localStorage if possible
      const parentId = Number(localStorage.getItem('parentId') || 0) || undefined;
      const payload = parentId ? { parentId, content } : { content };
      await apiFetch('/complaints', { method: 'POST', body: JSON.stringify(payload) });
      alert('Gửi khiếu nại thành công.');
      window.location.href = 'complaint_management.html';
    } catch (err) {
      console.error(err);
      alert(err.message || 'Gửi khiếu nại thất bại');
    }
  });
});
