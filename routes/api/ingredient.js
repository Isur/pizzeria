const express = require("express");
const Ingredient = require("../../models/ingredient").ingredient;
const router = express.Router();
// ADD
router.post("/add", (req, res) => {
    const name = req.body.name;
    const quantity = req.body.quantity;
    const price = req.body.price;
    Ingredient.countDocuments({ name: name }, (err, count) => {
        if (count <= 0){
            const ingredient = new Ingredient();
            ingredient.name = name;
            ingredient.quantity = quantity;
            ingredient.price = price;
            ingredient.save()
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
    Ingredient.findByIdAndDelete({ _id: id })
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// DELETE ALL
router.delete("/delete", (req, res) => {
    Ingredient.deleteMany()
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// GET ALL
router.get("/get", (req,res) => {
    Ingredient.find()
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// GET by ID
router.get("/get/:id", (req,res) => {
    const id = req.params.id;
    Ingredient.findById({ _id: id })
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// UPDATE
router.patch("/update", (req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const quantityChange = req.body.quantityChange;
    const price = req.body.price;
    Ingredient.findOne({ _id: id })
        .then(ingredient => {
            ingredient.name = name || ingredient.name;
            ingredient.quantity += quantityChange || 0;
            ingredient.price = price || ingredient.price;
            ingredient.save()
                .then(response => res.status(200).json({ success: true, data: response }))
                .catch(error => res.status(200).json({ success: false, data: error, message: "Not enough quantity" }));
        })
        .catch(error => res.status(500).json({ success: false, data: error }));
});
module.exports = router;
