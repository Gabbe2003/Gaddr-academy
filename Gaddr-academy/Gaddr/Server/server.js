require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const corsOptions = require('./config/corsOptions');
mongoose.set('strictQuery', false);
const PORT = process.env.PORT || 8080;
const app = express();


app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('tiny'));

app.use('/createCourse', require('./routes/API/handleCourse'));
app.use('/deleteCourse', require('./routes/API/deleteCourse'));
app.use('/getAllCourses', require('./routes/API/getCourse'));
app.use('/updateCourse', require('./routes/API/updateCourse'));

app.use('/courseBooking', require('./routes/API/Booking/courseBooking'));
app.use('/deleteUserTheFromCourse', require('./routes/API/Booking/courseDeletingUser'));
app.use('/updateBookedUser', require('./routes/API/Booking/courseBookingUpdate'));


mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(`Server running on Port ${PORT}`);
  app.listen(8080);
});
