const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const keys = require("./config/keys");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = `${keys.dbURL}/${keys.dbName}`;
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("Database connected", db))
    .catch((err) => console.log(err));
// Routes
const ingredient = require("./routes/api/ingredient");
app.use("/ingredient", ingredient);
const meal = require("./routes/api/meal");
app.use("/meal", meal);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
