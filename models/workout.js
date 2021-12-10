const mongoose = require("mongoose");
const Schema = mongoose.Schema

const workouts = new Schema({
    day: { type: Date},
    exercises: [
      {
        type: { type: String, required: true },
        name: { type: String, required: true },
        duration: { type: Number, required: false },
        weight: { type: Number, required: false },
        reps: { type: Number, required: false },
        sets: { type: Number, required: false },
        distance: { type: Number, required: false },
        _id: false
      }
    ]
})

const Workout = mongoose.model("Workout", workouts)
module.exports = Workout;