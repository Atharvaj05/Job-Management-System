const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
};

const handleResponse = async (res) => {
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('token');
        }
        throw new Error(errorData.error || 'API execution connection fault.');
    }
    return res.json();
};

export const api = {
    register: (name, email, password) => 
        fetch(`${API_BASE_URL}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) }).then(handleResponse),
    
    login: (email, password) => 
        fetch(`${API_BASE_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }).then(handleResponse),
        
    getJobs: () => fetch(`${API_BASE_URL}/jobs`, { headers: getHeaders() }).then(handleResponse),
    
    createJob: (job) => fetch(`${API_BASE_URL}/jobs`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(job) }).then(handleResponse),
    
    updateJob: (id, job) => fetch(`${API_BASE_URL}/jobs/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(job) }).then(handleResponse),
    
    deleteJob: (id) => fetch(`${API_BASE_URL}/jobs/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse)
};