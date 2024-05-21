// LeaveRequestForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const LeaveRequestForm = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        department: '',
        class: '',
        section: '',
        reason: '',
        file: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithFile = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataWithFile.append(key, value);
            });
            await axios.post('http://localhost:5000/api/leaveRequests', formDataWithFile);
            alert('Leave request submitted successfully!');
            // Clear the form after submission
            setFormData({
                studentName: '',
                department: '',
                class: '',
                section: '',
                reason: '',
                file: null
            });
        } catch (error) {
            console.error('Error submitting leave request', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Leave Request Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Student Name:</label>
                    <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Department:</label>
                    <input type="text" name="department" value={formData.department} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Class:</label>
                    <input type="text" name="class" value={formData.class} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Section:</label>
                    <input type="text" name="section" value={formData.section} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Reason:</label>
                    <textarea name="reason" value={formData.reason} onChange={handleChange} rows="4" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Attachment:</label>
                    <input type="file" name="file" onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })} />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
            </form>
        </div>
    );
};

export default LeaveRequestForm;
