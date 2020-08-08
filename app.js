const chalk = require('chalk')
const notes = require('./notes.js')
const yargs = require('yargs')

//Create add command
yargs.command({
    command: 'add',
    describe: 'Add an new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: false,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.removeNote(argv.title)
    }
})

//Create list command
yargs.command({
    command: 'list',
    describe: 'list Your notes',
    handler: function() {
        notes.listNotes()
    }
})

//Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    },
    handler: function(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()