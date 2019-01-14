const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const keys = require("./config/keys");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
// const db = `${keys.dbURL}/${keys.dbName}`;
const db = keys.dbOnline;
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("Database connected", db))
    .catch((err) => console.log(err));
// Routes
const ingredient = require("./routes/api/ingredient");
app.use("/api/ingredient", ingredient);
const meal = require("./routes/api/meal");
app.use("/api/meal", meal);
const drink = require("./routes/api/drink");
app.use("/api/drink", drink);
const pizza = require("./routes/api/pizza");
app.use("/api/pizza", pizza);
const order = require("./routes/api/order");
app.use("/api/order", order);


if (process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
