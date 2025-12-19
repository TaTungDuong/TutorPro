// scripts/apiClient.js
// Simple API client for TutorPro Backend (NestJS) - base: http://localhost:3000/api
const API_BASE = (localStorage.getItem('API_BASE') || 'http://localhost:3000/api').replace(/\/+$/, '');

function getAccessToken() {
  return localStorage.getItem('accessToken') || '';
}

function setSession({ accessToken, user }) {
  if (accessToken) localStorage.setItem('accessToken', accessToken);
  if (user?.role) localStorage.setItem('userRole', user.role); // ADMIN/STAFF/PARENT/TUTOR
  if (user?.id) localStorage.setItem('userId', String(user.id));
  if (user?.email) localStorage.setItem('userEmail', user.email);
}

function clearSession() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userId');
  localStorage.removeItem('userEmail');
}

async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  const headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers || {});
  const token = getAccessToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const msg = (data && (data.message || data.error)) ? (Array.isArray(data.message) ? data.message.join(', ') : data.message) : `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// Helpers
function requireAuthOrRedirect() {
  const token = getAccessToken();
  if (!token) {
    alert('Vui lòng đăng nhập lại.');
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

function normalizeRole(role) {
  if (!role) return '';
  const r = String(role).toUpperCase();
  if (r === 'ADMIN' || r === 'STAFF' || r === 'PARENT' || r === 'TUTOR') return r;
  // backward compat from mock roles
  if (r === 'NHANVIEN' || r === 'EMPLOYEE') return 'STAFF';
  return r;
}
