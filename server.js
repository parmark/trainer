const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 2048;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public/"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trainerdb");

// html routes
app.get("/exercise", (req, res) => {
    res.sendfile("./public/exercise.html")
}) 

app.get("/stats", (req, res) => {
    res.sendfile("./public/stats.html")
})

// api routes
// Gets the last workout
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
});

// Adds an exercise
app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
})

// Creates a workout
app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
        .then(dbUser => {
            res.json(dbUser);
        })
});

// Gets all workouts
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).sort("-day").limit(7)
    .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
})

app.listen(PORT, () => {
    console.log("listening... PORT: " + PORT)
});
