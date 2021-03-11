const fs = require('fs')
const chalk = require('chalk')

getNotes = () => {
    return "Your notes..."
}

const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => {
        return note.title === title
    })

    if (duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body,
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse.bold("New note added!"))
    } else {
        console.log(chalk.red.inverse.bold("Note title taken!"))
    }  
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length){
        console.log(chalk.green.inverse.bold("Note removed!"))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse.bold("No note found!"))
    }
}

listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.blueBright.inverse("Your notes"))

    notes.forEach((note, i) => {
        i++;
        console.log(`${i}) ${note.title} \n${note.body}`)      
    })
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}

const loadNotes = () => {
    try{  
        const dataBuffer = fs.readFileSync("notes.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }   
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse.bold(note.title))
        console.log(chalk.inverse(note.body))
    } else {
        console.log(chalk.red.inverse.bold("Note not found!"))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}