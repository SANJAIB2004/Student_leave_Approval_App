import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeaveRequest from './components/LeaveRequest';
import LeaveApprovalPage from './components/LeaveApprovalPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LeaveRequest />} />
                    <Route path="/approve-leaves" element={<LeaveApprovalPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
