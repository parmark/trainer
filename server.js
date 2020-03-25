const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 1024;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public/"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trainerdb", {
useNewUrlParser: true });

app.get("/exercise", (req, res) => {
    res.sendfile("./public/exercise.html")
}) 

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
});

app.post("/api/workouts", (req, res) => {
    db.Workout.create()
})

app.listen(PORT, () => {
    console.log("listening... PORT: " + PORT)
});
