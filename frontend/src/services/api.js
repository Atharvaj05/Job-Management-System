const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Network error occurred');
    }
    return response.json();
};

export const api = {
    getJobs: () => fetch(`${API_BASE_URL}/jobs`).then(handleResponse),
    getJob: (id) => fetch(`${API_BASE_URL}/jobs/${id}`).then(handleResponse),
    createJob: (job) => fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
    }).then(handleResponse),
    updateJob: (id, job) => fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
    }).then(handleResponse),
    deleteJob: (id) => fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'DELETE'
    }).then(handleResponse)
};\n