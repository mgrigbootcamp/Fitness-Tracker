const express = require('express');
const db = require('../models')

const router = express.Router();

const routerRange = express.Router();

router
    .get('/api/workouts/', async (req, res) => {
        // await db.Workout.find({}, {}, { sort: { 'created_at': -1 } }, (err, docs) => {
        //    // console.log("my Workout docs", docs);
        //     console.log("my Workout docs ERROR:", err);
        //     res.json(docs)
        // });


       await db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration',
                    },
                },
            },
           {
               $addFields: {
                   totalDistance: {
                       $sum: '$exercises.distance',
                   },
               },
           },
        ])
            .sort({ day: -1 })
            .limit(1)
            .then((result) => {
                console.log(result);
                res.json(result);
            })
            .catch((err) => {
                res.json(err);
            });
        
        //res.send("I am in the get workouts")
    })
    .post('/api/workouts', (req, res) => {
        // db.Workout
        console.log(`this is workouts and no ID: ${req.body.type}`);
        //res.json({ result: "I am in the post workouts" })
        if (req.body.type === 'resistance') { 
        db.Workout.create({
            day: Date.now(),
            exercises: [
                {
                    type: req.body.type,
                    name: req.body.name,
                    duration: req.body.duration,
                    weight: req.body.weight,
                    reps: req.body.reps,
                    sets: req.body.sets
                }
            ]
        }, (err, resp) => { 
            console.log("New docoument saved: ", resp);
            res.json({result: resp})
        })
        } else if (req.body.type === 'cardio') {
            db.Workout.create({
                day: Date.now(),
                exercises: [
                    {
                        type: req.body.type,
                        name: req.body.name,
                        duration: req.body.duration,
                        distance: req.body.distance
                    }
                ]
            }, (err, resp) => {
                console.log("New docoument saved: ", resp);
                res.json({ result: resp })

            })
        }
    })
    .put('/api/workouts/:id', (req, res) => {
        console.log(`this is workouts with PARAMS ID: ${req.params.id}`);
        console.log(`this is workouts with REQ: ${req}`);
        console.log(`this is workouts with ID: ${req.body.type}`);
        // res.json({ result: "I am in the get workouts with ID"})

        if (req.body.type === 'resistance') {
        db.Workout.findByIdAndUpdate({ _id: req.params.id}, {$push: {exercises: {
            type: req.body.type,
            name: req.body.name,
            duration: req.body.duration,
            weight: req.body.weight,
            reps: req.body.reps,
            sets: req.body.sets
        }}
        }, (err, resp) => {
            console.log("Updated resp: ", resp); 
            res.json({results: resp})
        })
        } else if (req.body.type === 'cardio') {

        db.Workout.findByIdAndUpdate({ _id: req.params.id }, {$push: {exercises: {
            type: req.body.type,
            name: req.body.name,
            duration: req.body.duration,
            distance: req.body.distance,
        }}
        }, (err, resp) => { 
            console.log("Updated resp: ", resp);
            res.json({results: resp})
        })
        }
    })

routerRange.route('/api/workouts/range')
    .get((req, res) => {
        // res.send("I am in the get workout range")

        db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
        .sort({ day: -1 })
        .limit(7)
        .sort({ _id: 1 })
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
    })
   

module.exports = {
    router,
    routerRange
};



     