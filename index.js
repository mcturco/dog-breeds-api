require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000

// JSON Converter
app.use(express.json())

// Establish MongoDB connection
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

// Run app on server - localhost:3000
app.listen(
    PORT,
    () => console.log(`api is running on http://localhost:${PORT}`)
)

// Breed Schema
const breedSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    group: String,
    function: String,
    coat: String,
    color: String,
    height: {
        male: String,
        female: String
    },
    weight: {
        male: String,
        female: String
    },
    characteristics: {
        energy: Number,
        exercise: Number,
        playfulness: Number,
        affection: Number,
        friendliness: {
            pets: Number,
            strangers: Number
        },
        training: Number,
        grooming: Number
    },
    life_span: String
})

const Breed = mongoose.model('Breed', breedSchema)

// POST - Breed
app.post('/breed', (req, res) => {
    const post = new Breed({
        _id: req.body._id,
        name: req.body.name,
        group: req.body.group,
        function: req.body.function,
        coat: req.body.coat,
        color: req.body.color,
        height: {
            male: req.body.height.male,
            female: req.body.height.female
        },
        weight: {
            male: req.body.weight.male,
            female: req.body.weight.female
        },
        characteristics: {
            energy: req.body.characteristics.energy,
            exercise: req.body.characteristics.exercise,
            playfulness: req.body.characteristics.playfulness,
            affection: req.body.characteristics.affection,
            friendliness: {
                pets: req.body.characteristics.friendliness.pets,
                strangers: req.body.characteristics.friendliness.strangers
            },
            training: req.body.characteristics.training,
            grooming: req.body.characteristics.grooming
        },
        life_span: req.body.life_span
    })
    post.save()
    res.send(post)
})

// GET - Breed via ID param
app.get('/breed/:id', (req, res) => {
    const id = req.params._id
    Breed.findOne({ id: id }, (err, found) => {
        if (!err) {
            res.send(found)
        }
        console.log(err)
        res.send(err)
    }).catch(err => console.log("Error occurred, " + err))

})