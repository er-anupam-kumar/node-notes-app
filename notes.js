const fs    = require('fs')
const chalk = require('chalk')

const addNotes = (title,body)=>
{
    const notes = loadNotes()

    // const noteDuplicate = notes.filter((note)=> note.title===title)
    const noteDuplicate = notes.find((note)=> note.title===title)

    debugger
    if(!noteDuplicate)
    {
        notes.push({
            title:title,
            body:body
        })
        console.log(chalk.green.inverse('Note with title "'+title+'" has been added successfully !'))
    }
    else{
        console.log(chalk.red.inverse('Note title "'+title+'" already taken !'))
    }
    saveNotes(notes)
}

const removeNote = (title)=>{
    const notes  = loadNotes()    
    const notesToKeep = notes.filter((note)=> note.title!==title )
    saveNotes(notesToKeep)

    if(notes.length > notesToKeep.length)
    {
        console.log(chalk.green.inverse('Note with title "'+title+'" has been removed !'))
    }
    else
    {
        console.log(chalk.red.inverse('Note with title "'+title+'" is not available !'))
    }

}

const readNote = (title) =>{

    const notes = loadNotes()

    const note  = notes.find((note) => note.title===title)

    if(note)
    {
        console.log(chalk.green.inverse(note.title))
        console.log(note.body)
    }
    else
    {
        console.log(chalk.red.inverse('No task found with title '+ title))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.yellow.inverse('Your notes'))

    notes.forEach((note) => {
        console.log('Title : '+ note.title)
    })
}

const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON   = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e)
    {
        return []
    }
}

module.exports = {
    addNotes   : addNotes,
    removeNote : removeNote,
    listNotes  : listNotes,
    readNote   : readNote
};