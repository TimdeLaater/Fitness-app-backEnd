const mongoose = require('mongoose')
const Schema = mongoose.Schema

const getModel = require('./model_cache')

const UserSchema = new Schema({
    // a user needs to have a name
    name: {
        type: String,
        required: [true, 'A user needs to have a name.'],
    },

    // users email needs be a email
    //TODO: Add email validation
    email: {
        type: String,
        required: [true, 'A user needs to have a Emailadress'],
        unique: [true, 'A user needs to have a unique Emailadress'],
    },
    //TODO: Add birthday is in the past validation
    birthday: {
        type: Date,
        required: [true, 'A user needs to have a Birthday'],
    },
    password: {
        type: String,
        required: [true, 'A user needs to have a Password'],
    },

})

// mongoose plugin to always populate fields
// UserSchema.plugin(require('mongoose-autopopulate'));

// when a user is deleted all their reviews need to be deleted
// note: use an anonymous function and not a fat arrow function here!
// otherwise 'this' does not refer to the correct object
// use 'next' to indicate that mongoose can go to the next middleware

// UserSchema.pre('remove', function (next) {
//     // include the product model here to avoid cyclic inclusion
//     const Product = mongoose.model('Product')

//     // don't iterate here! we want to use mongo operators!
//     // this makes sure the code executes inside mongo
//     Product.updateMany({}, { $pull: { 'reviews': { 'user': this._id } } })
//         .then(() => next())
// })

// export the user model through a caching function
module.exports = getModel('User', UserSchema)