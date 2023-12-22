const fs = require("fs");
const util = require("util");
const app = require("express").Router();
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
var notesData;

app.get("/api/notes", function (req, res) {
    readFileAsync("./db/db.json", "utf8").then(function (data) {
        notesData = JSON.parse(data);
        res.json(notesData);
    });
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    readFileAsync("./db/db.json", "utf8").then(function (data) {
        notesData = JSON.parse(data);
        notesData.push(newNote);
        writeFileAsync("./db/db.json", JSON.stringify(notesData)).then(function () {
            console.log("Note Saved");
            res.json(newNote);
        });
    });
});
    app.delete("/api/notes/:id", function (req, res) {
        var id = req.params.id;
        readFileAsync("./db/db.json", "utf8").then(function (data) {
            notesData = JSON.parse(data);
            notesData.splice(id, 1);
            writeFileAsync("./db/db.json", JSON.stringify(notesData)).then(function () {
                console.log("Note Deleted");
            });
        });
    });
    module.exports = app;