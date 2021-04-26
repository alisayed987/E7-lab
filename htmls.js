const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/fs_Bouns.html'));
});

router.get('/fs_Bouns.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/fs_Bouns.html'));
});
router.get('/create_course.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/create_course.html'));
});
router.get('/create_student.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/create_student.html'));
});

module.exports = router;