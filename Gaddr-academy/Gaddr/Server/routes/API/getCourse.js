const express = require('express');
const router = express.Router();
const courseController  = require('../../controllers/Courses/getCourseController');


router.get('/', courseController.getAllCourses);
router.get('/course/:id', courseController.getCourseById);


module.exports = router;
