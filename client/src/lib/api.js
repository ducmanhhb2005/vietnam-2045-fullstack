const API_BASE = 'https://vietnam-2045-fullstack.onrender.com/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || 'Có lỗi khi kết nối máy chủ');
  }

  return data;
}

export const api = {
  getBootstrap: () => request('/bootstrap'),
  completeJourney: (payload) => request('/journey/complete', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  getAnalytics: () => request('/analytics')
};
