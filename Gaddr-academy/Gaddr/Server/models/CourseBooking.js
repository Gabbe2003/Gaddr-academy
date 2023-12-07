const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const uuid = require('uuid');

const bookingSchema = new Schema({
    personal_number: {
        type:Number,
    },
    first_name: {
        type:String,
    },
    last_name: {
        type:String,
    },
    address: {
        type:String,
    },
    zipcode: {
        type:String,
    },
    city: {
        type:String,
    },
    kommun: {
        type:String,
    },
    mobile: {
        type:String,
    },
    email: {
        type:String,
    },
    paid: {
        PaidID: {type: String, default: uuid.v4 },
        isPaid: {type: Boolean, default: false},
    },
    reserve: {
        type:Boolean,
        default: false,
    },
    payment: {
        ABusiness: {type: Boolean, default: false },
        AnIndividual: {type: Boolean, default: false },
    },
    country: {
        type: String,
    },
    notifications:{
        EMAIL: {type: Boolean, default: false },
        SMS: {type: Boolean, default: false },

    },

});

module.exports = mongoose.model('CourseBooking', bookingSchema);


// Reservation Schema
const reserveSchema = new Schema({
    queue: Number,
    total_queue: Number,
});
