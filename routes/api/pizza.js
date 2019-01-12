const express = require("express");
const Pizza = require("../../models/pizza").pizza;
const Ingredient = require("../../models/ingredient").ingredient;
const router = express.Router();

const getIngredients = (ids) => {
    return new Promise((resolve, reject) => {
        const ing = ids.map(async id => {
            return Ingredient.findById(id)
                .then(ingredient => ingredient)
                .catch(err => reject("Ingredient not found!"));
        });
        Promise.all(ing).then(pro => {
            console.log({ promise: pro });
            resolve(pro);
        });
    });
};

router.post("/add", (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const ingredientsID = req.body.ingredients || [];
    const price = req.body.price;
    if (ingredientsID.length === 0){
        return res.json({ success: false, message: "No ingredients" });
    }
    getIngredients(ingredientsID)
        .then(ingredients => {
            Pizza.countDocuments({ name: name }, (err, count) => {
                if (count <= 0){
                    const pizza = new Pizza();
                    pizza.name = name;
                    pizza.description = description;
                    pizza.ingredients = ingredients.map(ing => ing.id);
                    pizza.price = price;
                    pizza.save()
                        .then(response => res.status(200).json({ success: true, data: response }))
                        .catch(error => res.status(500).json({ success: false, data: error }));

                } else {
                    res.status(500).json({ success: false, message: "Item already exists!" });
                }
            });})
        .catch(resp => res.json({ success: false, message: "Bad ingredient" }));
});

// DELETE
router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    Pizza.findByIdAndDelete({ _id: id })
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// DELETE ALL
router.delete("/delete", (req, res) => {
    Pizza.deleteMany()
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// GET ALL
router.get("/get", (req,res) => {
    Pizza.find()
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// GET by ID
router.get("/get/:id", (req,res) => {
    const id = req.params.id;
    Pizza.findById({ _id: id })
        .then(response => res.status(200).json({ success: true, data: response }))
        .catch(error => res.status(500).json({ success: false, data: error }));
});
// UPDATE
router.patch("/update", (req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;
    const ingredients = req.body.ingredients;
    const price = req.body.price;
    getIngredients(ingredients).then(resp => {
        Pizza.findOne({ _id: id })
            .then(pizza => {
                pizza.name = name || pizza.name;
                pizza.description = description || pizza.description;
                pizza.ingredients = resp.map(i => i.id) || pizza.ingredients;
                pizza.price = price || pizza.price;
                pizza.save()
                    .then(response => res.status(200).json({ success: true, data: response }))
                    .catch(error => res.status(200).json({ success: false, data: error, message: "Not enough quantity" }));
            })
            .catch(error => res.status(500).json({ success: false, data: error }));
    });
});
module.exports = router;
