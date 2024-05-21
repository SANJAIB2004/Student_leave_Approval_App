const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    department: { type: String, required: true },
    class: { type: String, required: true },
    section: { type: String, required: true },
    reason: { type: String, required: true },
    file: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
