const router = require('express').Router();
const fs = require('fs');

// Unique id npm package 
const { v4: uuidv4 } = require('uuid');

// * `GET /api/notes` should return all saved notes as JSON.
router.get('/notes', (req, res) => {
    // read the `db.json` file
    const noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    res.json(noteData)
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and 
// then return the new note to the client. 
router.post('/notes', (req, res) => {
    const note = req.body;
    // Use the uuid package to assign an id to the note 
    note.id = uuidv4();
    // read the `db.json` file
    const noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    // Write noteData to db.json file 
    noteData.push(note);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
    res.json(noteData)
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// * `DELETE /api/notes/:id` should receive a query parameter containing the id of a note to delete. In order to 
// delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` 
// property, and then rewrite the notes to the `db.json` file.
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id.toString();
    const noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    const readData = noteData.filter( note => note.id.toString() !== noteId );
    // rewrite the readData to db.json file 
    fs.writeFileSync("./db/db.json", JSON.stringify(readData));
    res.json(readData)
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
