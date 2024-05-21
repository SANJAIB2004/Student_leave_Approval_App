const express = require('express');
const multer = require('multer');
const LeaveRequest = require('../models/LeaveRequest');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Route to submit leave request
router.post('/', upload.single('file'), async (req, res) => {
    try {
        const leaveRequest = new LeaveRequest({
            ...req.body,
            file: req.file ? req.file.path : null
        });
        await leaveRequest.save();
        res.status(201).send(leaveRequest);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Route to get all leave requests
router.get('/', async (req, res) => {
    try {
        const leaveRequests = await LeaveRequest.find();
        res.send(leaveRequests);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/:id/status', async (req, res) => {
    try {
        const leaveRequest = await LeaveRequest.findById(req.params.id);
        if (!leaveRequest) {
            return res.status(404).send({ message: 'Leave request not found' });
        }
        leaveRequest.status = req.body.status;
        await leaveRequest.save();
        res.send(leaveRequest);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
