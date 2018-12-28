const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ingredient = new Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        min: 0,
        required: true,
    }
});
const ingredient = mongoose.model("ingredient", Ingredient);
module.exports = { ingredient, Ingredient };
