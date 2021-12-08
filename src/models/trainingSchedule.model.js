const mongoose = require('mongoose');
const Exercise = require('./exercise.schema');
const Schema = mongoose.Schema;


const getModel = require('./model_cache')

const TrainingSchedule = new Schema({
    naam: {
        type: String,
        required: [true, 'A exercise needs to have a name.']
    },
    startDate: {
        type: Date,
        required: [true, 'A Schedule needs to have a start date.']
    },
    amountOfDays: {
        type: Number,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'A user needs to be attached to a exercise.'],
        ref: 'user'
    },

    workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Training'
    }]
});
TrainingSchedule.virtual('Active').get(function () {
    // if there are no reviews we give back a message
    let currentDate = new Date();
    if (startDate + amountOfDays <= currentDate) {
        return false;
    } else {
        return true
    }
})

module.exports = getModel('TrainingSchedule', TrainingSchedule)