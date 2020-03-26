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
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
});

app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
})

app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
        .then(dbUser => {
            res.json(dbUser);
        })
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
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
