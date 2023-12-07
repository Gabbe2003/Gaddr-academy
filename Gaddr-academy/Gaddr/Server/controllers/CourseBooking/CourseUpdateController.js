const Course = require('../../models/Course'); 

exports.updateCourseInfo = async (req, res) => {
    try{
        const personal_number = req.body.personal_number; 
            
        const course = await Course.findOne({
            "bookings.personal_number": personal_number,
        });

        console.log(course);
        
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const { 
            language, start_date, end_date, price, course_name, 
            course_description, csn_entitled, max_seats, image, days,
            hours, sessions, place, update_course_name
        } = req.body;

        switch (true) {
            case !!update_course_name: 
                course.course_name = update_course_name; 
                break; 
            case !!language:
                course.language = language;
                break;
            case !!start_date:
                course.start_date = start_date;
                break;
            case !!end_date:
                course.end_date = end_date;
                break;
            case !!price:
                course.price = price;
                break;
            case !!course_name:
                course.course_name = course_name;
                break;
            case !!course_description:
                course.course_description = course_description;
                break;
            case !!csn_entitled:
                course.csn_entitled = csn_entitled;
                break;
            case !!max_seats:
                course.max_seats = max_seats;
                break;
            case !!image:
                course.image = image;
                break;
            case !!days:
                course.days = days;
                break;
            case !!hours:
                course.hours = hours;
                break;
            case !!sessions:
                course.sessions = sessions;
                break;
            case !!place:
                course.place = place;
                break;
        }

        await course.save(); 
        return res.status(200).send({ message: 'Course updated'}).end();
        
    }   catch(err) {
        return res.status(500).send({ message: 'Error occured when updating course'});
    };
};

