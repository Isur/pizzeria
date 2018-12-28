const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ingredient = require("./ingredient").Ingredient;

const Pizza = new Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [ingredient],
        required: true,
    }
});
const pizza = mongoose.model("pizza", Pizza);
module.exports = { pizza, Pizza };
