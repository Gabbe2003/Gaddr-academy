const express = require('express');
const router = express.Router();
const courseController  = require('../../../controllers/CourseBooking/CourseDeletingController');

router.delete('/', courseController.deleteUserCourse);

module.exports = router;
