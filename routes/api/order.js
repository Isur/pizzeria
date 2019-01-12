const express = require("express");
const orderState = require("../../config/enum").orderState;
const Order = require("../../models/order").order;
const Basket = require("../../models/order").basket;
const Meal = require("../../models/meal").meal;
const Pizza = require("../../models/pizza").pizza;
const router = express.Router();

const getMeal = (mealIds) => {
    return new Promise((resolve, reject) =>{
        const meals = mealIds.map(async id =>
            Meal.findById(id)
                .then(meal => meal)
                .catch(err => reject("Meal not found!")));
        Promise.all(meals).then(promise => resolve(promise));
    });
};

const createPizza = (pizzaData) => {
    return new Promise((resolve, reject) => {
        const pizzas = pizzaData.map(async pizza => {
            const newPizza = new Pizza();
            newPizza.name = pizza.name || "Created by user!";
            newPizza.ingredients = pizza.ingredients;
            newPizza.description = pizza.description || "Created by user!";
            return newPizza;
        });
        return Promise.all(pizzas).then(promise => resolve(promise));
    });
};

// ADD
router.post("/add", (req, res) => {
    const pizzas = req.body.pizzas || [];
    const meals = req.body.meals || [];
    const contact  = req.body.contact;
    createPizza(pizzas).then(response => {
        const order= new Order();
        order.pizzas = response;
        order.meals = meals;
        order.contact = contact;
        order.save().then(response => res.status(200).json({success:true, data: response }));
    });
});
// TODO: DELETE
// TODO: DELETE ALL
// GET ALL
router.get("/get", (req, res) => {
    Order.find()
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// TODO: GET by ID
// UPDATE
router.patch("/update", (req,res) => {
    const id = req.body.id;
    const orderState = req.body.orderState;
    Order.findById(id).then(order => {
        order.orderState = orderState;
        order.save().then(saved => res.status(200).json({ success: true, data: saved }));
    });
});
module.exports = router;
