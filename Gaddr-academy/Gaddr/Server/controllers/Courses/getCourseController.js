const Course = require('../../models/Course'); 

exports.getAllCourses = async (req, res) => {
    try{
        const course = await Course.find(); 
        if(course.length <= 0){
            return res.status(404).send({ message: 'Course not found'}); 
        }
        res.status(200).send(course).end();
    }   catch(err) {
        return res.status(500).send({ message: 'Error getting the course', error: err });
    };
};


exports.getCourseById = async (req, res) => {
    try{
        const course = await Course.findOne({_id: req.params.id}); 
        if(course.length <= 0){
            return res.status(404).send({ message: 'Course not found'}); 
        }
        res.status(200).send(course).end();
    }   catch(err) {
        return res.status(500).send({ message: 'Error getting the course', error: err });
    };
};
