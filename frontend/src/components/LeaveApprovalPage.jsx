// LeaveApprovalPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveApprovalPage = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        fetchLeaveRequests();
    }, []);

    const fetchLeaveRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/leaveRequests');
            setLeaveRequests(response.data);
        } catch (error) {
            console.error('Error fetching leave requests', error);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/leaveRequests/${id}/status`, { status });
            fetchLeaveRequests(); // Refresh the list
        } catch (error) {
            console.error('Error updating leave request status', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Leave Approval</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Department</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map((request) => (
                        <tr key={request._id}>
                            <td>{request.studentName}</td>
                            <td>{request.department}</td>
                            <td>{request.reason}</td>
                            <td>{request.status}</td>
                            <td>
                                {request.status === 'pending' && (
                                    <div>
                                        <button onClick={() => handleStatusChange(request._id, 'approved')}>Approve</button>
                                        <button onClick={() => handleStatusChange(request._id, 'rejected')}>Reject</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveApprovalPage;
