const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const uuid = require('uuid');
// Course Schema
const courseSchema = new Schema({
    course_name: {
        type: String,
        required: true,
        unique: true,
    },
    course_description: {
        type: String,
        required: true,
    },
    course_about: {
        type: [],
    },
    course_multiple_time_to_start: {
        type: [
          {
            date_range: String,
            location: String,
            language: String
          }
        ]
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    csn_entitled: {
        type: Boolean
    },
    max_seats: {
        type: Number,
    },
    image: {
        type: String
    },
    days: {
        type: String
    },
    hours: {
        type: String
    },
    price: {
        type: Number
    },
    sessions: {
        type: Number,
    },
    place: {
        type: String,
    },
    language: {
        type: String,
    },
    bookings:{
        type:[]
    },
    categories: {
        Tech: {type: Boolean, default: false },
        Programming: {type: Boolean, default: false },
        Marketing: {type: Boolean, default: false },
        Buisness: {type: Boolean, default: false },
        Desigen: {type: Boolean, default: false },
    },
});
module.exports = mongoose.model('Course', courseSchema);
