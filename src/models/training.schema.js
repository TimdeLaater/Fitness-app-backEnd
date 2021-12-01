const mongoose = require('mongoose');
const ExerciseSchema = require('./exercise.schema');
const Schema = mongoose.Schema;


const getModel = require('./model_cache')

const TrainingSchema = new Schema({
    naam: {
        type: String,
        required: [true, 'A exercise needs to have a name.']
    },

    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'A user needs to be attached to a exercise.'],
        ref: 'user'
    },

    // finished: boolean
    finished: {
        type: Boolean
    },
    excercises: {
        type: [ExerciseSchema],
        default: []
    }
}, {
    // include virtuals when serializing the schema to an object or JSON
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
TrainingSchema.virtual('totalCal').get(function () {
    // if there are no reviews we give back a message
    if (this.excercises.length === 0) {
        return "no exercises"
    } else {
        // computes the toal calories
        let sum = 0
        for (let exercise of this.excercises) {
            sum += exercise.calories
        }
        return sum
    }
})



module.exports = getModel('Training', TrainingSchema)