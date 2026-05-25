const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

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
