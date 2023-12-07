const CourseBooking = require('../../models/CourseBooking');  
const CourseBookingCompany = require('../../models/CourseBookingCompany');  
const Course = require('../../models/Course');  

exports.bookCourse = async (req, res) => {
    try {
      for (let i = 0; i < req.body.whoIsPaying.length; i++) {
        const item = req.body.whoIsPaying[i];
        if (item.firstName.length <= 0) {
            return res.status(400).json({ message: 'First Name not provided' });
        }
        if (item.lastName.length <= 0) {
            return res.status(400).json({ message: 'Last Name not provided' });
        }
      }

      for (let i = 0; i < req.body.peopleJoiningTheCourse.length; i++) {
        const person = req.body.peopleJoiningTheCourse[i];            
        for (const key in person) {
          if (person[key].length < 1) {
            return res.status(400).json({ message: `${key} not provided` });
          }
        }
        const email = person.email;
        if (!email.includes('@') || !email.includes('.')) {
          return res.status(400).json({ message: 'Invalid email format' });
        }
      }
          
      const foundCourse = await Course.findOne({_id: req.body.courseID}); 
      
      if(!foundCourse){
        return res.status(404).json('Course not found').end(); 
      }
      
      if(foundCourse.bookings.length > foundCourse.max_seats){
        return res.status(400).json({message: "Maximalt anatal deltagare för den här kursen"}); 
      }

      let userFound = false; 

      foundCourse.bookings.forEach((innerArray) => {
        innerArray.forEach((item) => {
          for (let i = 0; i < req.body.peopleJoiningTheCourse.length; ++i) {
            const firstNameToCheck = req.body.peopleJoiningTheCourse[i].firstName;
            if (item.firstName === firstNameToCheck) {
              userFound = true;
              break; 
            }
          }
        });
      });
              
      if (userFound) {
        return res.status(400).json('User already in course').end();
      }

      const bookings = await Promise.all(req.body.whoIsPaying.map(async (item) => {
        if (!item.orgNumber || !item.companyName) {
          const data = {
            first_name: item.firstName,
            last_name: item.lastName,
            email: item.email,
            mobile: item.phoneNumber,
            personal_number: item.personal_number,
            address: item.streetAddress,
            city: item.city,
            zipcode: item.zipCode,
            kommun: item.county,
          };
        
          return await CourseBooking(data);
        } else {
          const data = {
            first_name: item.firstName,
            last_name: item.lastName,
            email: item.email,
            companyName: item.companyName,
            address: item.streetAddress,
            city: item.city,
            zipcode: item.zipCode,
            org_number: item.orgNumber
          };
          return await CourseBookingCompany(data);
        }
      }));
      
      for (const booking of bookings) {
        await booking.save(); 
      }
      console.log("All bookings saved.");

      for(let i = 0; i < req.body.peopleJoiningTheCourse.length; ++i){
        foundCourse.bookings.push(req.body.peopleJoiningTheCourse); 
      }
      foundCourse.save(); 

      return res.status(200).end();
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error creating course', error: err });
    };
};



// This is the structer of the query this route accepts, 
// {
//     "courseID": "5f3e70c6e96e6c4c288eea75", 
//     "personal_number": 1234567890,
//     "first_name": "John",
//     "last_name": "Doe",
//     "address": "123 Main Street",
//     "zipcode": "12345",
//     "city": "Stockholm",
//     "kommun": "Stockholm",
//     "mobile": "012-345-6789",
//     "email": "johndoe@email.com",
//     "paid": {
//         "type": false
//     },
//     "reserve": false,
//     "course_id": "5f3e70c6e96e6c4c288eea75"
// }
