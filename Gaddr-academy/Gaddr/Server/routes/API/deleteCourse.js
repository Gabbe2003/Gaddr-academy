const express = require('express');
const router = express.Router();
const courseController  = require('../../controllers/Courses/deleteCourseController');

router.delete('/', courseController.deleteCourse);

module.exports = router;
