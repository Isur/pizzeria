const express = require("express");
const Meal = require("../../models/meal").meal;
const router = express.Router();
// ADD
router.post("/add", (req, res) => {
    const name = req.body.name;
    const quantity = req.body.quantity;
    const description = req.body.description;
    Meal.countDocuments({ name: name }, (err, count) => {
        if (count <= 0){
            const meal = new Meal();
            meal.name = name;
            meal.quantity = quantity;
            meal.description = description;
            meal.save()
                .then(response => res.status(200).json({ success: true, data: response }))
                .catch(error => res.status(500).json({ success: false, data: error }));
        } else {
            res.status(500).json({ success: false, message: "Item already exists!" });
        }
    });
});
// DELETE
router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    Meal.findByIdAndDelete({ _id: id })
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// DELETE ALL
router.delete("/delete", (req, res) => {
    Meal.deleteMany()
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// GET ALL
router.get("/get", (req,res) => {
    Meal.find()
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// GET by ID
router.get("/get/:id", (req,res) => {
    const id = req.params.id;
    Meal.findById({ _id: id })
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// UPDATE
router.patch("/update", (req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const quantityChange = req.body.quantityChange;
    const description = req.body.description;
    Meal.findOne({ _id: id })
        .then(meal => {
            meal.name = name || meal.name;
            meal.quantity += quantityChange || 0;
            meal.description = description || meal.description;
            meal.save()
                .then(response => res.status(200).json({ success: true, data: response }))
                .catch(error => res.status(200).json({ success: false, data: error, message: "Not enough quantity" }));
        })
        .catch(error => res.status(500).json({ success: false, data: error }));
});
module.exports = router;
