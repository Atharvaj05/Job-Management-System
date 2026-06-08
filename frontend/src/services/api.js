const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
};

const handleResponse = async (res) => {
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Network runtime error.');
    return res.json();
};

export const api = {
    login: (email, password) => fetch(`${API_BASE_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }).then(handleResponse),
    register: (name, email, password) => fetch(`${API_BASE_URL}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) }).then(handleResponse),
    getTasks: () => fetch(`${API_BASE_URL}/tasks`, { headers: getHeaders() }).then(handleResponse),
    createTask: (task) => fetch(`${API_BASE_URL}/tasks`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(task) }).then(handleResponse),
    getTaskLogs: (id) => fetch(`${API_BASE_URL}/tasks/${id}/logs`, { headers: getHeaders() }).then(handleResponse)
};