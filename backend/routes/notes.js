const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note');
// ...rest of the initial code omitted for validation
const { body, validationResult } = require('express-validator');


// route 1: fetch user all notes using get "api/notes/fetchallnotes  !!login require";
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error for login 1");
    }
})



// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {

            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })




// // ROUTE 3: Update your  Note using: put "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        //create a newNote  object 
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        //find a note to update and update it
        let note = await Note.findById(req.params.id);
        //this if use for check for who edit note , this is your note not edit another note
        if (!note) {
            return res.status(404).send("Not Found")
        }
        //allow delete note only user owner on this node
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        //afterbthat 1 st line use note update
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error 2222222222");
    }
})




// ROUTE 4: Delete  your  Note using: delete "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //find a note to deleteand delete it
        let note = await Note.findById(req.params.id);
        //this if use for check for who edit note , this is your note not edit another note
        if (!note) {
            return res.status(404).send("Not Found")
        }
        //allow delete note only user owner on this node
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        //afterbthat 1 st line use note update
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error   333333333333");
    }
})


module.exports = router 