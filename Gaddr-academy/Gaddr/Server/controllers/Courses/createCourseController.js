const Course = require('../../models/Course'); 

exports.createCourse = async (req, res) => {
    console.log(req.body);
    try {
        const course = new Course(req.body);
        const result = await course.save();
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error creating course', error: err });
    };
};



// {
//     "course_name": "Sample Course",
//     "course_description": "This is a sample course.",
//     "course_about": ["Sample about content"],
//     "course_multiple_time_to_start": [
//       {
//         "date_range": "2 feb—7 feb 2023",
//         "location": "Remote",
//         "language": "Swedish"
//       },
//        {
//         "date_range": "8 feb—12 feb 2023",
//         "location": "Remote",
//         "language": "English"
//       }
//     ],
//     "start_date": "2023-02-02T00:00:00Z",
//     "end_date": "2023-02-07T00:00:00Z",
//     "csn_entitled": true,
//     "max_seats": 20,
//     "image": "sample-image.jpg",
//     "days": "Monday - Friday",
//     "hours": "9:00 AM - 3:00 PM",
//     "price": 1000,
//     "sessions": 5,
//     "place": "Online",
//     "language": "English",
//     "bookings": [],
//     "categories": {
//       "Tech": true,
//       "Programming": false,
//       "Marketing": true,
//       "Buisness": false,
//       "Desigen": true
//     }
//   }
  