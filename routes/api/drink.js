const express = require("express");
const Drink = require("../../models/drink").drink;
const router = express.Router();
// ADD
router.post("/add", (req, res) => {
    const name = req.body.name;
    const quantity = req.body.quantity;
    const description = req.body.description;
    const price = req.body.price;
    Drink.countDocuments({ name: name }, (err, count) => {
        if (count <= 0){
            const drink = new Drink();
            drink.name = name;
            drink.quantity = quantity;
            drink.description = description;
            drink.price = price;
            drink.save()
                .then(response => res.status(200).json({ success: true, data: response }))
                .catch(error => res.status(500).json({ success: false, data: error }));
        } else {
            res.status(200).json({ success: false, message: "Item already exists!" });
        }
    });
});
// DELETE
router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    Drink.findByIdAndDelete({ _id: id })
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// DELETE ALL
router.delete("/delete", (req, res) => {
    Drink.deleteMany()
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// GET ALL
router.get("/get", (req,res) => {
    Drink.find()
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// GET by ID
router.get("/get/:id", (req,res) => {
    const id = req.params.id;
    Drink.findById({ _id: id })
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// UPDATE
router.patch("/update", (req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const quantityChange = req.body.quantityChange;
    const description = req.body.description;
    const price = req.body.price;
    Drink.findOne({ _id: id })
        .then(drink => {
            drink.name = name || drink.name;
            drink.quantity += quantityChange || 0;
            drink.description = description || drink.description;
            drink.price = price || drink.price;
            drink.save()
                .then(response => res.status(200).json({ success: true, data: response }))
                .catch(error => res.status(200).json({ success: false, data: error, message: "Not enough quantity" }));
        })
        .catch(error => res.status(500).json({ success: false, data: error }));
});
module.exports = router;
