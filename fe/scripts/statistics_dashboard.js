// Updated to call BE endpoint: /reports/dashboard

document.addEventListener('DOMContentLoaded', async function() {
  if (!requireAuthOrRedirect()) return;
  try {
    const raw = await apiFetch('/reports/dashboard');
    const items = (Array.isArray(raw) ? raw : (raw?.data || []));
    const mapped = items.map((x) => {
      
      // dashboard endpoint returns object, not list. We'll pass through.
      return x;

    });
    renderDashboard(mapped);
    if (typeof attachPaymentListeners === 'function') attachPaymentListeners();
    if (typeof attachComplaintListeners === 'function') attachComplaintListeners();
    if (typeof attachApprovalListeners === 'function') attachApprovalListeners();
  } catch (e) {
    console.error('Load error:', e);
    // fallback to existing mock if any
    if (typeof MOCK_CLASS_DATA !== 'undefined') renderDashboard(MOCK_CLASS_DATA, localStorage.getItem('userRole'));
    if (typeof MOCK_PAYMENT_DATA !== 'undefined') renderDashboard(MOCK_PAYMENT_DATA);
    if (typeof MOCK_COMPLAINT_DATA !== 'undefined') renderDashboard(MOCK_COMPLAINT_DATA);
    if (typeof MOCK_APPROVAL_DATA !== 'undefined') renderDashboard(MOCK_APPROVAL_DATA);
  }
});

