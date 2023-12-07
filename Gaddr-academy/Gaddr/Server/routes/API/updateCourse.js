const express = require('express');
const router = express.Router();
const courseController  = require('../../controllers/Courses/updateCourseController');


router.put('/', courseController.updateCourseInfo);

module.exports = router;
