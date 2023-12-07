const Course = require('../../models/Course');  

exports.deleteUserCourse = async (req, res) => {
    try {
        // Here we are searching for the course that the user has signed to
        const foundCourse = await Course.findOne({course_name: req.body.course_name}); 
        const fname = req.body.first_name;
        
        
        if(!foundCourse){
            return res.status(404).json({message: 'Course not found'});
        }   else if(!fname){
            return res.status(400).json({message: 'Bad request'});
        }

        let userDeleted = false; // if the user is deleted

        foundCourse.bookings.forEach((item, index) => {
            if (item.first_name === req.body.first_name) {
                userDeleted = true; 
                foundCourse.bookings.splice(index, 1);
            }
        });
        
        // If the user was deleted, save the updated course and send the response
        if (userDeleted) {
            foundCourse.save()
                .then(updatedCourse => {
                    return res.status(200).json({ message: 'User deleted successfully' });
                })
                .catch(error => {
                    return res.status(500).json({ error: 'An error occurred while updating the course.' });
                });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error creating course', error: err });
    };
};


// This is the structer of the query this route accepts, 
// {
//     "course_name": "Test1", 
//     "first_name": "John",
// }
