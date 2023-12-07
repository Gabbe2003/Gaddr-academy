const Course = require('../../models/Course'); 

exports.deleteCourse = async (req, res) => {
    try{
        const courseID = req.body.id || req.body.course_name; 
        const course = await Course.findOneAndDelete(
                { course_name: courseID }
        ).exec();
        if(!course){
            return res.status(404).send({ message: 'Course not found'}); 
        }
        res.status(200).send(course).end();
    }   catch(err) {
        return res.status(500).send({ message: 'Error deleting course', error: err });
    }

}