const fs = require('fs')
const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notesutil')
const notesutil = require('./notesutil')

yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        description: {
            describe: 'Note Description',
            demandOption: true,
            type: 'string'
        }
    },

    handler: (yargs) => {
        notes.addNote(yargs.title,yargs.description)
    }
})

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: () => {
        const notes = notesutil.getNotes()
        notes.forEach(note => {
            console.log(chalk.green(JSON.stringify(note)))
        });
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (yargs) => {
        notesutil.removeNote(yargs.title)
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type:'string'
        }
    },
    handler: (yargs) => {
       const note = notesutil.readNote(yargs.title)
       if(note) {
           console.log(chalk.green(JSON.stringify(note)))
       } else {
           console.log(chalk.red('Note not found'))
       }
    }
})

yargs.parse()