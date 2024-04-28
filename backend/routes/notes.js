const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/Details.js');
const Notes = require("../models/Notes.js")

// console.log(await Notes.find().model.schema.obj.title.name)
//Get all notes of a user : /api/notes/allnotes
router.get('/allnotes', fetchUser, async (req, res) => {

    try {
        const notes = await Notes.find({user:req.body.id});
     //   console.log(req.body.id);
        res.json(notes);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Errror");
    }
})

//Add a note for d concerned user: /api/notes/addnotes
router.post('/addnotes', fetchUser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { title, description, tag } = req.body;
        // console.log(req.body);

        try {
            const note = new Notes({ title, description, user: req.body.id });
            const saveNote = await note.save();
            res.json(saveNote);
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("Errror");
        }
    })
//Update notes of d concerned user: /api/notes/updatenotes
router.put('/updatenotes/:id', fetchUser, async (req, res) => {

    try {

        const { title, description, tag } = req.body;
        const newNote = {}
        if (title)
            newNote.title = title;
        if (tag)
            newNote.tag = tag;
        if (description)
            newNote.description = description;
        let sameNote = await Notes.findById(req.params.id);
        if (!sameNote)
            return res.status(404).send("User doesnt exists");
        console.log(sameNote.user.toString())
        if (sameNote.user.toString() !== req.body.id)
            return res.status(401).send("invalid access");
        sameNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ sameNote })
    }
    catch (error) {
        console.log("Error updating note:", error);
        res.status(500).send("Internal server error");
    }
})
//Delete notes of d concerned user: /api/notes/deletenotes
//replicate update note endpoint
module.exports = router;
