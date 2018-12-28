const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Meal = new Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    }
});
const meal = mongoose.model("meal", Meal);
module.exports = { meal, Meal };
