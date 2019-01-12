const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pizza = require("./pizza").Pizza;
const orderState = require("../config/enum").orderState;
const Basket = new Schema({
    meals: {
        type: [String],
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
    meals: {
        type: [String],
        required: false,
    },
    drinks:{
        type: [String],
        required: false
    },
    pizzas: {
        type: [pizza],
        required: false
    },
    orderState: {
        type: String,
        require: true,
        default: orderState.PENDING,
    }

});

const order = mongoose.model("order", Order);
const basket = mongoose.model("basket", Basket);
module.exports = { order, Order, basket };
