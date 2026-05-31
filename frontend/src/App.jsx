import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateJob from './pages/CreateJob';
import EditJob from './pages/EditJob';

export default function App() {
    const [page, setPage] = useState({ name: 'dashboard', jobId: null });

    return (
        <div>
            <Navbar setPage={setPage} />
            <main>
                {page.name === 'dashboard' && <Dashboard setPage={setPage} />}
                {page.name === 'create' && <CreateJob setPage={setPage} />}
                {page.name === 'edit' && <EditJob pageState={page} setPage={setPage} />}
            </main>
        </div>
    );
}\n