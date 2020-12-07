const express = require("express");
const Joi = require("joi");
const router = express.Router();

//Mock Database
const musicDB = [
    { id: 0, name: "Fever", artist: "Dua Lipa", genre: "Pop" },
    { id: 1, name: "Lovely Day", artist: "Bill Withers", genre: "Pop" },
];

const validateTrack = track => {
    //Joi Schema
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        artist: Joi.string().min(3).max(30).required(),
        genre: Joi.string().min(3).max(30).required(),
    });
    return schema.validate(track);
}

//Api Route
router.get("/", (req, res) => {
    res.send(musicDB);
});

router.get("/:id", (req, res) => {
    const track = musicDB.find((c) => c.id === parseInt(req.params.id));
    if (!track)
        return res.status(404).send("There is no track with the given ID");
    res.send(track);
});

router.post("/", (req, res) => {
    const { error } = validateTrack(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const track = {
        id: musicDB.length,
        name: req.body.name,
        artist: req.body.artist,
        genre: req.body.genre,
    };
    musicDB.push(track);
    res.send(musicDB);
});

router.put("/:id", (req, res) => {
    //Find the track by id
    const track = musicDB.find((c) => c.id === parseInt(req.params.id));
    if (!track)
        return res.status(404).send("There is no track with the given ID");

    const { error } = validateTrack(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //Update the track
    track.name = req.body.name;
    track.genre = req.body.genre;
    track.artist = req.body.artist;

    //Send the track
    res.send(track);
});

router.delete("/:id", (req, res) => {
    const track = musicDB.find((c) => c.id === parseInt(req.params.id));
    if (!track)
        return res.status(404).send("There is no track with the given ID");

    //Delete the object
    musicDB.splice(musicDB.indexOf(track), 1);
    res.send(track);
});

module.exports = router;