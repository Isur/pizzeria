const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ingredient = require("./ingredient").Ingredient;

const Pizza = new Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false,
        min: 0
    }
});
const pizza = mongoose.model("pizza", Pizza);
module.exports = { pizza, Pizza };
