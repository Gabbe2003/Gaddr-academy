const express = require('express');
const router = express.Router();
const courseController  = require('../../../controllers/CourseBooking/CourseBookingController');

router.put('/', courseController.bookCourse);

module.exports = router;
