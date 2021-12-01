const express = require('express')
const router = express.Router()

const Exercise = require('../models/exercise.schema')() // note we need to call the model caching function

const CrudController = require('../controllers/crud')

const ExerciseCrudController = new CrudController(Exercise)


// create a user
router.post('/', ExerciseCrudController.create)

// get all users
router.get('/', ExerciseCrudController.getAll)

// get a user
router.get('/:id', ExerciseCrudController.getOne)

// update a user
router.put('/:id', ExerciseCrudController.update)

// remove a user
router.delete('/:id', ExerciseCrudController.delete)

module.exports = router