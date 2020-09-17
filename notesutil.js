const fs = require('fs')
const chalk = require('chalk')
const { title } = require('process')

const getNotes = () => { return loadNotes()}

const getNoteByTitle = (title) => {
    const notes = loadNotes()
    return notes.find((note) => note.title === title)
} 

const removeNote = (title) =>{
    let notes = loadNotes()
    const noteIndex = notes.findIndex((note) => note.title === title)
    if(notes.length === 0 || noteIndex < 0) {
        console.error(chalk.red(`Note with title ${title} not found.`))
    } else{
        notes.splice(noteIndex,1)
        saveNotes(notes)
        console.log(chalk.green('Note Removed'))
    }
}

const addNote = (title,desription) => {
    let notes = loadNotes()
    const existingNote = notes.find((note) => note.title === title)
    if(existingNote) {
        throw new Error(`Note with title ${title} already exists.`)
    }
    const note = {
        title: title,
        descrition: desription
    }
    notes.push(note)
    saveNotes(notes)   
}

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString())
    } catch (error) {
        return []   
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json',JSON.stringify(notes))
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: getNoteByTitle
}