const express = require('express');
const router = express.Router();
const courseController  = require('../../controllers/Courses/createCourseController');

router.post('/', courseController.createCourse);


module.exports = router;
