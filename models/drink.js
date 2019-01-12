const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Drink = new Schema({
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
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});
const drink = mongoose.model("drink", Drink);
module.exports = { drink, Drink };
