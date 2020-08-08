const fs = require('fs');
const chalk = require('chalk');

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const addNote = function(title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function(note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }

}

const removeNote = function(title) {
    const notes = loadNotes();
    const notesToKeep = notes.filter(function(note) {
        return note.title !== title
    })
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No Note Found!'))
    }

}

const listNotes = function() {
    console.log(chalk.inverse('------Your Notes-----'))

    const notes = loadNotes()
    var count = 1;
    notes.forEach(function(note) {
        console.log("(" + count + ")Title:" + note.title + "\n" + note.body + "\n")
        count += 1;
    })
}

const readNote = function(title) {
    const notes = loadNotes()
    const note = notes.find(function(note) {
        return note.title === title
    })

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not Found!'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}