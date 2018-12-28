const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pizza = require("./pizza").Pizza;
const meal = require("./meal").Meal;

const Basket = new Schema({
    meals: {
        type: [meal],
        required: false,
    },
    pizzas: {
        type: [pizza],
        required: false
    }
});

const Order = new Schema({
    contact: {
        type: String,
        required: true,
    },
    basket: {
        type: [Basket],
        required: true,
    }

});

const order = mongoose.model("order", Order);
module.exports = { order, Order };
